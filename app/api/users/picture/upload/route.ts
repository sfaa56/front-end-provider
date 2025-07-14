import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const sessionCookie = req.cookies.get('session')?.value;

  const backendRes = await fetch(
    'https://provider-mauve.vercel.app/api/users/picture/upload',
    {
      method: 'PUT',
      headers: {
        // If you're uploading a file, you may need to forward the correct Content-Type or multipart headers
        ...(sessionCookie ? { Cookie: `session=${sessionCookie}` } : {}),
      },
      body: await req.text(), // If file upload, may need to use req.body
    }
  );
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}