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
    const screenshot = formData.get("screenshot");

    if (!transactionId || !name || !screenshot) {
      return NextResponse.json({ success: false, message: "All fields are required!" });
    }

   
    const buffer = Buffer.from(await screenshot.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const client = await clientPromise;
    const db = client.db("kumbh");
    const collection = db.collection("payments");

    await collection.insertOne({
      transactionId,
      name,
      screenshot: `data:${screenshot.type};base64,${base64Image}`, 
      uploadedAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Payment recorded successfully!" });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, message: "Upload failed!" });
  }
}
