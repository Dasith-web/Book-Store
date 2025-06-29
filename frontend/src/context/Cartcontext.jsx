import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ book, qty }]

  const add = (book, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.book._id === book._id);
      if (existing) {
        return prev.map((i) =>
          i.book._id === book._id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { book, qty }];
    });
  };

  const updateQty = (bookId, qty) =>
    setItems((prev) =>
      prev.map((i) => (i.book._id === bookId ? { ...i, qty } : i)),
    );

  const remove = (bookId) =>
    setItems((prev) => prev.filter((i) => i.book._id !== bookId));

  const clear = () => setItems([]);

  const total = items.reduce((t, i) => t + i.book.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, updateQty, clear, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
