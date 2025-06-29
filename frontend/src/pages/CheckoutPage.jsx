import React from "react";
import { useCart } from "../context/Cartcontext";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <h2 className="text-2xl font-bold">Checkout</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {items.map(({ book, qty }) => (
              <li key={book._id} className="py-3 flex justify-between">
                <span>
                  {book.title} × {qty}
                </span>
                <span>${(book.price * qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="text-right font-semibold text-lg">
            Total: ${total.toFixed(2)}
          </div>

          <button
            onClick={() => {
              alert("Payment integration goes here!");
              clear();
            }}
            className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700"
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
}
