import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const transactionId = url.searchParams.get("transactionId");

    if (!transactionId) {
      return NextResponse.json({ success: false, message: "Transaction ID is required!" });
    }

    const client = await clientPromise;
    const db = client.db("kumbh");
    const collection = db.collection("payments");

    const ticket = await collection.findOne({ transactionId });

    if (!ticket) {
      return NextResponse.json({ success: false, message: "Ticket not found enter valid transaction id!" });
    }

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch ticket!" });
  }
}
