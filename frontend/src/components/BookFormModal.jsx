import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";

const emptyBook = {
  title: "",
  authors: "",
  price: "",
  stock: "",
  categories: "",
  coverImageUrl: "",
  description: "",
};

export default function BookFormModal({ isOpen, onClose, initialData, onSave }) {
  const [form, setForm] = useState(emptyBook);

  useEffect(() => {
    setForm(
      initialData
        ? {
            ...initialData,
            authors: initialData.authors.join(", "),
            categories: (initialData.categories || []).join(", "),
          }
        : emptyBook,
    );
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      authors: form.authors.split(",").map((a) => a.trim()),
      categories: form.categories.split(",").map((c) => c.trim()),
      price: Number(form.price),
      stock: Number(form.stock),
    };
    onSave(payload);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-900"
                  >
                    {initialData ? "Edit Book Details" : "Add New Book"}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Title", name: "title", placeholder: "Enter book title" },
                      { label: "Authors (comma separated)", name: "authors", placeholder: "Author 1, Author 2" },
                      { label: "Price ($)", name: "price", type: "number", placeholder: "19.99" },
                      { label: "Stock Quantity", name: "stock", type: "number", placeholder: "50" },
                      { label: "Categories (comma separated)", name: "categories", placeholder: "Fiction, Fantasy" },
                      { label: "Cover Image URL", name: "coverImageUrl", placeholder: "https://example.com/book-cover.jpg" },
                    ].map((f) => (
                      <div key={f.name} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          {f.label}
                        </label>
                        <input
                          type={f.type || "text"}
                          name={f.name}
                          value={form[f.name]}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 px-4 py-2 border"
                          placeholder={f.placeholder}
                          required={f.name === "title"}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      value={form.description}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 px-4 py-2 border"
                      placeholder="Enter book description..."
                    />
                  </div>

                  {form.coverImageUrl && (
                    <div className="flex justify-center">
                      <div className="w-32 h-48 bg-gray-100 rounded-md overflow-hidden shadow-sm">
                        <img 
                          src={form.coverImageUrl} 
                          alt="Book cover preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='192' viewBox='0 0 128 192'%3E%3Crect fill='%23e5e7eb' width='128' height='192'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='16' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo Cover%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button
                      type="button"
                      onClick={onClose}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2 rounded-md bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-colors shadow-sm"
                    >
                      {initialData ? "Update Book" : "Add Book"}
                    </motion.button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}