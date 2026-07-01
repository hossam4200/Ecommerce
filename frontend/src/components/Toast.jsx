import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, ShoppingCart, X } from "lucide-react";

// Context
const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

// Provider wraps the whole app
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      {/* Toast Container - fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 bg-white border border-gray-100 rounded-2xl shadow-xl px-5 py-4 min-w-[280px] max-w-sm animate-slide-in"
            style={{ animation: "slideIn 0.3s ease" }}
          >
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">Added to Cart!</p>
              <p className="text-gray-500 text-xs mt-0.5">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 transition shrink-0 p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
