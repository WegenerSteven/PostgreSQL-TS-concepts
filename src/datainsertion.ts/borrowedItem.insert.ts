import { initializeTables } from "../config/librarydb";
import {
    insertBorrowedItem,
    deleteAllBorrowedItems,
    getAllBorrowedItems,
    insertMultipleBorrowedItems,
    getBorrowedItemsByType,
    getBorrowedItemsByStudent,
    getBorrowedItemsByDateRange,
    getOverdueItems,
    getCurrentlyBorrowedItems,
    getBorrowedItemsGroupedByType,
    getBorrowedItemsGroupedByStudent,
    getBorrowedItemsGroupedByDate,
    getMostBorrowedItems,
    getStudentBorrowingHistory,
    BorrowedItem
} from "../queries/borrowedItem";

export const borrowedItemInsertion = () => {
    (async () => {
        try {
            // Initialize tables
            await initializeTables();

            // Insert a single borrowed item
            const borrowedItemId = await insertBorrowedItem({
                student_id: 1,
                item_type: 'book',
                item_id: 1,
                borrow_date: new Date('2024-03-15')
            });
            console.log(`Inserted borrowed item with ID: ${borrowedItemId}`);

            // Insert multiple borrowed items with a transaction
            const itemsToInsert: BorrowedItem[] = [
                {
                    student_id: 2,
                    item_type: 'dvd',
                    item_id: 1,
                    borrow_date: new Date('2024-03-15')
                },
                {
                    student_id: 3,
                    item_type: 'ebook',
                    item_id: 1,
                    borrow_date: new Date('2024-03-15')
                },
                {
                    student_id: 4,
                    item_type: 'book',
                    item_id: 2,
                    borrow_date: new Date('2024-03-15')
                },
                {
                    student_id: 5,
                    item_type: 'dvd',
                    item_id: 2,
                    borrow_date: new Date('2024-03-15')
                },
                
                {
                    student_id: 1,
                    item_type: 'book',
                    item_id: 3,
                    borrow_date: new Date('2024-02-15')
                },
                {
                    student_id: 2,
                    item_type: 'dvd',
                    item_id: 3,
                    borrow_date: new Date('2024-02-15')
                }
            ];
            await insertMultipleBorrowedItems(itemsToInsert);
            // Query all borrowed items to verify
            const borrowedItems = await getAllBorrowedItems();
            console.log('All borrowed items in database:');

            // filtering queries
            console.log('\nFiltering Queries:');
            const books = await getBorrowedItemsByType('book');
            console.log('Books borrowed:');
            console.table(books);

            const student1Items = await getBorrowedItemsByStudent(1);
            console.log('Items borrowed by student 1:');
            console.table(student1Items);

            const itemsInDateRange = await getBorrowedItemsByDateRange(
                new Date('2024-02-01'),
                new Date('2024-03-31')
            );
            console.log('Items borrowed in date range:');
            console.table(itemsInDateRange);

            //conditional queries
            console.log('\nConditional Queries:');
            const overdueItems = await getOverdueItems(30);
            console.log('Overdue items:');
            console.table(overdueItems);

            const currentItems = await getCurrentlyBorrowedItems();
            console.log('Currently borrowed items:');
            console.table(currentItems);

                     //grouping queries
            console.log('\nGrouping Queries:');
            const itemsByType = await getBorrowedItemsGroupedByType();
            console.log('Items grouped by type:');
            console.table(itemsByType);

            const itemsByStudent = await getBorrowedItemsGroupedByStudent();
            console.log('Items grouped by student:');
            console.table(itemsByStudent);

            const itemsByDate = await getBorrowedItemsGroupedByDate();
            console.log('Items grouped by date:');
            console.table(itemsByDate);

       
            const mostBorrowed = await getMostBorrowedItems(3);
            console.log('Most borrowed items:');
            console.table(mostBorrowed);

            const studentHistory = await getStudentBorrowingHistory(1);
            console.log('Borrowing history for student 1:');
            console.table(studentHistory);

            // delete all borrowed items
            // await deleteAllBorrowedItems();

        } catch (err) {
            console.error("Error performing borrowed items operations:", err);
        }
    })();
}; 