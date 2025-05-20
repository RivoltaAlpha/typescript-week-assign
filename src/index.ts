import { initializeTables } from './config/database';
import { filterLectures, insertMultipleUsers, insertOneLecture, queryLectures } from './examples/monday';
// import { query, insertMultipleUsers, insertOneUser, TUser, deleteAllUsers } from './examples/monday'

// Self-executing async function to run the imported code
(async () => {
    try {
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
        // filterLectures('SELECT department,first_name, COUNT(*) AS total FROM lectures GROUP BY GROUPING SETS (department,first_name);')

 

        console.log('All operations completed successfully');
    } catch (error) {
        console.error('Error executing database operations:', error);
    }
})();