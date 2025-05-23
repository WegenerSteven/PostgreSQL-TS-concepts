import { initializeTables } from "../config/librarydb";
import { insertLibrarian,deleteAllLibrarians,getAllLibrarians,getLibrariansByEmailDomain,getLibrariansByHireDate,getLibrariansByName,getLibrariansGroupedByEmail,getLibrariansGroupedByHireDate,getLibrariansGroupedByName,Librarian,getLibrariansHiredAfter,getLibrariansHiredAfterAndEmailDomain,getLibrariansHiredAfterOrEmailDomain,getLibrariansHiredBefore,insertMultipleLibrarians } from "../queries/librarian";
export const libraryInsertion =() =>{
(async () => {
    try {
        // operations to be performed on the database

        await initializeTables();

        // insert a single librarian
        const librarianId = await insertLibrarian({fname: 'Antony',lname: 'Gichuki', email: 'antoyngatitu@gmail.com', hire_date: new Date('2023-10-01') });
        console.log(`Inserted librarian with ID: ${librarianId}`);
        // insert other librarians with a transaction
        const librariansToInsert: Librarian[] = [
            { fname: 'Benard', lname: 'Mugambi', email: 'benard@gmail.com', hire_date: new Date('2023-10-01') },
            { fname: 'Catherine', lname: 'Wanjiru', email: 'catherine@gmail.com', hire_date: new Date('2023-10-01') },
            { fname: 'David', lname: 'Karanja', email: 'david@gmail.com', hire_date: new Date('2023-10-01') },
            { fname: 'Eunice', lname: 'Wambui', email: 'eunice@gmail.com', hire_date: new Date('2023-10-01') },
            { fname: 'Faith', lname: 'Wairimu', email: 'faith@gmail.com', hire_date: new Date('2023-10-01') },
            { fname: 'George', lname: 'Mwangi', email: 'george@gmail.com', hire_date: new Date('2023-10-01') },
            { fname: 'Hellen', lname: 'Njeri', email: 'hellen@gmail.com', hire_date: new Date('2023-10-01') },
            { fname: 'Irene', lname: 'Wanjiru', email: 'irene@gmail.com', hire_date: new Date('2023-10-01') },
        ];
        await insertMultipleLibrarians(librariansToInsert);
        // query all librarians to verify
        const librarians = await getAllLibrarians();
        console.log('All librarians in database:');
        console.table(librarians);
        // delete all librarians
        //await deleteAllLibrarians();
        // query librarians by name
        const librariansByName = await getLibrariansByName('Antony');
        console.log('Librarians with name Antony:');
        console.table(librariansByName);
        // query librarians by email domain
        const librariansByEmailDomain = await getLibrariansByEmailDomain('gmail.com');
        console.log('Librarians with email domain gmail.com:');
        console.table(librariansByEmailDomain);
        // query librarians by hire date
        const librariansByHireDate = await getLibrariansByHireDate(new Date('2023-10-01'));
        console.log('Librarians with hire date 2023-10-01:');
        console.table(librariansByHireDate);
        // query librarians hired after a certain date
        const librariansHiredAfter = await getLibrariansHiredAfter(new Date('2023-10-01'));
        console.log('Librarians hired after 2023-10-01:');
        console.table(librariansHiredAfter);
        // query librarians hired before a certain date
        const librariansHiredBefore = await getLibrariansHiredBefore(new Date('2023-10-01'));
        console.log('Librarians hired before 2023-10-01:');
        console.table(librariansHiredBefore);
        // query librarians hired after a certain date and email domain
        const librariansHiredAfterAndEmailDomain = await getLibrariansHiredAfterAndEmailDomain(new Date('2023-10-01'), 'gmail.com');
        console.log('Librarians hired after 2023-10-01 and with email domain gmail.com:');
        console.table(librariansHiredAfterAndEmailDomain);
        // query librarians hired after a certain date or email domain
        const librariansHiredAfterOrEmailDomain = await getLibrariansHiredAfterOrEmailDomain(new Date('2023-10-01'), 'gmail.com');
        console.log('Librarians hired after 2023-10-01 or with email domain gmail.com:');
        console.table(librariansHiredAfterOrEmailDomain);
        // query librarians grouped by email
        const librariansGroupedByEmail = await getLibrariansGroupedByEmail();
        console.log('Librarians grouped by email:');
        console.table(librariansGroupedByEmail);
        // query librarians grouped by hire date
        const librariansGroupedByHireDate = await getLibrariansGroupedByHireDate();
        console.log('Librarians grouped by hire date:');
        console.table(librariansGroupedByHireDate);

        // query librarians grouped by name
        const librariansGroupedByName = await getLibrariansGroupedByName();
        console.log('Librarians grouped by name:');
        console.table(librariansGroupedByName);

    } catch (err) {
        console.error("error doing the operations", err);
    }
})();
}