import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { CheckCircle, CreditCard, FileText, MapPin, Plus, Pencil, ShoppingBag } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!userId) return;
    api.get(`/cart/${userId}`).then((res) => setCart(res.data));
    api.get(`/address/${userId}`).then((res) => {
      setAddresses(res.data);
      if (res.data.length > 0) setSelectedAddress(res.data[0]);
    });
  }, []);

  if (!cart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading checkout...</div>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }
    setPlacing(true);
    try {
      const res = await api.post("/order/place", { userId, address: selectedAddress });
      navigate(`/order-success/${res.data.orderId}`);
    } catch (err) {
      alert("Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-5 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-500 text-sm">Review your order and place it</p>
          </div>
          {/* Step Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</div>
              <span className="text-xs text-blue-600 font-semibold mt-1">Address</span>
            </div>
            <div className="w-10 h-px bg-gray-300 mb-4"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">2</div>
              <span className="text-xs text-gray-400 mt-1">Payment</span>
            </div>
            <div className="w-10 h-px bg-gray-300 mb-4"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">3</div>
              <span className="text-xs text-gray-400 mt-1">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left - Addresses */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-base font-semibold text-gray-800 mb-3">Select Delivery Address</h2>

            {addresses.map((addr, idx) => (
              <label
                key={addr._id}
                className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedAddress?._id === addr._id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-100 bg-white hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress?._id === addr._id}
                  onChange={() => setSelectedAddress(addr)}
                  className="mt-1 accent-blue-600"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900">{addr.fullName}</span>
                    {idx === 0 && (
                      <span className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{addr.addressLine}</p>
                  <p className="text-sm text-gray-500">{addr.city}, {addr.state} {addr.pincode}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> +{addr.phone}
                  </p>
                </div>
                <button type="button" className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition shrink-0">
                  <Pencil className="w-4 h-4" />
                </button>
              </label>
            ))}

            {/* Add new address */}
            <button
              onClick={() => navigate("/checkout-address")}
              className="w-full py-3.5 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2 font-medium text-sm"
            >
              <Plus className="w-4 h-4" /> Add New Address
            </button>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4">
              <h2 className="text-base font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {cart.items.map((item) => (
                  <div key={item.productId._id} className="flex items-center gap-3">
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-12 h-12 object-contain rounded-lg bg-gray-50 border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.productId.title}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 shrink-0">${(item.productId.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? "$0.00" : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900 border-t border-gray-100 pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={placing}
                className="w-full bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                {placing ? "Placing Order..." : "Place Order (COD)"}
              </button>
              <p className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                Cash on Delivery • Pay when you receive
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
