"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    const [fixedAmount, setFixedAmount] = useState(null); // Fixed Random Amount

    useEffect(() => {
        
        const randomAmount = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        setFixedAmount(randomAmount);
    }, []); 

    const toggleQR = () => {
        setShowQR(!showQR);
    };

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
        formData.append("amount", fixedAmount); // Store the fixed random amount

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
        <div className="flex flex-col items-center gap-4 p-5 mt-40">
            <button onClick={toggleQR} className="bg-blue-500 text-white px-4 py-2 rounded">
                {showQR ? "Hide QR" : "Pay Now Generate QR"}
            </button>

            {showQR && (
                <div className="border p-4 rounded shadow">
                    <img src="/rajitqr.jpg" alt="QR Code" className="w-40 h-40" />
                    <div className="mt-4">
                        <p className="text-lg font-bold">Pay Amount: ₹{fixedAmount ?? "Loading..."}</p>
                        <input type="text" placeholder="Enter Transaction ID" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} className="border p-2 w-full mt-2" />
                        <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full mt-2" />
                        <input type="text" placeholder="Enter Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="border p-2 w-full mt-2" />
                        <input type="text" placeholder="Enter Source" value={source} onChange={(e) => setSource(e.target.value)} className="border p-2 w-full mt-2" />
                        <input type="text" placeholder="Enter Destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="border p-2 w-full mt-2" />
                        <input type="file" onChange={handleFileChange} className="border p-2 w-full mt-2" />
                        <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                            Upload Screenshot
                        </button>
                    </div>
                </div>
            )}

            {message && <p className="text-green-500">{message}</p>}
        </div>
    );
}
