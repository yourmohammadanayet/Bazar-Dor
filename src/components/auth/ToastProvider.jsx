"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          fontFamily: "inherit",
          fontSize: "14px",
          background: "#fafcfa",
          color: "#1d271f",
          border: "1px solid #e1e8e1",
        },
      }}
    />
  );
}