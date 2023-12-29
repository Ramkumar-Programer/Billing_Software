const dbConfig = require('./Config');
const {userTableCreateQuery, createVerifyUserTable } = require('../Queries/InitilaizeQuery');
const {executeQuery} = require('../Queries/ExcuteQuery')

function connectAndInitializeDatabase() {


    dbConfig.connect((err) => {
        if (err) {
            console.error('Error connecting to the database: ', err);
            return;
        }

        console.log('Connected to the database..............');

        executeQuery(dbConfig, userTableCreateQuery, [])
            .then((result) => {
                console.log('UserLoginTable is created sucessfully');
            })
            .catch((error) => {
                console.error('Query error:', error);
            });
        executeQuery(dbConfig, createVerifyUserTable, [])
        .then((result) => {
            console.log('UserVerifyTable is created sucessfully');
        })
        .catch((error) => {
            console.error('Query error:', error);
        });
    });
    
}

module.exports = connectAndInitializeDatabase;
