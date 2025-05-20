import { initializeTables } from "./config/librarydb";

import { insertoneStudent, Students } from "./queries/students-query";

//
(async () => {
    try {
        // operations

        await initializeTables();

        const studentId = await insertoneStudent({ Fname: 'Antony', Lname: 'Gichuki', email: 'antony@gmail.com' })
        console.log(`inserted student with ID: ${studentId}`);
    } catch (err) {
        console.error("error inserting student", err);
    }
})();

