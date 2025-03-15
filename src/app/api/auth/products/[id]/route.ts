import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("nodeAuthDB");

    // Convert string ID to MongoDB ObjectId
    const productId = new ObjectId(params.id);
    const product = await db.collection("products").findOne({ _id: productId });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching the product" },
      { status: 500 }
    );
  }
}
