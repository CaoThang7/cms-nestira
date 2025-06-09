import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const API_URL: any = process.env.NEXT_PUBLIC_API_NESTIRA;
    const API_KEY: any = process.env.SECURE_API_ACCESS_KEY;

    const cookie = req.headers.get("cookie");
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Missing id parameter" },
        { status: 400 },
      );
    }

    const backendRes = await fetch(`${API_URL}/orders/${id}`, {
      method: "DELETE",
      headers: {
        "api-access-key": API_KEY,
        cookie: cookie || "",
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Order delete proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
