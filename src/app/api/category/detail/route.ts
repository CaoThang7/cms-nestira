import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const API_URL: any = process.env.NEXT_PUBLIC_API_NESTIRA;
    const API_KEY: any = process.env.SECURE_API_ACCESS_KEY;

    const cookie = req.headers.get("cookie");
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const locale = req.headers.get("locale-language") || "en";

    if (!id) {
      return NextResponse.json({ message: "Missing category id" }, { status: 400 });
    }

    const backendRes = await fetch(`${API_URL}/categories/detail/${id}`, {
      method: "GET",
      headers: {
        "api-access-key": API_KEY,
        "locale-language": locale,
        cookie: cookie || "",
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Category detail proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
