import React from 'react'
import { useRouter } from "next/navigation";
const handletrynow = () => {
    const router= useRouter();
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/booking");
    } else {
      router.push("/login");
    }
  };
const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
