import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }
) {
  const userId = params.userId;
  const sessionCookie = req.cookies.get('session')?.value;

  const backendRes = await fetch(
    `https://provider-mauve.vercel.app/api/admin/approve-provider/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionCookie ? { Cookie: `session=${sessionCookie}` } : {}),
      },
      // If you expect a body, use: body: await req.text(),
    }
  );

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}