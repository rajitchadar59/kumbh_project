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
    const row = Math.floor(Math.random() * 30) + 1; // Rows from 1 to 30
    const seatLetter = ["A", "B", "C", "D", "E", "F"][Math.floor(Math.random() * 6)]; // Random seat A-F
    return `${row}${seatLetter}`;
  };

  const fetchTicket = async () => {
    try {
      setError("");
      const response = await fetch(`/api/ticket?transactionId=${transactionId}&mobileNumber=${mobileNumber}`);
      const data = await response.json();
      
      if (data.success) {
        const seatNumber = generateRandomSeat(); // Generate a random seat number
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

    // Header
    doc.setFontSize(18);
    doc.text("🎟️ Ticket Confirmation", 70, 20);

    // Table
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">🎫 Check Your Ticket</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <input
          type="text"
          placeholder="Enter Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="px-4 py-2 border rounded-md mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="px-4 py-2 border rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchTicket}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Get Ticket
        </button>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {ticket && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">🎟 Your Ticket</h2>
          <div className="border p-4 rounded-lg bg-gray-50">
            <p><strong>Name:</strong> {ticket.name}</p>
            <p><strong>Transaction ID:</strong> {ticket.transactionId}</p>
            <p><strong>Mobile Number:</strong> {ticket.mobileNumber}</p>
            <p><strong>Source:</strong> {ticket.source}</p>
            <p><strong>Destination:</strong> {ticket.destination}</p>
            <p><strong>Seat Number:</strong> {ticket.seatNumber}</p> {/* ✅ Show seat number */}
            <p><strong>Amount Paid:</strong> ₹{ticket.amount}</p> 
            <p><strong>Status:</strong> ✔ Success</p> 
          </div>
          <button
            onClick={generatePDF}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-full"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
