"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, "id">) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Maps raw backend or API errors to clear, friendly user notifications.
 */
export function friendlyErrorMessage(rawError: string): { title: string; message: string } {
  const err = rawError.trim();

  if (err.includes("Unauthorized") || err.includes("Authentication required")) {
    return {
      title: "Authentication Required",
      message: "Your session has expired or requires login. Please sign in to continue.",
    };
  }

  if (err.includes("Forbidden: Cannot create booking for another student")) {
    return {
      title: "Booking Restricted",
      message: "You can only schedule classes for your own enrolled student profile.",
    };
  }

  if (err.includes("Forbidden: Cannot update another")) {
    return {
      title: "Permission Denied",
      message: "You do not have permission to modify another user's profile.",
    };
  }

  if (err.includes("Too many requests")) {
    return {
      title: "Rate Limit Exceeded",
      message: "Too many requests. Please wait a moment before trying again.",
    };
  }

  if (err.includes("Invalid login credentials")) {
    return {
      title: "Sign In Failed",
      message: "Incorrect email or password. Please verify and try again.",
    };
  }

  return {
    title: "Notice",
    message: err || "An unexpected issue occurred. Please try again.",
  };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 5000 }: Omit<ToastItem, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, title = "Success") => {
      showToast({ type: "success", title, message });
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, customTitle?: string) => {
      const friendly = friendlyErrorMessage(message);
      showToast({
        type: "error",
        title: customTitle || friendly.title,
        message: customTitle ? message : friendly.message,
      });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, title = "Warning") => {
      showToast({ type: "warning", title, message });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, title = "Info") => {
      showToast({ type: "info", title, message });
    },
    [showToast]
  );

  const value = useMemo(
    () => ({ toasts, showToast, success, error, warning, info, removeToast }),
    [toasts, showToast, success, error, warning, info, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Notification Container */}
      <div
        className="fixed top-5 right-5 z-[9999] flex max-w-md w-full flex-col gap-3 pointer-events-none px-4 sm:px-0"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const isSuccess = toast.type === "success";
            const isError = toast.type === "error";
            const isWarning = toast.type === "warning";

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.92, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                className={`pointer-events-auto relative flex w-full items-start gap-3.5 rounded-xl border p-4 shadow-xl backdrop-blur-md transition-all ${
                  isSuccess
                    ? "border-emerald-200/80 bg-white/95 text-navy dark:border-emerald-800/80 dark:bg-navy/95"
                    : isError
                    ? "border-rose-200/80 bg-white/95 text-navy dark:border-rose-800/80 dark:bg-navy/95"
                    : isWarning
                    ? "border-amber-200/80 bg-white/95 text-navy dark:border-amber-800/80 dark:bg-navy/95"
                    : "border-slate-border bg-white/95 text-navy dark:border-navy-light dark:bg-navy/95"
                }`}
              >
                {/* Status Icon */}
                <div className="mt-0.5 shrink-0">
                  {isSuccess && <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                  {isError && <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />}
                  {isWarning && <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
                  {toast.type === "info" && <Info className="h-5 w-5 text-copper" />}
                </div>

                {/* Content */}
                <div className="flex-1 pr-2">
                  {toast.title && (
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-cream">
                      {toast.title}
                    </h4>
                  )}
                  <p className="mt-0.5 text-xs font-medium leading-relaxed text-slate dark:text-slate-light">
                    {toast.message}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  aria-label="Close notification"
                  className="rounded-lg p-1 text-slate hover:bg-black/5 hover:text-navy dark:text-slate-light dark:hover:bg-white/10 dark:hover:text-cream transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
