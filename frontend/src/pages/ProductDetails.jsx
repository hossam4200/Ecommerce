import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router";
import { ShoppingCart, ArrowLeft, Star, Package } from "lucide-react";
import { useToast } from "../components/Toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const showToast = useToast();

  const loadProduct = async () => {
    const res = await api.get("/products/");
    const p = res.data.find((item) => item._id === id);
    setProduct(p);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }

    const res = await api.post("/cart/add", { userId, productId: product._id });

    const total = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
    showToast(product.title);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="bg-gray-50 flex items-center justify-center p-10 border-r border-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-h-80 object-contain"
              />
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col">
              {/* Category badge */}
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
                {product.category}
              </span>

              <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">{product.title}</h1>

              {/* Stars placeholder */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-400 ml-2">(4.8)</span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">20% OFF</span>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Package className="w-4 h-4" />
                <span>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
              </div>

              {/* Add to Cart */}
              <button
                onClick={addToCart}
                disabled={product.stock === 0}
                className={`w-full md:w-auto px-8 py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ShoppingCart className="w-5 h-5" />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
