import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("nodeAuthDB");

    // Fetch products
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching products" },
      { status: 500 }
    );
  }
}
