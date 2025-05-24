import { executeQuery, initializeTables } from "../config/database";


// Borrow a book
const checkOutBook = async (userId: number, itemId: number, borrowDate: string, dueDate: string) => {
    // Insert into borrow_records with due_date = NOW() + INTERVAL '14 days'
    await executeQuery(
        `INSERT INTO borrow_records (user_id, item_id, borrow_date, due_date)
         VALUES ($1, $2, $3, $4)`,
        [userId, itemId, borrowDate, dueDate]
    );
};

// Return a book and calculate fine
const returnBook = async (borrowId: number) => {
    await executeQuery(
        `UPDATE borrow_records SET return_date = NOW() WHERE borrow_id = $1`,
        [borrowId]
    );
    // Calculate fine if overdue
    const res = await executeQuery(
        `SELECT due_date, return_date FROM borrow_records WHERE borrow_id = $1`,
        [borrowId]
    );
    const { due_date, return_date } = res.rows[0];
    const dueDate = new Date(due_date);
    const returnDate = new Date(return_date);
    const overdueMs = returnDate.getTime() - dueDate.getTime();
    const overdueDays = Math.max(0, overdueMs / (1000 * 60 * 60 * 24));
    if (overdueDays > 0) {
        const fine = overdueDays * 1.0; // $1 per day
        await executeQuery(
            `INSERT INTO fines (borrow_id, amount) VALUES ($1, $2)`,
            [borrowId, fine]
        );
    }
};

export const Library = () => {
    
    // Create tables
    initializeTables();

    // // borrow a book 
    // checkOutBook(1, 123, '2023-10-01', '2023-10-15')
    // .then(() => console.log("Book borrowed successfully"));

    // // return a book
    // returnBook(1)
    // .then(() => console.log("Book returned successfully"));

}