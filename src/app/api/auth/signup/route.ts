import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

// MongoDB connection string (store this in .env)
const uri = process.env.MONGODB_URI || "your_mongodb_connection_string";

export async function POST(request: Request) {
  const client = new MongoClient(uri);

  try {
    await client.connect(); // Ensure a fresh connection for each request
    const db = client.db("nodeAuthDB");

    const { username, email, password, role } = await request.json();

    // Validate request body
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields (name, email, password) are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const result = await db.collection("users").insertOne({
      username,
      email,
      role: "user",
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "User created successfully", userId: result.insertedId },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the user" },
      { status: 500 }
    );
  } finally {
    await client.close(); // Ensure the database connection is closed
  }
}

// Ensure Next.js API route is always dynamic
export const dynamic = "force-dynamic";
