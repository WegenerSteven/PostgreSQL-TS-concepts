import { executeQuery } from '../config/librarydb';

//books interface

export interface books{
    id?:number;
      title:string;
    author:string;
   published_year:string;
   copies_available:number;

}
//insert single book
export const insertoneBook = async (book: books): Promise<number | undefined> => {
    try {
        const res = await executeQuery(
            'INSERT INTO books(title, author, published_year, copies_available) VALUES($1, $2, $3, $4) RETURNING id',
            [book.title, book.author, book.published_year, book.copies_available]
        );
        const bookId = res.rows[0]?.id;
        console.log(`Book inserted with ID ${bookId}`);
        return bookId;
    } catch (err) {
        console.error("Error inserting books data", err);
        throw err;
    }
};
//insert multiple books

export const insertMultipleBooks = async (books: books[]): Promise<void> => {
    try {
        // Insert each book individually using executeQuery
        for (const book of books) {
            await executeQuery(
                'INSERT INTO books(title, author, published_year, copies_available) VALUES($1, $2, $3, $4)',
                [book.title, book.author, book.published_year, book.copies_available]
            );
        }
        console.log(`${books.length} books inserted successfully`);
    } catch (err) {
        console.error('Error inserting multiple books:', err);
        throw err;
    }
}
// grouping sets,cubes & rollup by year 
export const groupByYear = async (): Promise<any[]> => {
    try {
        const res = await executeQuery(`
            SELECT published_year, COUNT(*) AS total_books
            FROM books
            GROUP BY published_year
           
        `);
        console.log(`Grouped by year: ${res.rows.length} records`);
        return res.rows;
    } catch (err) {
        console.error('Error grouping by year:', err);
        throw err;
    }
}

// querying all books from the database
export const queryAllBooks = async (): Promise<books[]> => {
    try {
        const res = await executeQuery('SELECT * FROM books');
        console.log(`Retrieved ${res.rows.length} books`);
        return res.rows as books[];
    } catch (err) {
        console.error('Error querying data:', err);
        throw err;
    }
}

    
 