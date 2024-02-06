import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    reqBody.otp = "0";
    const prisma = new PrismaClient();
    const result = await prisma.users.create({
      data: reqBody,
    });

    return NextResponse.json({
      message: "data stored  successfully",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({ message: "request failed", data: error });
  }
}
