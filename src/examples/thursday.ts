import { initializeTables, executeQuery } from "../config/database";
//using generics for the company interface
 export interface company<T> {
        employee: T[];
        projects: T[];
        temp_employee: T[];
 }
 //managing tables
    //temporary table ✔️
    //copying tables ✔️
    //truncating tables ✔️
    //alter tables - rename column, drop column, change data type, rename table, drop table  ✔️  
    const renameColumn = async (tableName: string, oldColumnName: string, newColumnName: string): Promise<void> => {
        try{
            const res = await executeQuery(
							`ALTER TABLE ${tableName}  RENAME COLUMN ${oldColumnName} TO ${newColumnName}`
						);
            console.log(`Column ${oldColumnName} renamed to ${newColumnName} in table ${tableName}`);
        }catch(err) {
            console.error(`Error renaming column ${oldColumnName} to ${newColumnName} in table ${tableName}:`, err);
        }
    }
    //chanege data type
    const changeDataType = async (tableName: string, columnName: string, newDataType: string): Promise<void> => {
        try{
            const res = await executeQuery(
                            `ALTER TABLE ${tableName} ALTER COLUMN ${columnName} TYPE ${newDataType}`
                        );
            console.log(`Column ${columnName} in table ${tableName} changed to type ${newDataType}`);
        }catch(err) {
            console.error(`Error changing column ${columnName} in table ${tableName} to type ${newDataType}:`, err);
        }
    }
    //rename table
    const renameTable = async (oldTableName: string, newTableName: string): Promise<void> => {
        try{
            const res = await executeQuery(
                            `ALTER TABLE ${oldTableName} RENAME TO ${newTableName}`
                        );
            console.log(`Table ${oldTableName} renamed to ${newTableName}`);
        }catch(err) {
            console.error(`Error renaming table ${oldTableName} to ${newTableName}:`, err);
        }
    }


 export const thursday = async () => {
		// 1. Create tables if it doesn't exist
		// await initializeTables();
        // renameColumn("employee", "id", "emp_id");
        // changeDataType("employee", "salary", "INTEGER");
        // renameTable("employee", "employees");
        // await executeQuery("DROP TABLE IF EXISTS employee");
        // await executeQuery("TRUNCATE TABLE project");

 }