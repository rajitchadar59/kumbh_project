"use client";
import { useState } from "react";

export default function PaymentPage() {
  const [showQR, setShowQR] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !transactionId || !name) {
      setMessage("Please fill all fields and upload a screenshot.");
      return;
    }

    const formData = new FormData();
    formData.append("screenshot", file);
    formData.append("transactionId", transactionId);
    formData.append("name", name);

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
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-5 mt-40">
      <button onClick={toggleQR} className="bg-blue-500 text-white px-4 py-2 rounded">
        {showQR ? "Hide QR" : "Generate QR"}
      </button>

      {showQR && (
        <div className="border p-4 rounded shadow">
          <img src="/rajitqr.jpg" alt="QR Code" className="w-40 h-40" />
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full mt-2"
            />
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
