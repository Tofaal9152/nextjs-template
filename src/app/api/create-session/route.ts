import { CreateSession } from "@/lib/session";
import { Session } from "@/features/auth/_types/auth.types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Session;
    const user = body?.user;
    const accessToken = body?.accessToken;
    const refreshToken = body?.refreshToken;

    if (!user?.id || !accessToken || !refreshToken) {
      return NextResponse.json(
        { success: false, message: "Missing user/tokens in request body" },
        { status: 400 },
      );
    }

    await CreateSession({
      user: {
        id: String(user.id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });

    return NextResponse.json(
      { success: true, message: "Session creation successful" },
      { status: 201 },
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e?.message || "Server error" },
      { status: 500 },
    );
  }
}
