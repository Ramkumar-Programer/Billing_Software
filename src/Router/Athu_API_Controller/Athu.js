const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const dbConfig = require('../../Config/Config');
const {executeQuery} = require('../../Queries/ExcuteQuery');
const {insertNewUserQuery, selectUserQuery} = require('../../Queries/AthuQuery');
const {deleteOtp} = require('./OTP')


router.post('/createUser', async (req, res) =>{

    console.log(" --- come into /createUser ---")

    try
    {
        const result = await executeQuery(dbConfig, selectEmailOpt, [req.body.email_id]);

        if(result.length > 0)
        {
            if(result[0].verified)
            {
                console.log(" --- user is verfied tries insert the data ---")
                const password = hashPassword(req.body.password);
                
                await executeQuery(dbConfig, insertNewUserQuery, [req.body.user_name, req.body.email_id, password, req.body.access_level, true]);

                res.status(200).json({ status: true, message: 'User is created successfully' });
                console.log(" --- User is created successfully ---")

                const deleteResult  = await deleteOtp("delete", req.body.email_id)

                if(deleteResult.status)
                {
                  console.log(" --- User Otp deleted for creating---")
                }
                else
                {
                  console.log(" --- User is created and unable to delete the otp ---")
                }

            }
            else
            {
                res.status(200).json({ status: false, message: 'OTP is not verfied' });
                console.log(" --- OTP is not verfied ---")
            }

        }
        else
        {
            res.status(200).json({ status: false, message: 'User is Not verfied' });
            console.log(" --- User is Not verfied ---")
        }
    }
    catch(error)
    {
        console.error("Registration error:", error);
        res.status(500).json({ status: false, error: "Registration failed" });
    }
})


function hashPassword(password) {
    const pepperedPassword = password + process.env.SECRET_KEY;
    return bcrypt.hashSync(pepperedPassword, bcrypt.genSaltSync(parseInt(process.env.SALTSROUNDS)));
}


//================================== OTP =======================



module.exports = router;