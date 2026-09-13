import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, variant = "info") => {
        const id = Date.now(); // unique id for each toast
        const newToast = { id, message, variant, show: true };

        setToasts((prev) => [newToast, ...prev]); // newest on top

        // Auto-hide after 3 seconds
        setTimeout(() => {
            setToasts((prev) =>
                prev.map((t) =>
                    t.id === id ? { ...t, show: false } : t
                )
            );
        }, 3000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <ToastContainer
                position="top"
                className="p-3"
                style={{
                    position: "fixed",
                    top: "3.6rem",
                    right: "0",
                    zIndex: 9999,
                }}
            >
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        onClose={() => removeToast(toast.id)}
                        show={toast.show}
                        bg={toast.variant}
                        autohide
                        delay={3000}
                        animation={true}
                    >
                        <Toast.Body className="text-white">
                            {toast.message}
                        </Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
};

// Custom hook to use toast
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);
