/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("nodeAuthDB");
    const body = await req.json();

    const { userId, productId, quantity } = body;

    if (!userId || !productId || !quantity || quantity < 1) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const cartCollection = db.collection("cart");
    const productCollection = db.collection("products");

    const product = await productCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const userCart = await cartCollection.findOne({ userId });

    if (userCart) {
      const existingProduct = userCart.products.find(
        (item: any) => item._id.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        userCart.products.push({
          _id: product._id,
          productName: product.productName,
          price: product.price,
          imgUrl: product.imgUrl,
          avgRating: product.avgRating,
          category: product.category,
          quantity,
        });
      }

      await cartCollection.updateOne(
        { userId },
        { $set: { products: userCart.products } }
      );
    } else {
      await cartCollection.insertOne({
        userId,
        products: [
          {
            _id: product._id,
            productName: product.productName,
            price: product.price,
            imgUrl: product.imgUrl,
            avgRating: product.avgRating,
            category: product.category,
            quantity,
          },
        ],
      });
    }

    return NextResponse.json(
      { message: "Product added to cart successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { error: "An error occurred while adding product to cart" },
      { status: 500 }
    );
  }
}
