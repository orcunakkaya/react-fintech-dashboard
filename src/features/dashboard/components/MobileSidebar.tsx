import { useEffect } from "react";
import Sidebar from "./Sidebar";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSidebar({ open, onClose }: Props) {
  // ESC ile kapat
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div
      className={[
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        className={[
          "absolute inset-0 bg-black/30 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={[
          "absolute left-0 top-0 h-full w-[280px] bg-white shadow-xl transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
      >
        <Sidebar />
      </div>
    </div>
  );
}