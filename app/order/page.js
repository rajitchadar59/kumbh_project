"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function FruitBooking() {
  const router=useRouter();
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [fruitAmounts, setFruitAmounts] = useState({});
  const [userInfo, setUserInfo] = useState({ name: "", email: "", mobile: "" });

  const fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];

  const generateRandomAmount = () => {
    return (Math.random() * (500 - 50) + 50).toFixed(2); 
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFruits([...selectedFruits, value]);
      setFruitAmounts({ ...fruitAmounts, [value]: generateRandomAmount() });
    } else {
      setSelectedFruits(selectedFruits.filter((fruit) => fruit !== value));
      const newAmounts = { ...fruitAmounts };
      delete newAmounts[value];
      setFruitAmounts(newAmounts);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/insertFruit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userInfo, fruits: selectedFruits, amounts: fruitAmounts }),
    });
    const data = await response.json();
    alert(data.message);
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Select Fruits</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Mobile No.:
            <input
              type="tel"
              name="mobile"
              value={userInfo.mobile}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
          {fruits.map((fruit) => (
            <label key={fruit} className="block mb-2">
              <input
                type="checkbox"
                value={fruit}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {fruit} - ₹{fruitAmounts[fruit] || "0.00"}
            </label>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}