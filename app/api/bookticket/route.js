import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { source, destination, date, seatPreference, passengerName, mobileNumber, transportMethod } = body;

    if (!source || !destination || !date || !passengerName || !mobileNumber || !transportMethod) {
      return Response.json({ success: false, error: true, message: "All fields are required!" });
    }

    const client = await clientPromise;
    const db = client.db("kumbh");
    const collection = db.collection("bookings");

    const result = await collection.insertOne({
      source,
      destination,
      date,
      seatPreference,
      transportMethod,
      passengerName,
      mobileNumber,
      bookedAt: new Date(),
    });

    return Response.json({ success: true, error: false, message: "Ticket booked successfully!" });
  } catch (error) {
    console.error("Booking Error:", error);
    return Response.json({ success: false, error: true, message: "Booking failed. Try again." });
  }
}
