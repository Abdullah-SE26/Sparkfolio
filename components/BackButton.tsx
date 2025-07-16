"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Don't render back button on homepage
  if (pathname === "/") return null;

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-gray-600 hover:text-black px-3 py-1.5 border border-gray-300 rounded-md transition hover:border-black"
      aria-label="Go back"
    >
      <ArrowLeft size={18} className="mr-1" />
      Back
    </button>
  );
};

export default BackButton;
