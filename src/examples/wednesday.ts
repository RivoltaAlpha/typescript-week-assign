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

const transactions = async (query: string, variables: any[] = []) => {
	try{
	const res = await executeQuery(query,variables)
		console.table(res.rows)
	} catch(error){

	}
}
const insertMultipleProjects = async (project: TProject[]): Promise<void> => {
	// For multiple users, using a transaction is better
	const client = await db.getPool().connect();
	try {
		// Begin transaction
		await client.query("BEGIN");

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