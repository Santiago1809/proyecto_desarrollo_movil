import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import uploadToCloudinary from "./useCloudinary";
import { db } from "../firebase";

export default function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    try {
      const q = collection(db, "books");
      const snap = await getDocs(q);
      console.log("useBooks: loaded docs count", snap.size);
      const items = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          title: data.title || "Untitled",
          author: data.author || "",
          image: data.image || null,
          description: data.description || "",
          available: data.available ?? true,
        };
      });

      setBooks(items);
    } catch (err) {
      console.error("useBooks: error loading books", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  async function addBook(data, imageBase64) {
    try {
      const col = collection(db, "books");
      const docRef = await addDoc(col, {
        title: data.title || "Untitled",
        author: data.author || "",
        description: data.description || "",
        category: data.category || "",
        tags: data.tags || [],
        available: data.available ?? true,
        ownerId: data.ownerId || null,
        rating: data.rating ?? 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      const bookId = docRef.id;

      if (imageBase64) {
        try {
          const cleaned = imageBase64 ? imageBase64.replaceAll(/\s+/g, "") : "";
          const cloudName = "ddfhhuztk";
          const uploadPreset = "biblioteca-tdea";
          const cloudResp = await uploadToCloudinary(cleaned, {
            cloudName,
            uploadPreset,
          });
          if (cloudResp?.secure_url) {
            await setDoc(
              doc(db, "books", bookId),
              {
                image: cloudResp.secure_url,
                cloudinaryId: cloudResp.public_id,
                updatedAt: serverTimestamp(),
              },
              { merge: true }
            );
          }
        } catch (e) {
          console.error("addBook: image upload failed", e);
        }
      }

      await loadBooks();
      return { id: bookId };
    } catch (err) {
      console.error("addBook error", err);
      throw err;
    }
  }

  useEffect(() => {
    setLoading(true);
    const q = collection(db, "books");
    const unsub = onSnapshot(
      q,
      (snap) => {
        try {
          const items = snap.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              title: data.title || "Untitled",
              author: data.author || "",
              image: data.image || null,
              description: data.description || "",
              available: data.available ?? true,
            };
          });
          console.log("useBooks:onSnapshot docs", snap.size);
          setBooks(items);
        } catch (e) {
          console.error("useBooks:onSnapshot processing error", e);
          setBooks([]);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("useBooks:onSnapshot error", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return { books, loading, refresh: loadBooks, addBook };
}
