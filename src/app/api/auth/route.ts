// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   const body = await req.json();
  
//   const API_URL: any = process.env.SECURE_API_URL;
//   const API_ACCESS_KEY: any = process.env.SECURE_API_ACCESS_KEY;

//   const res = await fetch(`${API_URL}auth/login`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//       'api-access-key': API_ACCESS_KEY,
//     },
//     body: JSON.stringify(body),
//   })

//   const data = await res.json()
//   return NextResponse.json(data)
// }
