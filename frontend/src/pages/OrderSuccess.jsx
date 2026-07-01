import { useParams, Link } from "react-router";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your purchase. Your order is being processed and will be delivered to you soon.
        </p>

        {/* Order ID */}
        <div className="bg-gray-50 rounded-xl px-6 py-4 mb-8 border border-gray-100">
          <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">Order ID</p>
          <p className="text-gray-700 font-mono font-semibold text-sm break-all">{id}</p>
        </div>

        {/* COD info */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
          <ShoppingBag className="w-4 h-4 text-green-500" />
          <span>Cash on Delivery • Pay when you receive your order</span>
        </div>

        {/* Continue Shopping */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          <Home className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}