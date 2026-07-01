import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router";
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const loadCart = async () => {
    if (!userId) return;
    const res = await api.get(`/cart/${userId}`);
    setCart(res.data || { items: [] });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    await api.post(`/cart/remove`, { userId, productId });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }
    await api.post(`/cart/update`, { userId, productId, quantity });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!cart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading your cart...</div>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-500 text-sm mt-1">Review your items before checkout</p>
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
            <Link to="/" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-1 text-center">Total</div>
                <div className="col-span-1 text-center">Action</div>
              </div>

              {/* Cart Items */}
              {cart.items.map((item, idx) => (
                <div
                  key={item.productId._id}
                  className={`grid grid-cols-12 gap-4 px-6 py-5 items-center ${idx < cart.items.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  {/* Product */}
                  <div className="col-span-5 flex items-center gap-4">
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-16 h-16 object-contain rounded-xl bg-gray-50 border border-gray-100"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-1">{item.productId.title}</h3>
                      <p className="text-blue-600 font-medium text-sm mt-0.5">${item.productId.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center text-gray-700 font-medium">
                    ${item.productId.price.toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-3 flex items-center justify-center gap-3">
                    <button
                      onClick={() => updateQty(item.productId._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition text-gray-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.productId._id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition text-gray-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total */}
                  <div className="col-span-1 text-center font-bold text-gray-900">
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeItem(item.productId._id)}
                      className="text-red-400 hover:text-red-600 transition p-1.5 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <Link to="/" className="flex items-center gap-2 text-blue-600 font-medium hover:underline text-sm">
                <ArrowLeft className="w-4 h-4" /> Continue Shopping
              </Link>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total ({totalItems} {totalItems === 1 ? "item" : "items"})</p>
                  <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => navigate("/checkout-address")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
