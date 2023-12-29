const insertNewUserQuery = `
INSERT INTO ${process.env.USER_TABLE}(
    user_name, 
    email_id, 
    password,
    access_level,
    verified) 
VALUES (?, ?, ?, ?,?)
`;

const selectUserQuery =`
SELECT * FROM ${process.env.USER_TABLE} 
where email_id = ?
`;




module.exports = {
    insertNewUserQuery,
    selectUserQuery
};