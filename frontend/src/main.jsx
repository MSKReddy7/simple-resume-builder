import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { FormProvider } from "./context/FormContext";
import { ToastProvider } from "./context/ToastContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ToastProvider>
                <FormProvider>
                    <App />
                </FormProvider>
            </ToastProvider>
        </BrowserRouter>
    </React.StrictMode>
);
