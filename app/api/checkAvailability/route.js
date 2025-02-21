import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { source, destination, transportMethod, date } = body;

    if (!source || !destination || !transportMethod || !date) {
      return NextResponse.json({ success: false, error: true, message: "All fields are required!" });
    }

   
    const maxSeats = 50;
    const randomAvailableSeats = Math.floor(Math.random() * maxSeats); 

    return NextResponse.json({
      success: true,
      error: false,
      source,
      destination,
      transportMethod,
      date,
      seatsAvailable: randomAvailableSeats,
    });
  } catch (error) {
    console.error("Seat Availability Error:", error);
    return NextResponse.json({ success: false, error: true, message: "Failed to check availability. Try again." });
  }
}
