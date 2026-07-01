import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useSearchParams } from "react-router";
import { Search, Monitor, Shirt, Armchair, FlaskConical, Dumbbell, BookOpen, Tag, ArrowRight } from "lucide-react";
import { useToast } from "../components/Toast";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const showToast = useToast();

  const loadProducts = async () => {
    const res = await api.get(
      `/products?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const res = await api.post(`/cart/add`, { userId, productId });

    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));

    // Find product name for the toast
    const product = products.find(p => p._id === productId);
    showToast(product ? product.title : "Item added to your cart");
  };

  const categoryCards = [
    { name: "Electronics", count: "120+", icon: Monitor, bg: "bg-blue-50", text: "text-blue-500", border: "border-blue-200" },
    { name: "Clothing", count: "85+", icon: Shirt, bg: "bg-green-50", text: "text-green-500", border: "border-green-200" },
    { name: "Home & Kitchen", count: "60+", icon: Armchair, bg: "bg-orange-50", text: "text-orange-500", border: "border-orange-200" },
    { name: "Beauty & Health", count: "45+", icon: FlaskConical, bg: "bg-pink-50", text: "text-pink-500", border: "border-pink-200" },
    { name: "Sports & Outdoors", count: "70+", icon: Dumbbell, bg: "bg-purple-50", text: "text-purple-500", border: "border-purple-200" },
    { name: "Books & Media", count: "90+", icon: BookOpen, bg: "bg-teal-50", text: "text-teal-500", border: "border-teal-200" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto bg-[#F9FAFB] min-h-screen font-sans">
      {/* Search Bar Container */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-12 flex flex-col md:flex-row gap-4 border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearchParams({ search: e.target.value, category })}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setSearchParams({ search, category: e.target.value })}
          className="md:w-64 border border-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Beauty & Health">Beauty & Health</option>
          <option value="Sports & Outdoors">Sports & Outdoors</option>
          <option value="Books & Media">Books & Media</option>
        </select>
      </div>

      {/* Categories Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-500 mt-1">Browse our top categories and find what you need</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
        {categoryCards.map((cat) => (
          <div key={cat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition duration-200">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${cat.bg}`}>
              <cat.icon className={`w-10 h-10 ${cat.text}`} strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{cat.count} products</p>
            <button 
              onClick={() => { setSearchParams({ search, category: cat.name }); window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) / 2,
  behavior: "smooth" }); }}
              className={`mt-auto px-4 py-1.5 border rounded-lg text-sm font-medium flex items-center gap-1 transition-colors hover:bg-gray-50 ${cat.text} ${cat.border}`}
            >
              Browse <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Help Banner */}
      <div className="bg-[#EEF2FF] rounded-2xl p-6 md:px-8 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 mb-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
            <Tag className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Can't find what you're looking for?</h3>
            <p className="text-gray-600 text-sm mt-0.5">Try searching or browse all our products.</p>
          </div>
        </div>
        <button 
          onClick={() => { setSearchParams({ search: "", category: "" }); window.scrollTo({ top: (document.documentElement.scrollHeight - window.innerHeight) / 2,
  behavior: "smooth" }); }}
          className="bg-[#2563EB] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2 shrink-0"
        >
          View All Products <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Products Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{category ? `${category} Products` : "Featured Products"}</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-contain bg-white rounded-lg mb-3"
                  />
                  <h2 className="font-semibold text-gray-900 line-clamp-1">{product.title}</h2>
                </Link>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-gray-700 font-bold">${product.price}</p>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
