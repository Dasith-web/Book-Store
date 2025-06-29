import React from "react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useCart } from "../context/Cartcontext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer({ open, onClose }) {
  const { items, total, updateQty, remove, clear } = useCart();

  return (
    <AnimatePresence>
      <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: open ? 0 : "100%" }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Your Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <XMarkIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-2 text-gray-500">Add some books to get started</p>
                </motion.div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {items.map(({ book, qty }) => (
                    <motion.li
                      key={book._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="p-4"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 h-24 w-16 rounded-md overflow-hidden bg-gray-100">
                          <img
                            src={book.coverImageUrl || "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='96' viewBox='0 0 64 96'%3E%3Crect fill='%23e5e7eb' width='64' height='96'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='12' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo Cover%3C/text%3E%3C/svg%3E"}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {book.authors.join(", ")}
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <input
                              type="number"
                              min={1}
                              value={qty}
                              onChange={(e) =>
                                updateQty(book._id, Number(e.target.value))
                              }
                              className="w-16 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-1 px-2 border"
                            />
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => remove(book._id)}
                              className="text-red-600 hover:text-red-800 flex items-center text-sm"
                            >
                              <TrashIcon className="h-4 w-4 mr-1" />
                              Remove
                            </motion.button>
                          </div>
                        </div>
                        <div className="ml-auto text-sm font-medium text-gray-900">
                          ${(book.price * qty).toFixed(2)}
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
<Link
  to="/checkout"
  onClick={onClose}
  className="flex justify-center items-center py-3 px-4 w-full rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
>
  Checkout
</Link>
              <button
                onClick={clear}
                className="mt-2 flex justify-center items-center py-2 px-4 w-full rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300"
              >
                Clear Cart
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}