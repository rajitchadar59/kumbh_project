"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function TicketPage() {
  const [transactionId, setTransactionId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  const fetchTicket = async () => {
    try {
      setError("");
      const response = await fetch(`/api/ticket?transactionId=${transactionId}`);
      const data = await response.json();
      
      if (data.success) {
        setTicket(data.ticket);
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
    doc.text("🎟️ Ticket Confirmation", 20, 20);
    doc.text(`✅ Name: ${ticket.name}`, 20, 40);
    doc.text(`📄 Transaction ID: ${ticket.transactionId}`, 20, 60);
    doc.text("🟢 Status: Success", 20, 80);

    doc.save(`Ticket_${ticket.transactionId}.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Check Ticket Status</h1>
      <input
        type="text"
        placeholder="Enter Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        className="px-4 py-2 border rounded-md mb-4 w-80"
      />
      <button
        onClick={fetchTicket}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
      >
        Get Ticket
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      
      {ticket && (
        <div className="mt-6 bg-white p-4 rounded-md shadow-md w-80">
          <p><strong>Name:</strong> {ticket.name}</p>
          <p><strong>Transaction ID:</strong> {ticket.transactionId}</p>
          <p className="text-green-600 font-bold"> Booking : ✔ Success</p>
          <button
            onClick={generatePDF}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
