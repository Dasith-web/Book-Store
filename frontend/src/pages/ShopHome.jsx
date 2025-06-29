import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard.jsx";
import BookDetailsPanel from "../components/BookDetailsPanel.jsx";
import CartDrawer from "../components/CartDrawer.jsx";
import { useCart } from "../context/Cartcontext.jsx";
import api from "../services/api.js";
import { ShoppingCartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopHome() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { items, addToCart } = useCart();
  const { add } = useCart();

  useEffect(() => {
    setIsLoading(true);
    api.get("/books")
      .then(({ data }) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const filtered = books.filter((b) => {
    const q = query.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.authors.join(" ").toLowerCase().includes(q)
    );
  });

  const handleAddToCart = (book) => {
    addToCart(book);
    // Add a small animation feedback
    const button = document.getElementById(`add-to-cart-${book._id}`);
    if (button) {
      button.classList.add("animate-ping");
      setTimeout(() => button.classList.remove("animate-ping"), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-30 bg-white shadow-lg"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              B
            </div>
            <h1 className="text-xl font-bold text-gray-800">BookStore</h1>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                placeholder="Search books by title or author..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Cart"
            >
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              {items.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-xs text-white shadow-sm"
                >
                  {items.length}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Search */}
        <div className="sm:hidden mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              placeholder="Search books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mx-auto h-24 w-24 text-gray-400">
              <BookOpenIcon className="w-full h-full" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No books found</h3>
            <p className="mt-1 text-gray-500">
              {query ? "Try a different search term" : "Our collection is currently empty"}
            </p>
          </motion.div>
        )}

        {/* Book Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {filtered.map((book) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <BookCard 
  book={book} 
  onClick={() => setSelected(book)}
  onAddToCart={(book) => {
    add(book, 1); // Add the book to cart
  }}
/>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Details panel + Cart drawer */}
      <BookDetailsPanel 
        book={selected} 
        onClose={() => setSelected(null)}
        onAddToCart={(book) => {
          handleAddToCart(book);
          setSelected(null);
        }}
      />
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}