import React, { Fragment } from "react";
import { XMarkIcon, ShoppingBagIcon, StarIcon } from "@heroicons/react/24/solid";
import { useCart } from "../context/Cartcontext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function BookDetailsPanel({ book, onClose }) {
  const { add } = useCart();
  const navigate = useNavigate();
  
  if (!book) return null;

  const handleAddToCart = () => {
    add(book, 1);
    onClose();
    navigate('/cart'); // Navigate to cart page
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40"
      >
        {/* Backdrop with click-to-close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="absolute right-0 top-0 h-full w-full sm:w-[32rem] bg-white shadow-xl flex flex-col overflow-y-auto"
        >
          {/* Header with close button */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-100 flex justify-between items-center p-4">
            <h2 className="text-lg font-semibold text-gray-700">Book Details</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="px-8 pb-10 pt-6">
            {/* Book Cover */}
            <div className="flex justify-center mb-8">
              <div className="relative w-64 h-80 bg-gray-100 rounded-xl shadow-md overflow-hidden">
                <img
                  src={
                    book.coverImageUrl ||
                    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='320' viewBox='0 0 256 320'%3E%3Crect fill='%23e5e7eb' width='256' height='320'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='24' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo Cover%3C/text%3E%3C/svg%3E"
                  }
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='320' viewBox='0 0 256 320'%3E%3Crect fill='%23e5e7eb' width='256' height='320'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='24' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo Cover%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">{book.title}</h2>
                <p className="text-lg text-gray-600 mt-1">
                  by {book.authors.join(", ")}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {book.publishedDate && (
                  <div className="flex items-center">
                    <span>Published: {new Date(book.publishedDate).getFullYear()}</span>
                  </div>
                )}
                {book.categories && book.categories.length > 0 && (
                  <div className="flex items-center">
                    <span>Genre: {book.categories.join(", ")}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{book.rating || "4.5"}/5</span>
                </div>
                <div className="flex items-center">
                  <span>Stock: {book.stock || "10"} available</span>
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-sm text-gray-500">Price</span>
                  <p className="text-3xl font-bold text-green-600">
                    ${book.price.toFixed(2)}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-white shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>Add to Cart</span>
                </motion.button>
              </div>

              {/* Description */}
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {book.description || "No description available for this book."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}