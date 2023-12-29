const insertOpt = `INSERT INTO 
${process.env.OTP_VERIFY_TABLE}  (email_id, otp, createdAt, verified)
 VALUES (?, ?, NOW(), false)`;


 const modifyOtpCheck = `UPDATE ${process.env.OTP_VERIFY_TABLE} 
 SET verified = ? WHERE email_id = ?`;


 const selectEmailOpt = `SELECT * FROM ${process.env.OTP_VERIFY_TABLE}  WHERE email_id = ?`;
 const selectVerifedOpt = `SELECT * FROM ${process.env.OTP_VERIFY_TABLE}  WHERE verified = ?`;

 const deleteOptQueryAuto = `DELETE FROM ${process.env.OTP_VERIFY_TABLE} 
 WHERE email_id = ? AND TIMESTAMPDIFF(MINUTE, createdAt, NOW()) >= ${parseInt(process.env.OTP_EXPRIED_TIME)}`;

 const deleteOptQuery = `DELETE FROM ${process.env.OTP_VERIFY_TABLE}  WHERE email_id = ?`;

 module.exports = {
    insertOpt,
    selectEmailOpt,
    deleteOptQueryAuto,
    deleteOptQuery,
    selectVerifedOpt,
    modifyOtpCheck
};