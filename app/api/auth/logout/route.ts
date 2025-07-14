import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const sessionCookie = req.cookies.get('session')?.value;

  const backendRes = await fetch(
    'https://provider-mauve.vercel.app/api/auth/logout',
    {
      method: 'POST',
      headers: {
        ...(sessionCookie ? { Cookie: `session=${sessionCookie}` } : {}),
      },
      body: await req.text(),
    }
  );
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}