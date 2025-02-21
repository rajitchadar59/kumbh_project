import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const transactionId = formData.get("transactionId");
    const name = formData.get("name");
    const mobileNumber = formData.get("mobileNumber");
    const source = formData.get("source");
    const destination = formData.get("destination");
    const screenshot = formData.get("screenshot");
    const amount = formData.get("amount"); // Fixed random amount

    if (!transactionId || !name || !mobileNumber || !source || !destination || !screenshot || !amount) {
      return NextResponse.json({ success: false, message: "All fields are required!" });
    }

    // Convert the uploaded image to base64
    const buffer = Buffer.from(await screenshot.arrayBuffer());
    const base64Image = buffer.toString("base64");

    // Connect to MongoDB and store payment details
    const client = await clientPromise;
    const db = client.db("kumbh");
    const collection = db.collection("payments");

    await collection.insertOne({
      transactionId,
      name,
      mobileNumber,
      source,
      destination,
      amount: parseInt(amount), 
      screenshot: `data:${screenshot.type};base64,${base64Image}`,
      uploadedAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Payment recorded successfully!" });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, message: "Upload failed!" });
  }
}
