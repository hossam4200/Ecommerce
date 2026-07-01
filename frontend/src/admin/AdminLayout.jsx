import { Link, useLocation } from "react-router";
import { LayoutDashboard, Package, ArrowLeft } from "lucide-react";

const navItems = [
  { to: "/admin/products", label: "Products", icon: Package },
];

export default function AdminLayout({ children }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Admin Panel</p>
                  <p className="text-xs text-gray-500">Manage your store</p>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map(({ to, label, icon: Icon }) => {
                  const active = pathname.startsWith(to);
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                        active
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Store
                </Link>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
