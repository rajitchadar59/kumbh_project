"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function TicketPage() {
  const [transactionId, setTransactionId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  const generateRandomSeat = () => {
    const row = Math.floor(Math.random() * 30) + 1;
    const seatLetter = ["A", "B", "C", "D", "E", "F"][Math.floor(Math.random() * 6)];
    return `${row}${seatLetter}`;
  };

  const fetchTicket = async () => {
    try {
      setError("");
      const response = await fetch(`/api/ticket?transactionId=${transactionId}&mobileNumber=${mobileNumber}`);
      const data = await response.json();
      
      if (data.success) {
        const seatNumber = generateRandomSeat(); 
        setTicket({ ...data.ticket, seatNumber });
      } else {
        setError(data.message);
        setTicket(null);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Error fetching ticket!");
      setTicket(null);
    }
  };

  const generatePDF = () => {
    if (!ticket) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🎟️ Ticket Confirmation", 70, 20);
    doc.autoTable({
      startY: 30,
      head: [["Field", "Details"]],
      body: [
        ["Name", ticket.name],
        ["Transaction ID", ticket.transactionId],
        ["Mobile Number", ticket.mobileNumber],
        ["Source", ticket.source],
        ["Destination", ticket.destination],
        ["Seat Number", ticket.seatNumber],
        ["Amount Paid", `₹${ticket.amount}`],
        ["Payment Status", ticket.paymentStatus],
        ["Status", "✔ Success"],
      ],
      theme: "grid",
    });
    doc.save(`Ticket_${ticket.transactionId}.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-yellow-400">🎫 Check Your Ticket</h1>
      
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg w-96 border border-white/20">
        <input
          type="text"
          placeholder="Enter Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="px-4 py-3 border border-white/30 rounded-lg mb-3 w-full bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="px-4 py-3 border border-white/30 rounded-lg mb-4 w-full bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={fetchTicket}
          className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all text-white font-bold py-3 rounded-lg shadow-lg"
        >
          Get Ticket
        </button>
      </div>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {ticket && (
        <div className="mt-6 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg w-96 border border-white/20">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">🎟 Your Ticket</h2>
          <div className="border border-white/30 p-4 rounded-lg bg-white/10">
            <p><strong>Name:</strong> {ticket.name}</p>
            <p><strong>Transaction ID:</strong> {ticket.transactionId}</p>
            <p><strong>Mobile Number:</strong> {ticket.mobileNumber}</p>
            <p><strong>Source:</strong> {ticket.source}</p>
            <p><strong>Destination:</strong> {ticket.destination}</p>
            <p><strong>Seat Number:</strong> {ticket.seatNumber}</p>
            <p><strong>Amount Paid:</strong> ₹{ticket.amount}</p>
            <p><strong>Status:</strong> ✔ Success</p>
          </div>
          <button
            onClick={generatePDF}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 transition-all text-white font-bold py-3 rounded-lg shadow-lg"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
