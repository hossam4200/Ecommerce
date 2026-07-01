import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";
import AdminLayout from "./AdminLayout";
import ProductForm from "./ProductForm";
import { EMPTY_PRODUCT } from "./constants";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function AddProduct() {
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    setMessage({ text: "", isError: false });
    try {
      await api.post("/products/add", data);
      navigate("/admin/products", {
        state: { message: `"${data.title}" added successfully.` },
      });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to add product.",
        isError: true,
      });
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Add New Product</h1>
        <p className="text-gray-500 text-sm mb-6">Fill in the details to list a new product.</p>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm font-medium ${
              message.isError
                ? "bg-red-50 text-red-600 border border-red-100"
                : "bg-green-50 text-green-600 border border-green-100"
            }`}
          >
            {message.text}
          </div>
        )}

        <ProductForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="Add Product"
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
}
