import db, { executeQuery } from '../config/librarydb';

// librarian interface
export interface Librarian {
  id?: number;
  fname: string;
  lname: string;
  email: string;
  hire_date?: Date;
}

// insert single librarian
export const insertLibrarian = async (librarian: Librarian): Promise<number | undefined> => {
  try {
    const res = await executeQuery(
      'INSERT INTO librarians(fname, lname, email) VALUES($1, $2, $3) RETURNING id',
      [librarian.fname, librarian.lname, librarian.email]
    );
    const librarianId = res.rows[0]?.id;
    console.log(`Librarian inserted with ID ${librarianId}`);
    return librarianId;
  } catch (err) {
    console.error('Error inserting librarian data', err);
    throw err;
  }
};

// insert multiple librarians
export const insertMultipleLibrarians = async (librarians: Librarian[]): Promise<void> => {
  const client = await db.getPool().connect();
  try {
    await client.query('BEGIN');

    for (const librarian of librarians) {
      await client.query(
        'INSERT INTO librarians(fname, lname, email) VALUES($1, $2, $3)',
        [librarian.fname, librarian.lname, librarian.email]
      );
    }

    await client.query('COMMIT');
    console.log('Multiple librarians inserted successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error inserting multiple librarians', err);
    throw err;
  } finally {
    client.release();
  }
};

// query all librarians
export const getAllLibrarians = async (): Promise<Librarian[]> => {
  try {
    const res = await executeQuery('SELECT * FROM librarians WHERE email LIKE $1', ['%gmail.com']);
    console.log(`Retrieved ${res.rows.length} librarians`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching librarians', err);
    throw err;
  }
};

// delete all librarians
export const deleteAllLibrarians = async (): Promise<void> => {
  try {
    const res = await executeQuery('DELETE FROM librarians');
    console.log(`Deleted ${res.rowCount} librarians`);
  } catch (err) {
    console.error('Error deleting librarians', err);
    throw err;
  }
};