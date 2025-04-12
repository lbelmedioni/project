import { prisma } from '@/lib/prisma';
import db from '@/server/db';

export const getTeachers = async () => {
    try {
        const [rows] = await db.query(`
            SELECT e.users_id as id, 
                   CONCAT(e.nomEnseignant, ' ', e.PrenomEnseignant) as name,
                   e.Email as email,
                   s.Nom_specialite as department
            FROM enseignant e
            JOIN specialite s ON e.idSpécialité = s.idSpécialité
        `);
        return rows;
    } catch (error) {
        console.error('Error fetching teachers:', error);
        throw error;
    }
};

export const addTeacher = async (teacherData) => {
    try {
        // First insert into users table
        const [userResult] = await db.query(`
            INSERT INTO users (Email, Password, Role)
            VALUES (?, ?, 'enseignant')
        `, [teacherData.email, teacherData.password, 'enseignant']);

        // Then insert into enseignant table
        const [teacherResult] = await db.query(`
            INSERT INTO enseignant (users_id, nomEnseignant, PrenomEnseignant, Email, idSpécialité)
            VALUES (?, ?, ?, ?, ?)
        `, [
            userResult.insertId,
            teacherData.name.split(' ')[0],
            teacherData.name.split(' ')[1],
            teacherData.email,
            teacherData.department
        ]);

        return { id: teacherResult.insertId, ...teacherData };
    } catch (error) {
        console.error('Error adding teacher:', error);
        throw error;
    }
};

export const updateTeacher = async (id, teacherData) => {
    try {
        // Update users table
        await db.query(`
            UPDATE users 
            SET Email = ?
            WHERE users_id = ?
        `, [teacherData.email, id]);

        // Update enseignant table
        await db.query(`
            UPDATE enseignant 
            SET nomEnseignant = ?, 
                PrenomEnseignant = ?, 
                Email = ?, 
                idSpécialité = ?
            WHERE users_id = ?
        `, [
            teacherData.name.split(' ')[0],
            teacherData.name.split(' ')[1],
            teacherData.email,
            teacherData.department,
            id
        ]);

        return { id, ...teacherData };
    } catch (error) {
        console.error('Error updating teacher:', error);
        throw error;
    }
};

export const deleteTeacher = async (id) => {
    try {
        // First delete from enseignant table
        await db.query(`
            DELETE FROM enseignant 
            WHERE users_id = ?
        `, [id]);

        // Then delete from users table
        await db.query(`
            DELETE FROM users 
            WHERE users_id = ?
        `, [id]);
    } catch (error) {
        console.error('Error deleting teacher:', error);
        throw error;
    }
};

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