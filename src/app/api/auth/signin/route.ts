import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const client = await clientPromise;
    const db = client.db("nodeAuthDB");

    // Find the user
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json(
      {
        message: "Authentication successful",
        token,
        userId: user._id,
        userRole: user.role,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during authentication" },
      { status: 500 }
    );
  }
}
