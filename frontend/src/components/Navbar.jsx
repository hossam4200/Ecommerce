import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";
import {
  ShoppingCart, Heart, LogOut, LogIn, UserPlus, Search,
  ChevronDown, Menu, Truck, Headphones, User
} from "lucide-react";

const categories = [
  "All Categories", "Electronics", "Clothing", "Home & Kitchen",
  "Beauty & Health", "Sports & Outdoors", "Books & Media",
];

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const [catOpen, setCatOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) return setCartCount(0);
      const res = await api.get(`/cart/${userId}`);
      if (res.data && res.data.items) {
        setCartCount(res.data.items.reduce((sum, item) => sum + item.quantity, 0));
      } else {
        setCartCount(0);
      }
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cat = selectedCat === "All Categories" ? "" : selectedCat;
    navigate(`/?search=${encodeURIComponent(search)}&category=${encodeURIComponent(cat)}`);
  };

  return (
    <header className="w-full">
      {/* ── Top Bar ── */}
      <div className="bg-[#0f1623] text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 mr-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">My Store</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-1 items-center bg-[#1e2a3b] rounded-lg overflow-hidden border border-[#2d3f55] focus-within:border-blue-500 transition-colors">
            <input
              type="text"
              placeholder="Search for products, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
            />
            <button type="submit" className="px-4 py-2.5 text-gray-400 hover:text-blue-400 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Category Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-2 bg-[#1e2a3b] border border-[#2d3f55] rounded-lg px-4 py-2.5 text-sm text-gray-200 hover:border-blue-500 transition-colors"
            >
              {selectedCat} <ChevronDown className={`w-4 h-4 transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>
            {catOpen && (
              <div className="absolute top-full mt-1 right-0 w-52 bg-[#1e2a3b] border border-[#2d3f55] rounded-xl shadow-xl z-50 overflow-hidden">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCat(cat); setCatOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-600 hover:text-white transition-colors ${selectedCat === cat ? "bg-blue-600 text-white" : "text-gray-300"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-[#2d3f55] shrink-0"></div>

          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors relative shrink-0 text-sm">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            Cart
          </Link>

          {/* Divider */}
          <div className="w-px h-6 bg-[#2d3f55] shrink-0"></div>

          {/* Auth */}
          {!userId ? (
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/login" className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors">
                <LogIn className="w-4 h-4" /> Login
              </Link>
              <Link to="/signup" className="flex items-center gap-1.5 text-sm bg-blue-600 hover:bg-blue-700 transition px-3 py-1.5 rounded-lg">
                <UserPlus className="w-4 h-4" /> Signup
              </Link>
            </div>
          ) : (
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors shrink-0"
            >
              <div className="w-7 h-7 rounded-full bg-[#1e2a3b] border border-[#2d3f55] flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              Logout
            </button>
          )}
        </div>
      </div>

      {/* ── Bottom Nav Bar ── */}
      <div className="bg-[#16202e] text-white border-t border-[#1e2a3b]">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          {/* Left: Shop by Categories */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 font-semibold text-sm text-white hover:text-blue-400 transition-colors shrink-0 border-r border-[#2d3f55] pr-6">
              <Menu className="w-4 h-4" /> Shop by Categories
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-5 text-sm text-gray-400">
              <Link to="/" className="hover:text-white transition-colors font-medium text-orange-400">Home</Link>
              <Link to="/" className="hover:text-white transition-colors">Shop</Link>
              <Link to="/" className="hover:text-white transition-colors">Deals</Link>
              {isAdmin && (
                <Link to="/admin/products" className="hover:text-white transition-colors text-blue-400">Admin Panel</Link>
              )}
            </nav>
          </div>

          {/* Right: Perks */}
          <div className="hidden lg:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <Truck className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="font-semibold text-white text-xs">Free Shipping</p>
                <p className="text-gray-500 text-xs">On orders over $50</p>
              </div>
            </div>
            <div className="w-px h-8 bg-[#2d3f55]"></div>
            <div className="flex items-center gap-2 text-gray-300">
              <Headphones className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="font-semibold text-white text-xs">24/7 Support</p>
                <p className="text-gray-500 text-xs">We're here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}