import { initializeTables } from "./config/librarydb";
import {dvdsToInsert,insertSampleDVDs} from "./data/dvds.data";
// import { query }  from "./queries/dvds"


// import { insertoneStudent, Students, insertMultipleStudents, query } from "./queries/students-query";
import {insertMultipleBooks, queryAllBooks,groupByYear} from "./queries/books"
import { insertBook } from "./data/books.data";



// This is the main entry point of the application
// It initializes the database and performs operations on it
(async () => {
    try {
        // operations to be performed on the database

        await initializeTables();

        //insert a student 
        // const studentId = await insertoneStudent({ Fname: 'Antony', Lname: 'Gichuki', email: 'antonyy@gmail.com' })
        // console.log(`inserted student with ID: ${studentId}`);

        // //insert other students with a transaction
        // const studentsToInsert: Students[] = [
        //     { Fname: 'Benard', Lname: 'Mugambi', email: 'benardh@gmail.com' },
        //     { Fname: 'Catherine', Lname: 'Wanjiru', email: 'catherineb@gmail.com' },
        //     { Fname: 'David', Lname: 'Karanja', email: 'davidn@gmail.com' },
        //     { Fname: 'Eunice', Lname: 'Wambui', email: 'eunicse@gmail.com' },
        //     { Fname: 'Faith', Lname: 'Wairimu', email: 'faiths@gmail.com' },
        //     { Fname: 'George', Lname: 'Mwangi', email: 'georgfe@gmail.com' },
        //     { Fname: 'Hellen', Lname: 'Njeri', email: 'hellend@gmail.com' },
        //     { Fname: 'Irene', Lname: 'Wanjiru', email: 'irened@gmail.com' },
        // ];
        // await insertMultipleStudents(studentsToInsert);

        //query all student to verify
        // const student = await query();
        // console.log('All students in database:');
        // console.table(student);

        //delete all students
        //await deleteAllStudents();


       
      
        // await insertBook(); 
                //query all books to verify
                // const books = await  queryAllBooks();
                // console.log('All books in database:');
                // console.table(books);
// grouping the books by year 
        const booksByYear = await groupByYear();
        console.log('Books grouped by year:');
        console.table(booksByYear);

               

           


            //         await insertSampleDVDs();
            // // //query all dvds to verify
            // const dvds = await query ();   
            // console.log('All dvds in database:');
            // console.table(dvds);





            
    } catch (err) {
        console.error("error inserting dvd", err);
    }
})();

