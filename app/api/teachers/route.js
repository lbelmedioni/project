import { NextResponse } from 'next/server';
import { getTeachers, addTeacher, updateTeacher, deleteTeacher } from '@/lib/teachers';

// GET all teachers
export async function GET() {
  try {
    const teachers = await getTeachers();
    return NextResponse.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    );
  }
}

// POST add new teacher
export async function POST(request) {
  try {
    const teacherData = await request.json();
    const teacher = await addTeacher(teacherData);
    return NextResponse.json(teacher);
  } catch (error) {
    console.error('Error adding teacher:', error);
    return NextResponse.json(
      { error: 'Failed to add teacher' },
      { status: 500 }
    );
  }
}

// PUT update teacher
export async function PUT(request) {
  try {
    const { id, ...teacherData } = await request.json();
    const teacher = await updateTeacher(id, teacherData);
    return NextResponse.json(teacher);
  } catch (error) {
    console.error('Error updating teacher:', error);
    return NextResponse.json(
      { error: 'Failed to update teacher' },
      { status: 500 }
    );
  }
}

// DELETE teacher
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await deleteTeacher(id);
    return NextResponse.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    return NextResponse.json(
      { error: 'Failed to delete teacher' },
      { status: 500 }
    );
  }
}