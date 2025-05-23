import db, { executeQuery } from '../config/librarydb';

//student interface
export interface Students {
    id?: number;
    Fname: string;
    Lname: string;
    email: string;
    registration_date?: Date;
}

//insert single student
// export const insertoneStudent = async (student: Students): Promise<number | undefined> => {
//     try {
//         const res = await executeQuery(
//             'INSERT INTO students(Fname, Lname, email) VALUES($1, $2, $3) RETURNING id',
//             [student.Fname, student.Lname, student.email]
//         );
//         const studentId = res.rows[0]?.id;
//         console.log(`Student inserted with ID ${studentId}`);
//         return studentId;
//     } catch (err) {
//         console.error("Error inserting students data", err);
//         throw err;
//     }
// }

//insert multiple students
export const insertMultipleStudents = async (students: Students[]): Promise<void> => {
    //using transactions is better for multiple users
    const client = await db.getPool().connect();
    try {
        //transaction
        await client.query('BEGIN');
        //insert each user
        for (const stud of students) {
            await client.query(
                'INSERT INTO students(Fname, Lname, email) VALUES($1, $2, $3)',
                [stud.Fname, stud.Lname, stud.email]
            );
        }
        //commit transaction
        await client.query('COMMIT');
        console.log(`${students.length} users inserted successfully`);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error inserting multiple users:', err);
        throw err;
    } finally {
        client.release();
    }
}

//query all students from the database
export const query = async (): Promise<Students[]> => {
    try {
        const res = await executeQuery('SELECT * FROM students');
        console.log(`Retrieved ${res.rows.length} students`);
        return res.rows as Students[];
    } catch (err) {
        console.error('Error querying data:', err);
        throw err;
    }
};

//delete all student from the database
export const deleteAllStudents = async (): Promise<void> => {
    try {
        const res = await executeQuery('DELETE FROM students');
        console.log(`Deleted ${res.rowCount} students`);
    } catch (err) {
        console.error('Error deleting data:', err);
        throw err;

    }
}