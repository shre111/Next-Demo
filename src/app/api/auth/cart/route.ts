import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("nodeAuthDB");

    // Parse the request URL
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const cartCollection = db.collection("cart");
    let cartItems;

    if (userId) {
      cartItems = await cartCollection.find({ userId }).toArray();
    } else {
      cartItems = await cartCollection.find({}).toArray();
    }

    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching cart items" },
      { status: 500 }
    );
  }
}
