import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleTryNow = () => {
    if (typeof window !== "undefined") {
      const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      router.push(isLoggedIn ? "/booking" : "/login");
    }
  };

  return (
    <div>
      <button onClick={handleTryNow} className="px-4 py-2 bg-blue-500 text-white rounded">
        Get Started
      </button>
    </div>
  );
};

export default Page;
