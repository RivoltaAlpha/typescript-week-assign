import { executeQuery } from "../config/database"



const joinsQuery = async (query: string, variable: any[] = []) => {
    try {
        const res = await executeQuery(query,variable)
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

export const Tuesday = async () => {

    // Tuesday
    // inner join
    // joinsQuery('SELECT s.first_name, s.last_name, c.course_name FROM enrollments e JOIN students s ON e.student_id = s.student_id JOIN courses c ON e.course_id = c.course_id; ')
    // left join
    // joinsQuery('SELECT s.first_name, s.last_name, c.course_name FROM enrollments e LEFT JOIN students s ON e.student_id = s.student_id LEFT JOIN courses c ON e.course_id = c.course_id; ')
    // right join
    // joinsQuery('SELECT s.first_name, s.last_name, c.course_name FROM enrollments e RIGHT JOIN students s ON e.student_id = s.student_id RIGHT JOIN courses c ON e.course_id = c.course_id; ')
    // full join
    // joinsQuery('SELECT s.first_name, s.last_name, c.course_name FROM enrollments e FUll OUTER JOIN courses c ON e.course_id = c.course_id; ')
    // joinsQuery('SELECT c.customer_id,c.name,o.order_id,o.total_amount FROM  enrollments c FULL OUTER JOIN orders o ON c.customer_id = o.customer_id WHERE  o.customer_id IS NULL; ')

    // sets
        // filterLectures('SELECT department, COUNT(*) AS total FROM lectures GROUP BY GROUPING SETS (department);')
    // filterLectures('SELECT first_name, COUNT(*) AS total FROM lectures GROUP BY GROUPING SETS (first_name);')
    // filterLectures('SELECT department,first_name, COUNT(*) AS total FROM lectures GROUP BY GROUPING SETS (department,first_name)')

    // conditional Expressions & Operators
    // filterLectures('SELECT first_name, last_name, department FROM lectures WHERE department IN (\'It\',\'Computing\')')
    // filterLectures('SELECT first_name, last_name, department FROM lectures WHERE department NOT IN (\'It\',\'Computing\')')
    // filterLectures('SELECT first_name, last_name, department FROM lectures WHERE department BETWEEN \'It\' AND \'Computing\'')

    // Grouping
    // filterLectures('SELECT department, COUNT(*) AS total FROM lectures GROUP BY department HAVING COUNT(*) > 1;')
    // filterLectures('SELECT department, COUNT(*) AS total FROM lectures GROUP BY department HAVING COUNT(*) > 1 ORDER BY total DESC;')
    // filterLectures('SELECT department, COUNT(*) AS total FROM lectures GROUP BY department HAVING COUNT(*) > 1 ORDER BY total DESC LIMIT 2;')
    // filterLectures('SELECT department, COUNT(*) AS total FROM lectures GROUP BY department HAVING COUNT(*) > 1 ORDER BY total DESC OFFSET 2;')
    // filterLectures('SELECT department, COUNT(*) AS total FROM lectures GROUP BY department HAVING COUNT(*) > 1 ORDER BY total DESC LIMIT 2 OFFSET 2;')
    filterLectures('SELECT department, COUNT(*) AS total FROM lectures GROUP BY department;')





}