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
    const res = await executeQuery('SELECT * FROM librarians ');
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
// filtering data
// getting librarian by email
export const getLibrariansByEmailDomain = async (domain: string): Promise<Librarian[]> => {
  try {
    const res = await executeQuery('SELECT * FROM librarians WHERE email LIKE $1', [`%${domain}`]);
    console.log(`Retrieved ${res.rows.length} librarians with email domain ${domain}`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching librarians by email domain', err);
    throw err;
  }
};
// getting librarian by name
export const getLibrariansByName = async (name: string): Promise<Librarian[]> => {
  try {
    const res = await executeQuery('SELECT * FROM librarians WHERE fname ILIKE $1 OR lname ILIKE $1', [`%${name}%`]);
    console.log(`Retrieved ${res.rows.length} librarians with name ${name}`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching librarians by name', err);
    throw err;
  }
};
// getting librarian by hire date
export const getLibrariansByHireDate = async (hireDate: Date): Promise<Librarian[]> => {
  try {
    const res = await executeQuery('SELECT * FROM librarians WHERE hire_date = $1', [hireDate]);
    console.log(`Retrieved ${res.rows.length} librarians with hire date ${hireDate}`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching librarians by hire date', err);
    throw err;
  }
};



// condition expression and operators queries
// getting librarians with hire date greater than a certain date
export const getLibrariansHiredAfter = async (date: Date): Promise<Librarian[]> => {
  try {
    const res = await executeQuery('SELECT * FROM librarians WHERE hire_date > $1', [date]);
    console.log(`Retrieved ${res.rows.length} librarians hired after ${date}`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching librarians hired after date', err);
    throw err;
  }
};
// getting librarians with hire date less than a certain date
export const getLibrariansHiredBefore = async (date: Date): Promise<Librarian[]> => {
  try {
    const res = await executeQuery('SELECT * FROM librarians WHERE hire_date < $1', [date]);
    console.log(`Retrieved ${res.rows.length} librarians hired before ${date}`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching librarians hired before date', err);
    throw err;
  }
};
// union operator
// getting librarians with hire date greater than a certain date or email domain
export const getLibrariansHiredAfterOrEmailDomain = async (date: Date, domain: string): Promise<Librarian[]> => {
  try {
    const res = await executeQuery(
      'SELECT * FROM librarians WHERE hire_date > $1 OR email LIKE $2',
      [date, `%${domain}`]
    );
    console.log(`Retrieved ${res.rows.length} librarians hired after ${date} or with email domain ${domain}`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching librarians hired after date or with email domain', err);
    throw err;
  }
};
// intersection operator
// getting librarians with hire date greater than a certain date and email domain
export const getLibrariansHiredAfterAndEmailDomain = async (date: Date, domain: string): Promise<Librarian[]> => {
  try {
    const res = await executeQuery(
      'SELECT * FROM librarians WHERE hire_date > $1 AND email LIKE $2',
      [date, `%${domain}`]
    );
    console.log(`Retrieved ${res.rows.length} librarians hired after ${date} and with email domain ${domain}`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching librarians hired after date and with email domain', err);
    throw err;
  }
};

// grouping data
//group by email
export const getLibrariansGroupedByEmail = async (): Promise<{ email: string; count: number }[]> => {
  try {
    const res = await executeQuery(
      'SELECT email, COUNT(*) as count FROM librarians GROUP BY email'
    );
    console.log(`Retrieved ${res.rows.length} groups of librarians by email`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching librarians grouped by email', err);
    throw err;
  }
};
//group by hire date
export const getLibrariansGroupedByHireDate = async (): Promise<{ hire_date: Date; count: number }[]> => {
  try {
    const res = await executeQuery(
      'SELECT hire_date, COUNT(*) as count FROM librarians GROUP BY hire_date'
    );
    console.log(`Retrieved ${res.rows.length} groups of librarians by hire date`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching librarians grouped by hire date', err);
    throw err;
  }
};
//group by name
export const getLibrariansGroupedByName = async (): Promise<{ fname: string; lname: string; count: number }[]> => {
  try {
    const res = await executeQuery(
      'SELECT fname, lname, COUNT(*) as count FROM librarians GROUP BY fname, lname'
    );
    console.log(`Retrieved ${res.rows.length} groups of librarians by name`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching librarians grouped by name', err);
    throw err;
  }
};
