import { NextResponse } from "next/server";

export async function POST() {
  const API_URL: any = process.env.NEXT_PUBLIC_API_NESTIRA;
  const API_KEY: any = process.env.SECURE_API_ACCESS_KEY;

  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "api-access-key": API_KEY,
      "locale-language": "en",
    },
    credentials: "include",
  });

  const data = await res.json();

  const response = NextResponse.json(data, { status: res.status });

  response.cookies.set("access_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
