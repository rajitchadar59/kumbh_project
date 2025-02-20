'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router= useRouter();
  const handletrynow = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/booking");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      

      <main className="flex-1">
        <section className="w-full py-20 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-40">
          <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Book Your Journey with Ease
              </h1>
              <p className="max-w-[700px] md:text-xl">
                Find and book the best bus, train, and metro tickets for your travel needs.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                
                  <button onClick={()=>{handletrynow()}} className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium shadow-lg hover:bg-gray-200 transition">
                    Get Started
                  </button>
                
                <Link href="/about">
                  <button className="bg-blue-500 px-6 py-3 rounded-md font-medium text-white shadow-lg hover:bg-blue-700 transition">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="kumbhlogo.webp"
                alt="side image"
                className="w-full max-w-sm rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2025 yatranxt. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-600" href="/about">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-600" href="/">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-600" href="/contactus">
            Cookies
          </Link>
        </nav>
      </footer>
    </div>
  );
}
