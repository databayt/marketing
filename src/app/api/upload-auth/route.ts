import { getUploadAuthParams } from "@imagekit/next/server"
import { auth } from "@/auth"

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    });

    return Response.json({
      token,
      expire,
      signature,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error('Upload auth error:', error);
    return Response.json(
      { error: 'Failed to generate upload authentication' },
      { status: 500 }
    );
  }
}