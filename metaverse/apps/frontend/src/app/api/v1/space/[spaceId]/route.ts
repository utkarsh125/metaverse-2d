import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_PASSWORD = "123kasdk123";

export async function GET(
  request: NextRequest,
  { params }: { params: { spaceId: string } }
) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    let userId: string | null = null;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      console.log('Received token:', token.substring(0, 20) + '...');
      
      // Verify JWT token
      try {
        const decoded = jwt.verify(token, JWT_PASSWORD) as { userId: string };
        console.log('Token decoded successfully:', decoded);
        userId = decoded.userId;
      } catch (jwtError) {
        console.error('JWT verification failed:', jwtError);
        return NextResponse.json({ error: 'Invalid token signature' }, { status: 401 });
      }
    } else {
      console.log('No token provided, using test mode');
      // For testing purposes, allow access without token
      userId = 'test-user';
    }

    const spaceId = params.spaceId;
    console.log(`Accessing space ${spaceId} with userId: ${userId}`);

    // In a real application, you would fetch from your database
    // For now, return mock data
    const space = {
      id: spaceId,
      name: `Space ${spaceId}`,
      thumbnail: null,
      dimensions: "1024x768"
    };

    return NextResponse.json(space);
  } catch (error) {
    console.error('Error fetching space:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 