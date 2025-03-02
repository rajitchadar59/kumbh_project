import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("kumbh");
    const collection = db.collection("orders");

    // Validation: Check if required fields exist
    if (!body.name || !body.email || !body.mobile || !body.seat || !body.fruits || !body.foods || !body.amounts) {
      return Response.json(
        { success: false, error: true, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate total amount
    const totalAmount = Object.values(body.amounts).reduce((sum, val) => sum + parseFloat(val || 0), 0);

    // Create order object
    const orderData = {
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      seat: body.seat,
      fruits: body.fruits,
      foods: body.foods,
      amounts: body.amounts,
      totalAmount,
      createdAt: new Date(),
    };

    // Insert order into database
    const result = await collection.insertOne(orderData);

    return Response.json(
      {
        success: true,
        error: false,
        message: "Order placed successfully!",
        orderId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return Response.json(
      {
        success: false,
        error: true,
        message: "Internal Server Error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
