import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function BookTable({ books, onEdit, onDelete }) {
  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-green-600 to-green-700">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
              Authors
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.map((b, index) => (
            <motion.tr
              key={b._id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={rowVariants}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {b.coverImageUrl && (
                    <div className="flex-shrink-0 h-10 w-8 mr-3 overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={b.coverImageUrl}
                        alt=""
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='40' viewBox='0 0 32 40'%3E%3Crect fill='%23e5e7eb' width='32' height='40'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='10' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo Cover%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-gray-900">{b.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {b.categories?.join(", ")}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 line-clamp-2">
                  {b.authors.join(", ")}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                ${b.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {b.stock}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${b.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {b.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(b)}
                    className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50"
                    title="Edit"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(b._id)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                    title="Delete"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}