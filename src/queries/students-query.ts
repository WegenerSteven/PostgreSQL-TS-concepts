import { error } from 'console';
import db, {executeQuery} from '../config/librarydb';

//student interface
export interface Students{
    id?: number;
    Fname: string;
    Lname: string;
    email: string;
    registration_date?: Date;
}

//insert single student
export const insertoneStudent = async(student:Students):Promise<number | undefined> => {
    try{
        const res = await executeQuery(
            'INSERT INTO students(Fname, Lname, email) VALUES($1, $2, $3) RETURNING id',
            [student.Fname, student.Lname, student.email]
        );
        const studentId = res.rows[0]?.id;
        console.log(`Student inserted with ID ${studentId}`);
        return studentId;
    }catch(err){
        console.error("Error inserting students data",err);
        throw err;
    }
}