import { constrainedMemory } from 'process';
import db, { executeQuery } from '../config/librarydb';
import { error } from 'console';

class Ebook {
    id?: number;
    title: string;
    author: string;
    file_url: string;

    constructor(title: string, author: string, file_url: string) {
        this.title = title;
        this.author = author;
        this.file_url = file_url;
    }
}

//insert ebooks
export const insertEbook = async (ebook: Ebook): Promise<number | undefined> => {
    try {
        const res = await executeQuery(
            'INSERT INTO ebooks(title, author, file_url) VALUES($1, $2, $3)RETURN id',
            [ebook.title, ebook.author, ebook.file_url]
        )
        const ebookId = res.rows[0]?.id;
        console.log(`Ebook inserted with ID ${ebookId}`);
        return ebookId;
    } catch (err) {
        console.error('Error inserting ebook data', err);
        throw err;
    }
}