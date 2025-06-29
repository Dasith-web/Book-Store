import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCart } from "../context/Cartcontext";
import { Link } from "react-router-dom";

export default function CartDrawer({ open, onClose }) {
  const { items, total, updateQty, remove, clear } = useCart();
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg flex flex-col transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Cart is empty.</p>
          ) : (
            items.map(({ book, qty }) => (
              <div key={book._id} className="flex gap-3">
                <img
                  src={book.coverImageUrl || "https://placehold.co/80x100"}
                  className="h-24 w-18 object-cover rounded"
                  alt={book.title}
                />
                <div className="flex-1">
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {book.authors.join(", ")}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) =>
                        updateQty(book._id, Number(e.target.value))
                      }
                      className="w-16 rounded border px-2 py-1"
                    />
                    <button
                      onClick={() => remove(book._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <span className="ml-auto">
                  ${(book.price * qty).toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        <div className="p-4 border-t space-y-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            onClick={onClose}
            className="block w-full text-center rounded bg-green-600 px-4 py-3 text-white hover:bg-green-700"
          >
            Checkout
          </Link>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="block w-full text-center rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
