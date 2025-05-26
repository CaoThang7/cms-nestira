import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const API_URL: any = process.env.NEXT_PUBLIC_API_NESTIRA;
    const API_KEY: any = process.env.SECURE_API_ACCESS_KEY;

    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const cookie = req.headers.get("cookie");

    const backendRes = await fetch(`${API_URL}/categories/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "api-access-key": API_KEY,
        cookie: cookie || "",
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Update category proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
