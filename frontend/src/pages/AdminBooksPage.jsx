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
import { motion } from "framer-motion";

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
    if (confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      loadBooks();
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Book Inventory</h1>
            <p className="text-gray-600">Manage your bookstore collection</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Book
          </motion.button>
        </header>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <BookTable
            books={books}
            onEdit={(b) => {
              setEditingBook(b);
              setModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        </div>

        <BookFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialData={editingBook}
          onSave={handleSave}
        />
      </motion.div>
    </div>
  );
}