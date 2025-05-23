import  { executeQuery } from '../config/librarydb';

export interface DVDs {
    id?: number;
    title: string;
    director: string;
    release_year: string;
    copies_available: number;
}
//insert single DVD
export const insertoneDVD = async (dvd: DVDs): Promise<number | undefined> => {
    try {
        const res = await executeQuery(
            'INSERT INTO dvds(title, director, release_year, copies_available) VALUES($1, $2, $3, $4) RETURNING id',
            [dvd.title, dvd.director, dvd.release_year, dvd.copies_available]
        );
        const dvdId = res.rows[0]?.id;
        console.log(`DVD inserted with ID ${dvdId}`);
        return dvdId;
    } catch (err) {
        console.error("Error inserting DVD data", err);
        throw err;
    }
}
//insert multiple DVDs
export const insertMultipleDVDs = async (dvds: DVDs[]): Promise<void> => {
    try {
        // Insert each DVD individually using executeQuery
        for (const dvd of dvds) {
            await executeQuery(
                'INSERT INTO dvds(title, director, release_year, copies_available) VALUES($1, $2, $3, $4)',
                [dvd.title, dvd.director, dvd.release_year, dvd.copies_available]
            );
        }
        console.log(`${dvds.length} DVDs inserted successfully`);
    } catch (err) {
        console.error('Error inserting multiple DVDs:', err);
        throw err;
    }
}
//query all DVDs from the database
export const queryAllDVDs = async (): Promise<DVDs[]> => {
    try {
        const res = await executeQuery('SELECT * FROM dvds');
        console.log(`Retrieved ${res.rows.length} DVDs`);
        return res.rows as DVDs[];
    } catch (err) {
        console.error('Error querying data:', err);
        throw err;
    }
}
//delete all DVDs
export const deleteAllDVDs = async (): Promise<void> => {
    try {
        await executeQuery('DELETE FROM dvds');
        console.log('All DVDs deleted successfully');
    } catch (err) {
        console.error('Error deleting DVDs:', err);
        throw err;
    }
}
//delete a single DVD
export const deleteDVD = async (dvdId: number): Promise<void> => {
    try {
        await executeQuery('DELETE FROM dvds WHERE id = $1', [dvdId]);
        console.log(`DVD with ID ${dvdId} deleted successfully`);
    } catch (err) {
        console.error('Error deleting DVD:', err);
        throw err;
    }
}
//update a single DVD
export const updateDVD = async (dvdId: number, dvd: DVDs): Promise<void> => {
    try {
        await executeQuery(
            'UPDATE dvds SET title = $1, director = $2, release_year = $3, copies_available = $4 WHERE id = $5',
            [dvd.title, dvd.director, dvd.release_year, dvd.copies_available, dvdId]
        );
        console.log(`DVD with ID ${dvdId} updated successfully`);
    } catch (err) {
        console.error('Error updating DVD:', err);
        throw err;
    }
}
// grouping dvds using grouping sets uing rollup
export const groupByYear = async (): Promise<DVDs[]> => {
    try {
        const res = await executeQuery('SELECT release_year, title FROM dvds GROUP BY release_year');
        console.log(`Retrieved ${res.rows.length} DVDs`);
        return res.rows as DVDs[];
    } catch (err) {
        console.error("Error retrieving DVDs data", err);
        throw err;
    }
    // query all DVDs
}
  export const query = async (): Promise<DVDs[]> => {
    try {
        const res = await executeQuery('SELECT * FROM dvds');
        console.log(`Retrieved ${res.rows.length} DVDs`);
        return res.rows as DVDs[];
    } catch (err) {
        console.error('Error querying data:', err);
        throw err;
    }
}