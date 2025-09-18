"use client";

import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ onClose, children }: ModalProps) {
  const router = useRouter();

  const close = () => router.back();
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
      close();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}
