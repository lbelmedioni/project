import { NextResponse } from 'next/server';
import { getTeachersByDepartment } from '@/lib/teachers';

export async function GET() {
  try {
    const teachers = await getTeachersByDepartment();
    return NextResponse.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    );
  }
}