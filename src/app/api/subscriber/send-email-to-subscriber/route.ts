import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const API_URL: any = process.env.NEXT_PUBLIC_API_NESTIRA;
    const API_KEY: any = process.env.SECURE_API_ACCESS_KEY;

    const cookie = req.headers.get("cookie");
    const { searchParams } = new URL(req.url);
    const subscriberId = searchParams.get("subscriberId");
    const promotionId = searchParams.get("promotionId");
    const locale = searchParams.get("locale") || "en";

    if (!subscriberId || !promotionId) {
      return NextResponse.json(
        { message: "Missing subscriberId or promotionId parameter" },
        { status: 400 },
      );
    }

    const backendRes = await fetch(
      `${API_URL}/newsletters/send/${subscriberId}/promotion/${promotionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-access-key": API_KEY,
          "locale-language": locale,
          cookie: cookie || "",
        },
      },
    );

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("send email to subscriber proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
