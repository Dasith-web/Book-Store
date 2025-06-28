import { useEffect, useState } from "react";
import {
  fetchBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookService";
import BookTable from "../components/BookTable";
import BookFormModal from "../components/BookFormModal";
import Loader from "../components/Loader";

export default function AdminBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const { data } = await fetchBooks();
      setBooks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleAdd = () => {
    setEditingBook(null);
    setModalOpen(true);
  };

  const handleSave = async (payload) => {
    if (editingBook) {
      await updateBook(editingBook._id, payload);
    } else {
      await createBook(payload);
    }
    setModalOpen(false);
    loadBooks();
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this book?")) {
      await deleteBook(id);
      loadBooks();
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Books</h1>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Book
        </button>
      </header>

      <BookTable
        books={books}
        onEdit={(b) => {
          setEditingBook(b);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <BookFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingBook}
        onSave={handleSave}
      />
    </div>
  );
}
