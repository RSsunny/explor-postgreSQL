import { SendEmail } from "@/utils/EmailUtility";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    let { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const count = await prisma.users.count({ where: { email: email } });

    if (count === 1) {
      let code = Math.floor(100000 + Math.random() * 900000);
      let emailText = `Your OTP Code is =${code}`;
      let emailSubject = "Daily News Bangladesh Verification";
      await SendEmail(email, emailText, emailSubject);

      await prisma.users.update({
        where: { email: email },
        data: { otp: code.toString() },
      });

      return NextResponse.json({
        status: "success",
        data: "6 Digit OTP Code has been sent to your email",
      });
    } else {
      return NextResponse.json({ status: "fail", data: "No user found" });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
