import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get("transactionId");
    const mobileNumber = searchParams.get("mobileNumber");

    if (!transactionId || !mobileNumber) {
      return NextResponse.json({ success: false, message: "Transaction ID and Mobile Number are required!" });
    }

    const client = await clientPromise;
    const db = client.db("kumbh");
    const collection = db.collection("payments");

    const ticket = await collection.findOne({ transactionId, mobileNumber });

    if (!ticket) {
      return NextResponse.json({ success: false, message: "Ticket not found!" });
    }

    return NextResponse.json({
      success: true,
      ticket: {
        name: ticket.name,
        transactionId: ticket.transactionId,
        mobileNumber: ticket.mobileNumber,
        source: ticket.source || "Not Available",
        destination: ticket.destination || "Not Available",
        amount: ticket.amount || "0", // Ensure amount is included
        
      },
    });
  } catch (error) {
    console.error("Ticket Fetch Error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch ticket!" });
  }
}
