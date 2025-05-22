// Subqueries are particularly useful for performing complex queries, filtering data, and performing operations that require intermediate calculations
import db, { initializeTables, executeQuery } from "../config/database";
export interface TEmployee {
	name: string;
	department: string;
	salary: number;
	email: string;
}
export interface TProject {
	project_name: string;
	emp_id: number;
}

import { executeQuery, initializeTables } from "../config/database"

const subQuery = async (query: string, variable: any[] = []) => {
    try {
        const res = await executeQuery(query,variable)
        console.table(res.rows)
    } catch (error) {

    }
}
//CRUD
const insertMultipleEmployee = async (employee: TEmployee[]): Promise<void> => {
	// For multiple users, using a transaction is better
	const client = await db.getPool().connect();
	try {
		// Begin transaction
		await client.query("BEGIN");

		// Insert each user
		for (const user of employee) {
			await client.query(
				"INSERT INTO employee (name, department, salary,email) VALUES ($1, $2, $3,$4)",
				[user.name, user.department, user.salary, user.email]
			);
		}


		// Commit transaction
		await client.query("COMMIT");
		// console.log(${ users } users inserted successfully);
	} catch (err) {
		await client.query("ROLLBACK");
		console.error("Error inserting multiple users:", err);
		throw err;
	} finally {
		client.release();
	}
};
const insertMultipleProjects = async (project: TProject[]): Promise<void> => {
	// For multiple users, using a transaction is better
	const client = await db.getPool().connect();
	try {
		// Begin transaction
		await client.query("BEGIN");

const transactions = async (query: string, variables: any[] = []) => {
    try{
    const res = await executeQuery(query,variables)
        console.table(res.rows)
    } catch(error){

    }
}
		// Insert each user
		for (const user of project) {
			await client.query(
				"INSERT INTO project (project_name, emp_id) VALUES ($1, $2)",
				[user.project_name, user.emp_id]
			);
		}

		// Commit transaction
		await client.query("COMMIT");
		console.log(`${project} users inserted successfully`);
	} catch (err) {
		await client.query("ROLLBACK");
		console.error("Error inserting multiple users:", err);
		throw err;
	} finally {
		client.release();
	}
};
const queryemployees = async (): Promise<void> => {
	try {
		const res = await executeQuery("SELECT * FROM employee");
		console.table(res.rows);
	} catch (error) {}
};
const queryProjects = async (): Promise<void> => {
	try {
		const res = await executeQuery("SELECT * FROM project");
		console.table(res.rows);
	} catch (error) {}
};
//update
const updateEmployee = async (id: number, name: string): Promise<void> => {
	try {
		const res = await executeQuery(
			"UPDATE employee SET name = $1 WHERE emp_id = $2",
			[name, id]
		);
		console.log(`Employee with ID ${id} updated successfully`);
	} catch (error) {
		console.error("Error updating employee:", error);
	}
}
const deleteEmployee = async (id: number): Promise<void> => {
	try {
		const res = await executeQuery("DELETE FROM employee WHERE emp_id = $1", [
			id,
		]);
		console.log(`Employee with ID ${id} deleted successfully`);
	} catch (error) {
		console.error("Error deleting employee:", error);
	}
};

export const Wednesday = async () => {
//first excersice- modifty table
const employees: TEmployee[] = [
	{
		name: "mark",
		department: "sales",
		salary: 85000,
		email: "marka@gmail.com",
	},
	{ name: "tyla", department: "HR", salary: 80000, email: "tyla@gmail.com" },
	{
		name: "collins",
		department: "marketing",
		salary: 90000,
		email: "collins@gmail.com",
	},
	{ name: "brian", department: "IT", salary: 95000, email: "brian@gmail.com" },
	{
		name: "dennis",
		department: "SCRUM MASTER",
		salary: 980000,
		email: "deno@gmail.com",
	},
];
const projects: TProject[] = [
	{ project_name: "Website Redesign", emp_id: 5 },
	{ project_name: "Website Redesign", emp_id: 2 },
	{ project_name: "Website Redesign", emp_id: 3},
	{ project_name: "Website Redesign", emp_id: 4 },
];
// insertMultipleEmployee(employees);
// insertMultipleProjects( projects);

//read
queryemployees();
// queryProjects();

//update
// updateEmployee(15, "John");
//delete
// deleteEmployee(16);


//     SELECT FROM WHERE
//     subQuery('SELECT  *  FROM Employee WHERE department = (SELECT department FROM Departments WHERE deptid=1);')
//     subQuery('SELECT  *  FROM Employee WHERE salary < (SELECT avg(salary) from Employee)')
//     subQuery('SELECT  *  FROM Employee WHERE salary >=(SELECT avg(salary) from Employee);')
//     subQuery('SELECT  *  FROM Employee WHERE department IN (SELECT department FROM Departments);')
//     subQuery('SELECT  *  FROM Employee WHERE department NOT IN (SELECT department FROM Departments);')
   
//    Multiple
//     subQuery('SELECT empid , name FROM Employee WHERE EXISTS (SELECT 1 FROM Departments WHERE Departments.department = Employee.department);')
//     subQuery('')
// await initializeTables();

        // 1. Create tables if it doesn't exist
    // await initializeTables();

    // SELECT FROM WHERE
        // subQuery("SELECT  *  FROM TyEmployees WHERE department IN (SELECT department FROM TyEmployees WHERE department= 'IT');")
        // subQuery("SELECT  *  FROM TyEmployees WHERE department IN (SELECT department FROM TyEmployees WHERE department= 'Sales');")
    // subQuery('SELECT  *  FROM TyEmployees WHERE salary < (SELECT avg(salary) from TyEmployees)')
    // subQuery('SELECT  *  FROM TyEmployees WHERE salary <= (SELECT avg(salary) from TyEmployees);')
    // subQuery('SELECT  *  FROM TyEmployees WHERE department IN (SELECT department FROM TyEmployees);')
    // subQuery('SELECT  *  FROM TyEmployees WHERE department NOT IN (SELECT department FROM Departments);')
    subQuery(`
    SELECT department, salary
    FROM TyEmployees
    WHERE department IN ('IT', 'Sales', 'Networking', 'Staff')
    ORDER BY department ASC, salary DESC;
`)
   
//    // Multiple
//     subQuery('SELECT empid , name FROM TyEmployees WHERE EXISTS (SELECT 1 FROM Departments WHERE Departments.department = TyEmployees.department);')
//     subQuery('')
}