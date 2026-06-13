import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;

    const imgbbForm = new FormData();
    imgbbForm.append('image', image);
    imgbbForm.append('key', process.env.IMGBB_API_KEY!);

    const res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: imgbbForm,
    });

    const data = await res.json();
    return NextResponse.json({ url: data.data.url });
  } catch (e) {
    console.error('Upload error:', e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}