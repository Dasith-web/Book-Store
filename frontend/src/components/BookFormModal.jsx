import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";




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
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
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
              <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-xl font-semibold mb-4">
                  {initialData ? "Edit Book" : "Add Book"}
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { label: "Title", name: "title" },
                    { label: "Authors (comma‑sep)", name: "authors" },
                    { label: "Price", name: "price", type: "number" },
                    { label: "Stock", name: "stock", type: "number" },
                    { label: "Categories (comma‑sep)", name: "categories" },
                    { label: "Cover Image URL", name: "coverImageUrl" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-sm mb-1">{f.label}</label>
                      <input
                        type={f.type || "text"}
                        name={f.name}
                        value={form[f.name]}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                        required={f.name === "title"}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm mb-1">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      value={form.description}
                      onChange={handleChange}
                      className="w-full rounded border px-3 py-2"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                      {initialData ? "Update" : "Save"}
                    </button>
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
