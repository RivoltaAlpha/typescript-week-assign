import db, { executeQuery } from "../config/database";

// User interface defining the structure of user data
export interface TLecture {
    first_name: string;
    last_Name: string;
    email: string;
    department?: string;
}

// Insert a single user into the database
export const insertOneLecture = async (user: TLecture): Promise<number | undefined> => {
    try {
        const res = await executeQuery(
            'INSERT INTO lectures (first_name, last_name, email, department) VALUES ($1, $2, $3, $4) RETURNING lecture_id',
            [user.first_name, user.last_Name, user.email,user.department]
        );
        const lecture_id = res.rows[0]?.lecture_id;
        console.log(`Lecture inserted with ID: ${lecture_id}`);
        return lecture_id;
    } catch (err) {
        console.error('Error inserting data:', err);
        throw err;
    }
}

export const queryLectures = async ():Promise<void> => {
    try {
        const res = await executeQuery('SELECT * FROM lectures')
        console.table(res.rows)
    } catch (error) {
        
    }
}

export const filterLectures = async (query: string, variable: any[] = []) => {
    try {
        const res = await executeQuery(query,variable)
        console.table(res.rows)
    } catch (error) {

    }
}


export const insertMultipleUsers = async (users: TLecture[]): Promise<void> => {
    // For multiple users, using a transaction is better
    const client = await db.getPool().connect();
    try {
        // Begin transaction
        await client.query('BEGIN');

        // Insert each user
        for (const user of users) {
            await client.query(
                'INSERT INTO lectures (first_name, last_Name, email,department) VALUES ($1, $2, $3,$4)',
                [user.first_name, user.last_Name, user.email,user.department]
            );
        }

        // Commit transaction
        await client.query('COMMIT');
        // console.log(${ users } users inserted successfully);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error inserting multiple users:', err);
        throw err;
    } finally {
        client.release();
    }
}