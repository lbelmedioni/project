import { NextResponse } from 'next/server';
import { verifyTeacherHours } from '@/lib/teachers';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();
    
    await verifyTeacherHours(id, status);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying teacher hours:', error);
    return NextResponse.json(
      { error: 'Failed to verify teacher hours' },
      { status: 500 }
    );
  }
}