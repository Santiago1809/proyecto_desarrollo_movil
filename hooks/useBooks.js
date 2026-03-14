import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { db, storage } from "../firebase";

export default function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    try {
      const q = collection(db, "books");
      const snap = await getDocs(q);
      const items = await Promise.all(
        snap.docs.map(async (d) => {
          const data = d.data();
          let image = data.image || null;
          if (!image && data.imagePath) {
            try {
              image = await getDownloadURL(storageRef(storage, data.imagePath));
            } catch (e) {
              image = null;
            }
          }
          return {
            id: d.id,
            title: data.title || "Untitled",
            author: data.author || "",
            image,
            description: data.description || "",
          };
        }),
      );

      setBooks(items);
    } catch (err) {
      console.error("useBooks: error loading books", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    loadBooks().catch(() => {});
    return () => (mounted = false);
  }, [loadBooks]);

  return { books, loading, refresh: loadBooks };
}
