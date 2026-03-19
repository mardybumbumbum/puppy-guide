import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function Card({ className = "", children, onClick }: CardProps) {
  const base =
    "bg-white rounded-2xl shadow-sm border border-slate-100 p-4";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} w-full text-left active:scale-95 transition-transform duration-100 ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={`${base} ${className}`}>
      {children}
    </div>
  );
}
