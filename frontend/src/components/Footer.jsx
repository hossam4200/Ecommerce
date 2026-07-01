import { Link } from "react-router";
import { ShoppingCart, Globe, MessageSquare, Camera, Video, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f1623] text-gray-400 mt-auto">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">My Store</span>
          </Link>
          <p className="text-sm leading-relaxed mb-5">
            Your one-stop destination for quality products at the best prices. Shop thousands of items across all categories.
          </p>
          {/* Socials */}
          <div className="flex items-center gap-3">
            {[Globe, MessageSquare, Camera, Video].map((Icon, i) => (
              <button key={i} className="w-9 h-9 rounded-lg bg-[#1e2a3b] flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Icon className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {["Home", "Shop", "New Arrivals", "Deals & Offers", "About Us", "Contact"].map((link) => (
              <li key={link}>
                <Link to="/" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <ul className="space-y-2.5 text-sm">
            {["Electronics", "Clothing", "Home & Kitchen", "Beauty & Health", "Sports & Outdoors", "Books & Media"].map((cat) => (
              <li key={cat}>
                <Link to={`/?category=${encodeURIComponent(cat)}`} className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
              <span>Alexandria, Egypt</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+20 1201328360</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>example@gmail.com</span>
            </li>
          </ul>

          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1e2a3b]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {year} My Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-gray-400 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
