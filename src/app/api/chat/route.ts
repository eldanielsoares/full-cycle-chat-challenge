import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const message = await prisma.chat.create({ data: body });

    return NextResponse.json({
      message,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

export async function GET() {
  try {
    const messages = await prisma.chat.findMany();

    return NextResponse.json({
      messages,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
