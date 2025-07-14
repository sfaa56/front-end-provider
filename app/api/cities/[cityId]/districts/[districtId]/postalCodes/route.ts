import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }
) {
  const cityId = params.cityId;
  const districtId = params.districtId;
  const sessionCookie = req.cookies.get('session')?.value;

  const backendRes = await fetch(
    `https://provider-mauve.vercel.app/api/cities/${cityId}/districts/${districtId}/postalCodes`,
    {
      method: 'POST',
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