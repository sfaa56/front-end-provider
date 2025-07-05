import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  // Forward login to your backend
  const backendRes = await fetch('https://provider-jmy5sd3gc-yusefs-projects-b3490cde.vercel.app/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await backendRes.json();
  const backendSetCookie = backendRes.headers.get('set-cookie');

  // Send response + set cookie for frontend domain
  const response = NextResponse.json(data, { status: backendRes.status });
  if (backendSetCookie) {
    // Strip backend domain, set cookie for frontend
    response.headers.set(
      'Set-Cookie',
      backendSetCookie.replace(/Domain=[^;]+;/, 'Domain=;')
    );
  }
  return response;
}

