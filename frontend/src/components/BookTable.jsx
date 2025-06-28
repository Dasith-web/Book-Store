import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function BookTable({ books, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto shadow rounded-xl">
      <table className="min-w-full bg-white">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Authors</th>
            <th className="p-3 text-right">Price ($)</th>
            <th className="p-3 text-right">Stock</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b._id} className="border-b">
              <td className="p-3">{b.title}</td>
              <td className="p-3">{b.authors.join(", ")}</td>
              <td className="p-3 text-right">{b.price.toFixed(2)}</td>
              <td className="p-3 text-right">{b.stock}</td>
              <td className="p-3 flex gap-3 justify-end">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => onEdit(b)}
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDelete(b._id)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
