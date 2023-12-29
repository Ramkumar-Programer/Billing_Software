const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectAndInitializeDatabase = require('./src/Config/DbConnection');
const athuRouter = require('./src/Router/Athu_API_Controller/Athu')
const {otpRouter,deleteOtp} = require('./src/Router/Athu_API_Controller/OTP')

const cron = require('node-cron');
const app = express();
app.use(express.json());


connectAndInitializeDatabase();

app.use('/athu', athuRouter);
app.use('/otp', otpRouter);

cron.schedule(`*/${parseInt(process.env.OTP_DELETED_TIME)} * * * *`, async () => {
    console.log("came inside");
    try {
        const result = await deleteOtp("auto");
        console.log(result);
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
