"use client";
import { useEffect } from "react";
import { FcApproval } from "react-icons/fc";

export default function SuccessAlert({isVisible, setIsVisible}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed w-fit top-16 left-1/2 right-1/2 flex items-center gap-x-4 bg-emerald-50 border border-emerald-400 text-black/70 px-4 py-1 rounded-md shadow-lg transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
      <FcApproval className="size-5" />
      <span className="text-base font-bold">تــــــــم</span>
    </div>
  )
}