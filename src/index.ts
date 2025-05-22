import { initializeTables } from "./config/librarydb";
import { insertoneStudent, Students, insertMultipleStudents, query } from "./queries/students-query";

// This is the main entry point of the application
// It initializes the database and performs operations on it
(async () => {
    try {
        // operations to be performed on the database

        await initializeTables();

        //insert a student 
        // const studentId = await insertoneStudent({ Fname: 'Antony', Lname: 'Gichuki', email: 'antony@gmail.com' })
        // console.log(`inserted student with ID: ${studentId}`);

        //insert other students with a transaction
        // const studentsToInsert: Students[] = [
        //     { Fname: 'Benard', Lname: 'Mugambi', email: 'benard@gmail.com' },
        //     { Fname: 'Catherine', Lname: 'Wanjiru', email: 'catherine@gmail.com' },
        //     { Fname: 'David', Lname: 'Karanja', email: 'david@gmail.com' },
        //     { Fname: 'Eunice', Lname: 'Wambui', email: 'eunice@gmail.com' },
        //     { Fname: 'Faith', Lname: 'Wairimu', email: 'faith@gmail.com' },
        //     { Fname: 'George', Lname: 'Mwangi', email: 'george@gmail.com' },
        //     { Fname: 'Hellen', Lname: 'Njeri', email: 'hellen@gmail.com' },
        //     { Fname: 'Irene', Lname: 'Wanjiru', email: 'irene@gmail.com' },
        // ];
        // await insertMultipleStudents(studentsToInsert);

        //query all student to verify
        const student = await query();
        console.log('All students in database:');
        console.table(student);

        //delete all students
        //await deleteAllStudents();

    } catch (err) {
        console.error("error inserting student", err);
    }
})();

