import { prisma } from '@/lib/prisma';

export const getTeachers = async () => {
    try {
        const teachers = await prisma.teacher.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                department: true
            }
        });
        return teachers;
    } catch (error) {
        console.error('Error fetching teachers:', error);
        throw error;
    }
};

export const getTeachersByDepartment = async () => {
    try {
        const teachers = await prisma.teacher.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                department: true
            }
        });
        return teachers;
    } catch (error) {
        console.error('Error fetching teachers by department:', error);
        throw error;
    }
};

export const addTeacher = async (teacherData) => {
    try {
        const teacher = await prisma.teacher.create({
            data: {
                name: teacherData.name,
                email: teacherData.email,
                department: teacherData.department
            }
        });
        return teacher;
    } catch (error) {
        console.error('Error adding teacher:', error);
        throw error;
    }
};

export const updateTeacher = async (id, teacherData) => {
    try {
        const teacher = await prisma.teacher.update({
            where: { id },
            data: {
                name: teacherData.name,
                email: teacherData.email,
                department: teacherData.department
            }
        });
        return teacher;
    } catch (error) {
        console.error('Error updating teacher:', error);
        throw error;
    }
};

export const deleteTeacher = async (id) => {
    try {
        await prisma.teacher.delete({
            where: { id }
        });
    } catch (error) {
        console.error('Error deleting teacher:', error);
        throw error;
    }
};