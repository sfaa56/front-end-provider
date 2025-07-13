import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }) {
  const cityId = params.cityId;
  // Forward the session cookie
  const sessionCookie = req.cookies.get('session')?.value;

  const backendRes = await fetch(
    `https://provider-mauve.vercel.app/api/cities/${cityId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionCookie ? { 'Cookie': `session=${sessionCookie}` } : {}),
      },
      body: await req.text(),
    }
  );

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}


export async function DELETE(req: NextRequest, { params }: { params: { cityId: string } }) {
  const cityId = params.cityId;
  const sessionCookie = req.cookies.get('session')?.value;

  const backendRes = await fetch(
    `https://provider-mauve.vercel.app/api/cities/${cityId}`,
    {
      method: 'DELETE',
      headers: {
        ...(sessionCookie ? { 'Cookie': `session=${sessionCookie}` } : {}),
      },
    }
  );

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}