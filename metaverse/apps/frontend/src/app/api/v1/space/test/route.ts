import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_PASSWORD = "123kasdk123";

export async function GET(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        success: false, 
        error: 'No token provided' 
      }, { status: 401 });
    }

    const token = authHeader.substring(7);
    
    // Verify JWT token
    try {
      const decoded = jwt.verify(token, JWT_PASSWORD) as { userId: string; role: string };
      
      return NextResponse.json({
        success: true,
        message: 'Token is valid',
        userId: decoded.userId,
        role: decoded.role
      });
    } catch (jwtError) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid token signature',
        details: jwtError instanceof Error ? jwtError.message : 'Unknown error'
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 