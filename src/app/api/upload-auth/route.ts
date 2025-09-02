import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
  try {
    // Add authentication logic here if needed
    // For example, check if user is logged in or has upload permissions
    
    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
      // expire: 30 * 60, // Optional: 30 minutes expiry, max 1 hour
    });

    return Response.json({ 
      token, 
      expire, 
      signature, 
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY 
    });
  } catch (error) {
    console.error('Upload auth error:', error);
    return Response.json(
      { error: 'Failed to generate upload authentication' },
      { status: 500 }
    );
  }
}