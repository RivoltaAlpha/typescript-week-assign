// Subqueries are particularly useful for performing complex queries, filtering data, and performing operations that require intermediate calculations

import { executeQuery } from "../config/database"



const subQuery = async (query: string, variable: any[] = []) => {
    try {
        const res = await executeQuery(query,variable)
        console.table(res.rows)
    } catch (error) {

    }
}



export const Wednesday = async () => {
    // SELECT FROM WHERE
    subQuery('SELECT  *  FROM Employee WHERE department = (SELECT department FROM Departments WHERE deptid=1);')
    subQuery('SELECT  *  FROM Employee WHERE salary < (SELECT avg(salary) from Employee)')
    subQuery('SELECT  *  FROM Employee WHERE salary >=(SELECT avg(salary) from Employee);')
    subQuery('SELECT  *  FROM Employee WHERE department IN (SELECT department FROM Departments);')
    subQuery('SELECT  *  FROM Employee WHERE department NOT IN (SELECT department FROM Departments);')
   
   // Multiple
    subQuery('SELECT empid , name FROM Employee WHERE EXISTS (SELECT 1 FROM Departments WHERE Departments.department = Employee.department);')
    subQuery('')
}