import { useState } from "react";
import { Link } from "react-router";
import { ImageIcon, Loader2 } from "lucide-react";
import { CATEGORIES } from "./constants";

const fields = [
  { name: "title", label: "Product Title", type: "text", required: true, placeholder: "e.g. Wireless Headphones" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Describe the product..." },
  { name: "price", label: "Price ($)", type: "number", required: true, placeholder: "0.00", min: "0", step: "0.01" },
  { name: "stock", label: "Stock Quantity", type: "number", required: true, placeholder: "0", min: "0" },
  { name: "image", label: "Image URL", type: "url", placeholder: "https://example.com/image.jpg" },
];

export default function ProductForm({
  form,
  onChange,
  onSubmit,
  submitLabel,
  cancelTo = "/admin/products",
  loading = false,
}) {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Product title is required.");
      return;
    }
    if (form.price === "" || Number(form.price) < 0) {
      setError("Please enter a valid price.");
      return;
    }
    if (form.stock === "" || Number(form.stock) < 0) {
      setError("Please enter a valid stock quantity.");
      return;
    }

    onSubmit({
      ...form,
      title: form.title.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map(({ name, label, type, required, placeholder, min, step }) => (
          <div key={name} className={type === "textarea" ? "md:col-span-2" : ""}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {label}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={form[name]}
                onChange={onChange}
                placeholder={placeholder}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            ) : (
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                min={min}
                step={step}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={onChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {form.image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Image Preview</label>
            <div className="w-full h-36 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src={form.image}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="hidden flex-col items-center text-gray-400">
                <ImageIcon className="w-8 h-8 mb-1" />
                <span className="text-xs">Invalid image URL</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed font-medium"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {submitLabel}
        </button>
        <Link
          to={cancelTo}
          className="flex-1 text-center py-2.5 px-6 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition font-medium"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
