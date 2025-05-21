// Subqueries are particularly useful for performing complex queries, filtering data, and performing operations that require intermediate calculations

import { executeQuery, initializeTables } from "../config/database"



const subQuery = async (query: string, variable: any[] = []) => {
    try {
        const res = await executeQuery(query,variable)
        console.table(res.rows)
    } catch (error) {

    }
}

const transactions = async (query: string, variables: any[] = []) => {
    try{
    const res = await executeQuery(query,variables)
        console.table(res.rows)
    } catch(error){

    }
}



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