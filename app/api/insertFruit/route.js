import clientPromise from "@/lib/mongodb";

export const POST = async (req) => {
  try {
    const body = await req.json(); 
    const client = await clientPromise;
    const db = client.db("kumbh");
    const collection = db.collection("orders");

 
    if (!body.name || !body.email || !body.mobile || !body.fruits || !body.amounts) {
      return new Response(
        JSON.stringify({ success: false, error: true, message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const result = await collection.insertOne({
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      fruits: body.fruits,
      amounts: body.amounts,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, error: false, message: "Order placed successfully!", orderId: result.insertedId }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Error inserting data:", error);
    return new Response(
      JSON.stringify({ success: false, error: true, message: "Internal Server Error", details: error.message }),
      { status: 500 }
    );
  }
};
