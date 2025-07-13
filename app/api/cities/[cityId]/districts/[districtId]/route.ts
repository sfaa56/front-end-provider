import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
{ params }
) {
  const { cityId, districtId } = params;
  const sessionCookie = req.cookies.get('session')?.value;

  const backendRes = await fetch(
    `https://provider-mauve.vercel.app/api/cities/${cityId}/districts/${districtId}`,
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

export async function DELETE(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  const { cityId, districtId } = context.params;
  const sessionCookie = req.cookies.get('session')?.value;

  const backendRes = await fetch(
    `https://provider-mauve.vercel.app/api/cities/${cityId}/districts/${districtId}`,
    {
      method: 'DELETE',
      headers: {
        ...(sessionCookie ? { Cookie: `session=${sessionCookie}` } : {}),
      },
    }
  );

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
