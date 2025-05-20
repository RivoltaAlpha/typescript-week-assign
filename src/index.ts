import { initializeTables } from './config/database';
import { query, insertMultipleUsers, insertOneUser, TUser, deleteAllUsers } from './examples/basic-query'

// Self-executing async function to run the imported code
(async () => {
    try {
        // user operations

        // 1. Create tables if it doesn't exist
        await initializeTables();

        // 2. Insert a test user
        const userId = await insertOneUser({ fname: 'John', lname: 'Doe', age: 30 });
        console.log(`Inserted user with ID: ${userId}`);

        // 3. Insert multiple users with a transaction
        const usersToInsert: TUser[] = [
            { fname: 'Jane', lname: 'Smith', age: 28 },
            { fname: 'Bob', lname: 'Johnson', age: 35 },
        ];
        await insertMultipleUsers(usersToInsert);

        // 4. Query all users to verify
        const users = await query();
        console.log('All users in database:');
        console.table(users);
        // 5. Delete all users
        // await deleteAllUsers();

        console.log('All operations completed successfully');
    } catch (error) {
        console.error('Error executing database operations:', error);
    }
})();