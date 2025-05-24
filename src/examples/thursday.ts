import  { executeQuery } from "../config/database";

const renameColumn = async () => {
    const query = `ALTER TABLE lectures RENAME COLUMN email TO lecture_email;`;
    await executeQuery(query);
    console.log("Column renamed");
};




const checkTable = async (table:string) => {
    const res = await executeQuery(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = ${1}
      );
    `,[table]);
    console.log("Table exists:", res.rows[0].exists);
};
  
const addColumn = async () => {
    const query = `ALTER TABLE lectures ADD COLUMN salary INTEGER;`;
    await executeQuery(query);
    console.log("Column added");
};

export const Thursday = () => {
    // await addColumn()
    // await checkTable('lectures')
    // await renameColumn()
}