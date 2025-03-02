"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function FruitBooking() {
  const router = useRouter();
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [fruitAmounts, setFruitAmounts] = useState({});
  const [foodAmounts, setFoodAmounts] = useState({});
  const [userInfo, setUserInfo] = useState({ name: "", email: "", mobile: "", seat: "" });
  const [isFoodMenuOpen, setIsFoodMenuOpen] = useState(false);

  const fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];
  const foods = ["Pizza", "Burger", "Pasta", "Biryani", "Sandwich"];

  const generateRandomAmount = () => {
    return (Math.random() * (500 - 50) + 50).toFixed(2);
  };

  const handleCheckboxChange = (event, type) => {
    const { value, checked } = event.target;
    if (type === "fruit") {
      if (checked) {
        setSelectedFruits([...selectedFruits, value]);
        setFruitAmounts({ ...fruitAmounts, [value]: generateRandomAmount() });
      } else {
        setSelectedFruits(selectedFruits.filter((item) => item !== value));
        const newAmounts = { ...fruitAmounts };
        delete newAmounts[value];
        setFruitAmounts(newAmounts);
      }
    } else {
      if (checked) {
        setSelectedFoods([...selectedFoods, value]);
        setFoodAmounts({ ...foodAmounts, [value]: generateRandomAmount() });
      } else {
        setSelectedFoods(selectedFoods.filter((item) => item !== value));
        const newAmounts = { ...foodAmounts };
        delete newAmounts[value];
        setFoodAmounts(newAmounts);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const totalAmount = Object.values(fruitAmounts).reduce((sum, val) => sum + parseFloat(val || 0), 0) +
                      Object.values(foodAmounts).reduce((sum, val) => sum + parseFloat(val || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/insertFruit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userInfo,
        fruits: selectedFruits,
        foods: selectedFoods,
        amounts: { ...fruitAmounts, ...foodAmounts },
        totalAmount,
      }),
    });
    const data = await response.json();
    alert(data.message);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-10 relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-gradient-to-r from-green-500 to-yellow-500 opacity-10 blur-3xl" initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 2 }} />
      <motion.div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg w-full max-w-lg text-white relative z-10" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <h2 className="text-2xl font-bold text-center mb-6 text-green-400">Select Your Items</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} placeholder="Name" required className="w-full p-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400" />
          <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} placeholder="Email" required className="w-full p-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400" />
          <input type="tel" name="mobile" value={userInfo.mobile} onChange={handleInputChange} placeholder="Mobile No." required className="w-full p-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400" />
          <input type="text" name="seat" value={userInfo.seat} onChange={handleInputChange} placeholder="Seat Number" required className="w-full p-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400" />
          
          <div className="grid grid-cols-2 gap-2">
            {fruits.map((fruit) => (
              <label key={fruit} className="flex items-center space-x-3 p-3 rounded-lg bg-white/20 hover:bg-white/30 transition cursor-pointer">
                <input type="checkbox" value={fruit} onChange={(e) => handleCheckboxChange(e, 'fruit')} className="w-5 h-5 accent-green-500" />
                <span className="text-lg">{fruit} - <span className="font-bold text-green-300">₹{fruitAmounts[fruit] || "0.00"}</span></span>
              </label>
            ))}
          </div>

          <button type="button" onClick={() => setIsFoodMenuOpen(!isFoodMenuOpen)} className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg">Select Food</button>
          
          {isFoodMenuOpen && (
            <div className="grid grid-cols-2 gap-2 p-4 bg-white/20 rounded-lg">
              {foods.map((food) => (
                <label key={food} className="flex items-center space-x-3 p-3 bg-white/30 rounded-lg hover:bg-white/40 transition cursor-pointer">
                  <input type="checkbox" value={food} onChange={(e) => handleCheckboxChange(e, 'food')} className="w-5 h-5 accent-yellow-500" />
                  <span className="text-lg">{food} - <span className="font-bold text-yellow-300">₹{foodAmounts[food] || "0.00"}</span></span>
                </label>
              ))}
            </div>
          )}

        
          <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition shadow-lg">
            Submit Order
          </button>
        </form>
      </motion.div>
    </div>
  );
}
