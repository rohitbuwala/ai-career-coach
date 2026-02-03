import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    const exist = await User.findOne({ email });

    if (exist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
    });

    return NextResponse.json(
      { message: "User created" },
      { status: 201 }
    );

  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
