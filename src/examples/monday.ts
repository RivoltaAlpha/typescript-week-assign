import db, { executeQuery } from "../config/database";

// User interface defining the structure of user data
export interface TLecture {
    first_name: string;
    last_Name: string;
    email: string;
    department?: string;
}

// Insert a single user into the database
const insertOneLecture = async (user: TLecture): Promise<number | undefined> => {
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

const queryLectures = async ():Promise<void> => {
    try {
        const res = await executeQuery('SELECT * FROM lectures')
        console.table(res.rows)
    } catch (error) {
        
    }
}

const filterLectures = async (query: string, variable: any[] = []) => {
    try {
        const res = await executeQuery(query,variable)
        console.table(res.rows)
    } catch (error) {

    }
}


const insertMultipleUsers = async (users: TLecture[]): Promise<void> => {
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

export const Monday = async () => {
    // user operations

    // 1. Create tables if it doesn't exist
    // await initializeTables();

    // 2. Insert a test user
    // const lectureId = await insertOneLecture({ first_name: 'alex', last_Name: 'alex', email: 'amerif@gmail.com',department:'Computing' });
    // insertMultipleUsers([
    //     { email: 'karani@gmail.com', first_name: 'josphat', last_Name: 'karani', department: 'It' },
    //     { email: 'ephantus@gmail.com', first_name: 'ephantus', last_Name: 'mwangi', department: 'It' },
    //     { email: 'mageto@gmail.com', first_name: 'stephen', last_Name: 'mageto', department: 'It' }

    // ])
    // console.log(`Inserted user with ID: ${lectureId}`);

    //3. Fetch lectures
    // queryLectures()
    // filterLectures('SELECT * FROM lectures WHERE department=$1', ['It'])
    // filterLectures('SELECT * FROM lectures LIMIT 3')
    // filterLectures('SELECT department, COUNT(*) AS num_lectures FROM lectures GROUP BY department;')
    // filterLectures('SELECT department, COUNT(*) AS total FROM lectures GROUP BY GROUPING SETS (department);')
    // filterLectures('SELECT first_name, COUNT(*) AS total FROM lectures GROUP BY GROUPING SETS (first_name);')
    filterLectures('SELECT department,first_name, COUNT(*) AS total FROM lectures GROUP BY GROUPING SETS (department,first_name);')

}