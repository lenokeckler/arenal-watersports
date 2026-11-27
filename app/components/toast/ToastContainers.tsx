"use client";

import React from "react";
import Toast from "./Toast";
import { ARIA_LABEL, ARIA_ROLE } from "@/app/constants";
import { useToast } from "./utils/useToast";
import { resolveToastContainerClassName } from "./styles/ToastContainer.styles";

const ToastContainer = () => {
  const { toasts, isMobile, handleRemoveToast } =
    useToast();

  return (
    <div
      role={ARIA_ROLE.REGION}
      aria-label={ARIA_LABEL.TOASTS}
      aria-live="polite"
      className={resolveToastContainerClassName(isMobile)}
    >
      {toasts.map((toastItem) => (
        <Toast
          key={toastItem.id}
          message={toastItem.message}
          iconPath={toastItem.iconPath}
          onClose={handleRemoveToast(toastItem.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
