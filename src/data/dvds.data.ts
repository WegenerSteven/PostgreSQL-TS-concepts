// insert a singe dvd
import {insertoneDVD as insertoneDVDQuery, insertMultipleDVDs, query} from "../queries/dvds"

export async function insertSampleDVDs(){
    const dvdId = await insertoneDVDQuery({ title: 'Inception', director: 'Christopher Nolan', release_year: '2010', copies_available: 5 });
    console.log(`inserted dvd with ID: ${dvdId}`);

    

}
     // insert other dvds with a transaction
export const dvdsToInsert = [
    { title: 'The Dark Knight', director: 'Christopher Nolan', release_year: '2008', copies_available: 4 },
    { title: 'Interstellar', director: 'Christopher Nolan', release_year: '2014', copies_available: 2 },
    { title: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski', release_year: '1999', copies_available: 5 },
    { title: 'Inglourious Basterds', director: 'Quentin Tarantino', release_year: '2009', copies_available: 3 },
    { title: 'The Shawshank Redemption', director: 'Frank Darabont', release_year: '1994', copies_available: 6 },
    { title: 'Pulp Fiction', director: 'Quentin Tarantino', release_year: '1994', copies_available: 7 },
    { title: 'The Godfather', director: 'Francis Ford Coppola', release_year: '1972', copies_available: 8 },
    { title: 'Forrest Gump', director: 'Robert Zemeckis', release_year: '1994', copies_available: 9 },
    { title: 'The Lord of the Rings: The Return of the King', director: 'Peter Jackson', release_year: '2003', copies_available: 10 },
    { title: 'Fight Club', director: 'David Fincher', release_year: '1999', copies_available: 11 },
]
