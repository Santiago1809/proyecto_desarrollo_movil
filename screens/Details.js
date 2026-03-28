import React from "react";
import BookDetails from "../components/book/BookDetails";

export default function Details({ route }) {
  return <BookDetails book={route.params.book} />;
}
