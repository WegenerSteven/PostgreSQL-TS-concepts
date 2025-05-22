import db, { executeQuery } from '../config/librarydb';

// borrowed item interface
export interface BorrowedItem {
  id?: number;
  student_id: number;
  item_type: string;
  item_id: number;
  borrow_date: Date;
  returnedDate?: Date;
}
//  insert single borrowed item

export const insertBorrowedItem = async (borrowedItem: BorrowedItem): Promise<number | undefined> => {
  try {
    const res = await executeQuery(
      'INSERT INTO borrowed_items(student_id, item_type, item_id) VALUES($1, $2, $3) RETURNING id',
      [borrowedItem.student_id,borrowedItem.item_type,borrowedItem.item_id,]
    );
    const borrowedItemId = res.rows[0]?.id;
    console.log(`Borrowed item inserted with ID ${borrowedItemId}`);
    return borrowedItemId;
  } catch (err) {
    console.error('Error inserting borrowed item data', err);
    throw err;
  }
};

//insert multiple borrowed items
export const insertMultipleBorrowedItems = async (borrowedItems: BorrowedItem[]): Promise<void> => {
  const client = await db.getPool().connect();
  try{
    await client.query('BEGIN');

    for (const item of borrowedItems) {
      await client.query(
        'INSERT INTO borrowed_items(student_id, item_type, item_id) VALUES($1, $2, $3)',
        [item.student_id, item.item_type, item.item_id]
      );
    }

    await client.query('COMMIT');
    console.log('Multiple borrowed items inserted successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error inserting multiple borrowed items', err);
    throw err;
  } finally {
    client.release();
  }
};

//query all borrowed items
export const getAllBorrowedItems = async (): Promise<BorrowedItem[]> => {
  try {
    const res = await executeQuery('SELECT * FROM borrowed_items ORDER BY borrow_date DESC LIMIT 10');
       console.log(`Retrieved ${res.rows.length} borrowed items`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching borrowed items', err);
    throw err;
  }
};

// delete all borrowed items
export const deleteAllBorrowedItems = async (): Promise<void> => {
  try {
   const res = await executeQuery('DELETE FROM borrowed_items');
     console.log(`Deleted ${res.rowCount} borrowed items`);
  } catch (err) {
    console.error('Error deleting borrowed items', err);
    throw err;
  }
};