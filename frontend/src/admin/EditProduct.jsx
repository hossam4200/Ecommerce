import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import api from "../api/axios";
import AdminLayout from "./AdminLayout";
import ProductForm from "./ProductForm";
import { EMPTY_PRODUCT } from "./constants";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await api.get("/products");
        const product = res.data.find((p) => p._id === id);
        if (product) {
          setForm({
            title: product.title || "",
            price: product.price ?? "",
            description: product.description || "",
            category: product.category || "",
            image: product.image || "",
            stock: product.stock ?? "",
          });
        } else {
          setNotFound(true);
        }
      } catch (err) {
        setMessage({ text: "Failed to load product.", isError: true });
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (data) => {
    setSaving(true);
    setMessage({ text: "", isError: false });
    try {
      await api.put(`/products/update/${id}`, data);
      navigate("/admin/products", {
        state: { message: `"${data.title}" updated successfully.` },
      });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to update product.",
        isError: true,
      });
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading product...
        </div>
      </AdminLayout>
    );
  }

  if (notFound) {
    return (
      <AdminLayout>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </AdminLayout>
    );
  }

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

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Edit Product</h1>
        <p className="text-gray-500 text-sm mb-6">Update the product details below.</p>

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
          submitLabel="Update Product"
          loading={saving}
        />
      </div>
    </AdminLayout>
  );
}
