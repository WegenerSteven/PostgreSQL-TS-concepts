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
      [borrowedItem.student_id, borrowedItem.item_type, borrowedItem.item_id,]
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
  try {
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

// Filtering queries
export const getBorrowedItemsByType = async (itemType: string): Promise<BorrowedItem[]> => {
  try {
    const res = await executeQuery(
      'SELECT * FROM borrowed_items WHERE item_type = $1 ORDER BY borrow_date DESC',
      [itemType]
    );
    console.log(`Retrieved ${res.rows.length} borrowed items of type ${itemType}`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching borrowed items by type', err);
    throw err;
  }
};

export const getBorrowedItemsByStudent = async (studentId: number): Promise<BorrowedItem[]> => {
  try {
    const res = await executeQuery(
      'SELECT * FROM borrowed_items WHERE student_id = $1 ORDER BY borrow_date DESC',
      [studentId]
    );
    console.log(`Retrieved ${res.rows.length} borrowed items for student ${studentId}`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching borrowed items by student', err);
    throw err;
  }
};

export const getBorrowedItemsByDateRange = async (startDate: Date, endDate: Date): Promise<BorrowedItem[]> => {
  try {
    const res = await executeQuery(
      'SELECT * FROM borrowed_items WHERE borrow_date BETWEEN $1 AND $2 ORDER BY borrow_date DESC',
      [startDate, endDate]
    );
    console.log(`Retrieved ${res.rows.length} borrowed items between ${startDate} and ${endDate}`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching borrowed items by date range', err);
    throw err;
  }
};

// Conditional queries
export const getOverdueItems = async (daysThreshold: number): Promise<BorrowedItem[]> => {
  try {
    const res = await executeQuery(
      `SELECT * FROM borrowed_items 
       WHERE borrow_date < NOW() - INTERVAL '${daysThreshold} days' 
       AND returnedDate IS NULL 
       ORDER BY borrow_date ASC`
    );
    console.log(`Retrieved ${res.rows.length} overdue items`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching overdue items', err);
    throw err;
  }
};

export const getCurrentlyBorrowedItems = async (): Promise<BorrowedItem[]> => {
  try {
    const res = await executeQuery(
      'SELECT * FROM borrowed_items WHERE returnedDate IS NULL ORDER BY borrow_date DESC'
    );
    console.log(`Retrieved ${res.rows.length} currently borrowed items`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching currently borrowed items', err);
    throw err;
  }
};

// Grouping queries
export const getBorrowedItemsGroupedByType = async (): Promise<{ item_type: string; count: number }[]> => {
  try {
    const res = await executeQuery(
      'SELECT item_type, COUNT(*) as count FROM borrowed_items GROUP BY item_type'
    );
    console.log(`Retrieved ${res.rows.length} groups of borrowed items by type`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching borrowed items grouped by type', err);
    throw err;
  }
};

export const getBorrowedItemsGroupedByStudent = async (): Promise<{ student_id: number; count: number }[]> => {
  try {
    const res = await executeQuery(
      'SELECT student_id, COUNT(*) as count FROM borrowed_items GROUP BY student_id'
    );
    console.log(`Retrieved ${res.rows.length} groups of borrowed items by student`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching borrowed items grouped by student', err);
    throw err;
  }
};

export const getBorrowedItemsGroupedByDate = async (): Promise<{ borrow_date: Date; count: number }[]> => {
  try {
    const res = await executeQuery(
      'SELECT borrow_date, COUNT(*) as count FROM borrowed_items GROUP BY borrow_date'
    );
    console.log(`Retrieved ${res.rows.length} groups of borrowed items by date`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching borrowed items grouped by date', err);
    throw err;
  }
};

// Complex queries
export const getMostBorrowedItems = async (limit: number = 5): Promise<{ item_id: number; item_type: string; borrow_count: number }[]> => {
  try {
    const res = await executeQuery(
      `SELECT item_id, item_type, COUNT(*) as borrow_count 
       FROM borrowed_items 
       GROUP BY item_id, item_type 
       ORDER BY borrow_count DESC 
       LIMIT $1`,
      [limit]
    );
    console.log(`Retrieved top ${limit} most borrowed items`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching most borrowed items', err);
    throw err;
  }
};

export const getStudentBorrowingHistory = async (studentId: number): Promise<{
  item_type: string;
  total_borrowed: number;
  currently_borrowed: number
}[]> => {
  try {
    const res = await executeQuery(
      `SELECT 
        item_type,
        COUNT(*) as total_borrowed,
        COUNT(CASE WHEN returnedDate IS NULL THEN 1 END) as currently_borrowed
       FROM borrowed_items 
       WHERE student_id = $1 
       GROUP BY item_type`,
      [studentId]
    );
    console.log(`Retrieved borrowing history for student ${studentId}`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching student borrowing history', err);
    throw err;
  }
};
