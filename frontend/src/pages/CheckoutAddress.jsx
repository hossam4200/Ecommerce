import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { User, Phone, MapPin, Building, Map, Mail, Save } from "lucide-react";

export default function CheckoutAddress() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    await api.post("/address/add", { ...form, userId });
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Left Panel - Illustration */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-10 text-center">
            {/* SVG Illustration */}
            <div className="mb-6">
              <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" fill="#EEF2FF"/>
                {/* House */}
                <rect x="55" y="100" width="90" height="60" rx="4" fill="white" stroke="#C7D2FE" strokeWidth="2"/>
                <polygon points="50,100 100,60 150,100" fill="#6366F1"/>
                {/* Door */}
                <rect x="85" y="125" width="30" height="35" rx="3" fill="#C7D2FE"/>
                {/* Window */}
                <rect x="65" y="110" width="22" height="18" rx="2" fill="#BAE6FD"/>
                <rect x="113" y="110" width="22" height="18" rx="2" fill="#BAE6FD"/>
                {/* Location Pin */}
                <circle cx="100" cy="50" r="16" fill="#2563EB"/>
                <circle cx="100" cy="50" r="7" fill="white"/>
                <line x1="100" y1="66" x2="100" y2="78" stroke="#2563EB" strokeWidth="3" strokeLinecap="round"/>
                {/* Trees */}
                <circle cx="35" cy="135" r="14" fill="#86EFAC"/>
                <rect x="33" y="148" width="4" height="12" rx="2" fill="#6B7280"/>
                <circle cx="165" cy="130" r="12" fill="#86EFAC"/>
                <rect x="163" y="140" width="4" height="12" rx="2" fill="#6B7280"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Delivery Address</h2>
            <p className="text-gray-500 text-sm leading-relaxed">Please provide your delivery details so we can get your order to you.</p>
          </div>

          {/* Right Panel - Form */}
          <div className="md:col-span-3 p-8 md:p-10">
            <form onSubmit={saveAddress} className="space-y-5">
              {/* Full Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Address Line */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="addressLine"
                    value={form.addressLine}
                    onChange={handleChange}
                    placeholder="House number and street name"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* City + State + Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">State / Province</label>
                  <div className="relative">
                    <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="Enter your state"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Pincode / ZIP</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="Enter pincode"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-2"
              >
                <Save className="w-4 h-4" /> Save Address
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}