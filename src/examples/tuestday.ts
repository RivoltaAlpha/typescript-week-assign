import { executeQuery } from "../config/database"



const joinsQuery = async (query: string, variable: any[] = []) => {
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
    // full join
    // joinsQuery('SELECT s.first_name, s.last_name, c.course_name FROM enrollments e FUll OUTER JOIN courses c ON e.course_id = c.course_id; ')
    joinsQuery('SELECT c.customer_id,c.name,o.order_id,o.total_amount FROM  enrollments c FULL OUTER JOIN orders o ON c.customer_id = o.customer_id WHERE  o.customer_id IS NULL; ')


}