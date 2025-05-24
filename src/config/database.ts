// src/config/database.ts
import env from './env'
import { Pool, PoolConfig, QueryResult } from 'pg'

class Database {
    private pool: Pool;
    
    constructor() {
        const poolConfig: PoolConfig = {
            host: env.database.host,
            port: env.database.port,
            user: env.database.user,
            password: env.database.password,
            database: env.database.database,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
            // For production with SSL:
            // ssl: {
            //   rejectUnauthorized: false
            // }
        };
         
        this.pool = new Pool(poolConfig);
        
        this.pool.on('connect', () => {
            console.log('Connected to PostgreSQL database');
        });
        
        this.pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });
    }
    
    async executeQuery(text: string, params: any[] = []): Promise<QueryResult> {
        const client = await this.pool.connect();
        try {
            const start = Date.now();
            console.log('here query')
            const result = await client.query(text, params);
            const duration = Date.now() - start;
            console.log(`Executed query: ${text} - Duration: ${duration}ms`);
            return result;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        } finally {
            client.release();
        }
    }
    
    async initializeTables(): Promise<void> {
        // console.log('here')
        try {
//             await this.executeQuery(`
//                 CREATE TABLE employee (
//     emp_id SERIAL PRIMARY KEY,               
//     name VARCHAR(100) NOT NULL,       
//     department VARCHAR(50),            
//     salary DECIMAL(10, 2),            
//     email VARCHAR(100) UNIQUE         
// );
// `);
// console.log("employee table created or already exists");
//            await this.executeQuery(`
//             CREATE TABLE project (
//             project_id SERIAL PRIMARY KEY,            
//             project_name VARCHAR(100) NOT NULL,     
//             emp_id INT,                                
//             FOREIGN KEY (emp_id) REFERENCES employee(emp_id) 
// );
//             `);
//             console.log("project table created or already exists");
        //temporary table for testing
        // await this.executeQuery(`
        //     CREATE TEMPORARY TABLE temp_employee (
        //         emp_id SERIAL PRIMARY KEY,
        //         name VARCHAR(100) NOT NULL,
        //         email VARCHAR(100) UNIQUE,
        //         salary DECIMAL(10, 2))
        //     `);
        //     console.log("temp_employee table created or already exists");
        await this.executeQuery(`
            CREATE TABLE lecturer AS TABLE lectures WITH NO DATA;`);
            console.log('lecturer table created😊');
        //     await this.executeQuery(`
        //         CREATE TABLE lectures (
        //             lecture_id SERIAL PRIMARY KEY,
        //             first_name VARCHAR(50),
        //             last_name VARCHAR(50),
        //             email VARCHAR(100) UNIQUE,
        //             department VARCHAR(100));
        //             `);
            
        //         console.log('lecture table created or already exists');
          
            await this.executeQuery(`
                CREATE TABLE employee (
    emp_id SERIAL PRIMARY KEY,               
    name VARCHAR(100) NOT NULL,       
    department VARCHAR(50),            
    salary DECIMAL(10, 2),            
    email VARCHAR(100) UNIQUE         
);
`);
           await this.executeQuery(`
            CREATE TABLE project (
            project_id SERIAL PRIMARY KEY,            
            project_name VARCHAR(100) NOT NULL,     
            emp_id INT,                                
            FOREIGN KEY (emp_id) REFERENCES employee(emp_id) 
);
            `);
            // Monday
            // await this.executeQuery(`
            //     CREATE TABLE lectures (
            //         lecture_id SERIAL PRIMARY KEY,
            //         first_name VARCHAR(50),
            //         last_name VARCHAR(50),
            //         email VARCHAR(100) UNIQUE,
            //         department VARCHAR(100));
            //         `);
            //     console.log('lecture table created or already exists');
                
            // await this.executeQuery(`
            //         CREATE TABLE courses (
            //     course_id SERIAL PRIMARY KEY,
            //     course_name VARCHAR(100),
            //     course_code VARCHAR(20) UNIQUE,
            //     description TEXT,
            //     lecture_id INT REFERENCES lectures(lecture_id));
            //    `);
            // console.log('courses table created or already exists');
            
            // // create users table
            // await this.executeQuery(`
            //             CREATE TABLE students (
            //                 student_id SERIAL PRIMARY KEY,
            //                 course_id INT REFERENCES courses(course_id),
            //                 first_name VARCHAR(50),
            //                 last_name VARCHAR(50),
            //                 email VARCHAR(100) UNIQUE,
            //                 date_of_birth DATE
            // );
            //             `);
            // console.log('student table created or already exists');


            // Wednesday
            // create an employees table
            // await this.executeQuery(`
            //     DO $$
            //     BEGIN
            //         IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'departments') THEN
            //             CREATE TYPE departments AS ENUM ('IT', 'Sales', 'Networking', 'Staff');
            //         END IF;
            //     END$$;
            // `);

            // await this.executeQuery(`
            //     CREATE TABLE IF NOT EXISTS TyEmployees (
            //         employee_id SERIAL PRIMARY KEY,
            //         name VARCHAR(50),
            //         department departments DEFAULT 'Staff',
            //         salary NUMERIC,
            //         email VARCHAR(100) UNIQUE
            //     );
            // `);

            // insert values
            // await this.executeQuery(`
            //     INSERT INTO TyEmployees (name, department, salary, email)
            //     VALUES
            //         ('John Doe', 'IT', 60000, 'johndoe@email.com'),
            //         ('Jane Smith', 'Sales', 55000, 'jane@emai.com'),
            //         ('Alice Johnson', 'Networking', 70000, 'alice@email.com'),
            //         ('Bob Brown', 'Staff', 50000, 'bobbyb@email.com'),
            //         ('Charlie Black', 'IT', 65000, 'cblack@gmail.com'),
            //         ('Diana White', 'Sales', 58000, 'dwstyles@gmail.com'),
            //         ('Ethan Green', 'Networking', 72000, 'greenee@email.com'),
            //         ('Fiona Blue', 'Staff', 52000, 'fblue@gmail.com')
            //         `)
            //         ;

                // Friday
//             // Library Tables
//             await this.executeQuery(`
//                 CREATE TABLE users (
//                 user_id SERIAL PRIMARY KEY,
//                 name VARCHAR(100),
//                 role VARCHAR(20) CHECK (role IN ('member', 'librarian')),
//                 email VARCHAR(100) UNIQUE,
//                 password VARCHAR(100)
//             );

//             CREATE TABLE library_items (
//                 item_id SERIAL PRIMARY KEY,
//                 title VARCHAR(200),
//                 year INT,
//                 type VARCHAR(20) CHECK (type IN ('book', 'dvd', 'ebook'))
//             );

//             CREATE TABLE books (
//                 book_id INT PRIMARY KEY REFERENCES library_items(item_id),
//                 author VARCHAR(100),
//                 isbn VARCHAR(20)
//             );

//             CREATE TABLE dvds (
//                 dvd_id INT PRIMARY KEY REFERENCES library_items(item_id),
//                 director VARCHAR(100)
//             );

//             CREATE TABLE ebooks (
//                 ebook_id INT PRIMARY KEY REFERENCES library_items(item_id),
//                 file_url VARCHAR(200)
//             );

//             CREATE TABLE borrow_records (
//                 borrow_id SERIAL PRIMARY KEY,
//                 user_id INT REFERENCES users(user_id),
//                 item_id INT REFERENCES library_items(item_id),
//                 borrow_date DATE,
//                 due_date DATE,
//                 return_date DATE
//             );

//             CREATE TABLE fines (
//                 fine_id SERIAL PRIMARY KEY,
//                 borrow_id INT REFERENCES borrow_records(borrow_id),
//                 amount NUMERIC(10,2),
//                 paid BOOLEAN DEFAULT FALSE
//             );
//                 `)

            console.log('Database schema initialized successfully');
        } catch (err) {
            console.error('Error initializing database:', err);
            throw err;
        }
    }
    
    getPool(): Pool {
        return this.pool;
    }
}

// Create singleton instance
const db = new Database();

// Export instance methods and the database object
export const executeQuery = (text: string, params: any[] = []) => db.executeQuery(text, params);
export const initializeTables = () => db.initializeTables();
export default db;