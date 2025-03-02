"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PaymentPage() {
    const router = useRouter();
    const [showQR, setShowQR] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [fixedAmount, setFixedAmount] = useState(null);

    useEffect(() => {
        const randomAmount = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        setFixedAmount(randomAmount);
    }, []);

    const toggleQR = () => setShowQR(!showQR);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file || !transactionId || !name || !mobileNumber || !source || !destination || !fixedAmount) {
            setMessage("Please fill all fields and upload a screenshot.");
            return;
        }

        const formData = new FormData();
        formData.append("screenshot", file);
        formData.append("transactionId", transactionId);
        formData.append("name", name);
        formData.append("mobileNumber", mobileNumber);
        formData.append("source", source);
        formData.append("destination", destination);
        formData.append("amount", fixedAmount);

        const res = await fetch("/api/store-payment", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setMessage(data.message);

        if (data.success) {
            setShowQR(false);
            setTransactionId("");
            setName("");
            setMobileNumber("");
            setSource("");
            setDestination("");
            setFile(null);
        }
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col items-center justify-center p-5 relative overflow-hidden">
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-10 blur-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 2 }}
            />

            <motion.div 
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-xl text-white relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-3xl font-extrabold text-center text-[#38a3a5] mb-6">💳 Payment</h1>

                <motion.button 
                    onClick={toggleQR} 
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-bold py-3 rounded-full shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {showQR ? "Hide QR" : "Pay Now & Generate QR"}
                </motion.button>

                {showQR && (
                    <motion.div 
                        className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="/rajitqr.jpg" alt="QR Code" className="w-48 h-48 mx-auto rounded-md shadow-md" />
                        <p className="text-lg font-bold text-center mt-4">Pay Amount: ₹{fixedAmount ?? "Loading..."}</p>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Transaction ID" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} className="col-span-2 w-full border border-white/30 p-3 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg" />
                            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-white/30 p-3 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg" />
                            <input type="text" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="w-full border border-white/30 p-3 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg" />
                            <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} className="w-full border border-white/30 p-3 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg" />
                            <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full border border-white/30 p-3 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg" />
                            <input type="file" onChange={handleFileChange} className="w-full border border-white/30 p-3 bg-transparent text-white focus:ring-2 focus:ring-blue-400 rounded-lg" />
                        </div>

                        <motion.button 
                            onClick={handleUpload} 
                            className="w-full mt-4 bg-green-500 hover:bg-green-600 transition-all text-white font-bold py-3 rounded-full shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Upload Screenshot
                        </motion.button>
                    </motion.div>
                )}

                {message && <p className="text-green-400 text-center mt-4">{message}</p>}
            </motion.div>
        </div>
    );
}
