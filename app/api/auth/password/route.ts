import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const sessionCookie = req.cookies.get('session')?.value;

  const backendRes = await fetch(
    'https://provider-mauve.vercel.app/api/auth/password',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionCookie ? { Cookie: `session=${sessionCookie}` } : {}),
      },
      body: await req.text(),
    }
  );
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}