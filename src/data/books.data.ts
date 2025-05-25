import { insertoneBook } from '../queries/books';
// insert a single book
export async function insertBook(){
    const bookId = await insertoneBook({ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published_year: '1925', copies_available: 5 });
    console.log(`inserted book with ID: ${bookId}`);
    return bookId;
}
// insert other books with a transaction
export const booksToInsert = [
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', published_year: '1960', copies_available: 3 },
    { title: '1984', author: 'George Orwell', published_year: '1949', copies_available: 4 },
    { title: 'Pride and Prejudice', author: 'Jane Austen', published_year: '1813', copies_available: 2 },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', published_year: '1951', copies_available: 6 },
];