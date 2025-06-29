import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";  // Add this import

export default function BookCard({ book, onClick, onAddToCart }) {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(book); // Pass the book to the parent handler
    navigate('/cart'); // Navigate to cart page
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div 
        onClick={onClick}
        className="cursor-pointer"
      >
        <div className="h-48 bg-gray-100 overflow-hidden">
          <img
            src={book.coverImageUrl || "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250' viewBox='0 0 200 250'%3E%3Crect fill='%23e5e7eb' width='200' height='250'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='20' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo Cover%3C/text%3E%3C/svg%3E"}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250' viewBox='0 0 200 250'%3E%3Crect fill='%23e5e7eb' width='200' height='250'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='20' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo Cover%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{book.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-1">{book.authors.join(", ")}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-bold text-gray-900">${book.price.toFixed(2)}</span>
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600">{book.rating || "4.5"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <motion.button
          id={`add-to-cart-${book._id}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}  // Use the new handler
          className="w-full py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}