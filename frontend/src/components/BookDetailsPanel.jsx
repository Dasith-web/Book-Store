import React, { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCart } from "../context/Cartcontext";

export default function BookDetailsPanel({ book, onClose }) {
  const { add } = useCart();
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-40">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[28rem] bg-white shadow-lg flex flex-col overflow-y-auto">
        <button
          onClick={onClose}
          className="p-4 self-end text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="px-6 pb-10">
          <img
            src={
              book.coverImageUrl ||
              "https://placehold.co/400x550?text=No+Cover"
            }
            alt={book.title}
            className="mx-auto mb-6 aspect-[3/4] w-60 object-cover rounded"
          />

          <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-600 mb-1">
            by {book.authors.join(", ")}
          </p>
          {book.publishedDate && (
            <p className="text-sm mb-4 text-gray-500">
              Published: {new Date(book.publishedDate).getFullYear()}
            </p>
          )}

          <p className="mb-6 whitespace-pre-wrap">{book.description}</p>

          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold text-green-600">
              ${book.price.toFixed(2)}
            </span>
            <button
              onClick={() => {
                add(book, 1);
                onClose();
              }}
              className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
