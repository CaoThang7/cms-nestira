import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const API_URL: any = process.env.NEXT_PUBLIC_API_NESTIRA;
    const API_KEY: any = process.env.SECURE_API_ACCESS_KEY;

    const cookie = req.headers.get("cookie");
    const currentYear = new Date().getFullYear();

    const backendRes = await fetch(
      `${API_URL}/statistical/analytics/yearly/${currentYear}`,
      {
        method: "GET",
        headers: {
          "api-access-key": API_KEY,
          cookie: cookie || "",
        },
      },
    );

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Analytics yearly proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
