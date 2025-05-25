
import { initializeTables } from "./config/librarydb";
import {dvdsToInsert,insertSampleDVDs} from "./data/dvds.data";
// import { query }  from "./queries/dvds"


// import { insertoneStudent, Students, insertMultipleStudents, query } from "./queries/students-query";
import {insertMultipleBooks, queryAllBooks,groupByYear} from "./queries/books"
import { insertBook } from "./data/books.data";

import { libraryInsertion } from "./datainsertion.ts/librarian.insert";
import { borrowedItemInsertion } from "./datainsertion.ts/borrowedItem.insert";


// This is the main entry point of the application
// It initializes the database and performs operations on it
(async () => {
    try {
        // operations to be performed on the database

        await initializeTables();

        //insert a student 

        // const studentId = await insertoneStudent({ Fname: 'Antony', Lname: 'Gichuki', email: 'antony@gmail.com' })
        // console.log(`inserted student with ID: ${studentId}`);

        
    // librarian operations

    //single librarian
  const librarian = await insertLibrarian({ fname: 'Steven', lname: 'Wegner', email: 'stev22@gmail.com' });
console.log(`Inserted librarian with ID: ${librarian}`);

// multiple librarians
const insertMultipleLibrariansData: Librarian[] = [
    { fname: 'John', lname: 'Doe', email: 'johndoe1@gmail.com' },
    { fname: 'Jane', lname: 'Smith', email: 'janesmith1@gmail.com' }
];

await insertMultipleLibrarians(insertMultipleLibrariansData);
console.log('Inserted multiple librarians');

// get all librarians
const librarians = await getAllLibrarians();
console.log('All librarians:', librarians);
console.table(librarians);

    //delete all librarians

    // await deleteAllLibrarians();
    // console.log('Deleted all librarians');

    // borrowed items operations
    // single borrowed item
    const borrowedItem = await insertBorrowedItem({ student_id: 1, item_type: 'ebook', item_id: 1, borrow_date: new Date()});
    console.log(`Inserted borrowed item with ID: ${borrowedItem}`);
    // multiple borrowed items
    const insertMultipleBorrowedItemsData: BorrowedItem[] = [
        { student_id: 1, item_type: 'book', item_id: 2, borrow_date: new Date() },
        { student_id: 1, item_type: 'journal', item_id: 3, borrow_date: new Date() }
    ];
    await insertMultipleBorrowedItems(insertMultipleBorrowedItemsData);
    console.log('Inserted multiple borrowed items');
    // get all borrowed items
    const borrowedItems = await getAllBorrowedItems();
    console.log('All borrowed items:', borrowedItems);
    console.table(borrowedItems);
    // delete all borrowed items
    // await deleteAllBorrowedItems();
    // console.log('Deleted all borrowed items');


    } catch (error) {
    console.error('Error executing database operations:', error);

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


// Run borrowed items data insertion
borrowedItemInsertion();