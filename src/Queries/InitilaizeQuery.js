const userTableCreateQuery =
`
    CREATE TABLE IF NOT EXISTS ${process.env.USER_TABLE}(
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        user_name VARCHAR(255),
        email_id VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        access_level INT,
        verified BOOLEAN
    )
`;

const createVerifyUserTable =
`   
    CREATE TABLE IF NOT EXISTS ${process.env.OTP_VERIFY_TABLE} (
        email_id VARCHAR(255) NOT NULL PRIMARY KEY,
        otp CHAR(6) NOT NULL,
        verified BOOLEAN,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const createCategoryTable =
`
    CREATE TABLE IF NOT EXISTS ${process.env.CATEGORY_TABLE} (
        category_id INT PRIMARY KEY AUTO_INCREMENT,
        category_name varchar(255),
        label_id INT UNIQUE
    )
`;

const createBrandTableQuery =
`
        CREATE TABLE IF NOT EXISTS ${process.env.PRODUCT_TABLE} (
            brand_id INT PRIMARY KEY AUTO_INCREMENT,
            brand_name varchar(255),
            label_id INT UNIQUE,
            category_id INT,
            FOREIGN KEY (listId) REFERENCES ${process.env.CATEGORY_TABLE}(category_id) ON DELETE CASCADE
        )
`;

const createProdctTableQuery = (tableName, brandId) =>
`
        CREATE TABLE IF NOT EXISTS ${tableName+toString(brandId)} (
            product_id INT PRIMARY KEY AUTO_INCREMENT,
            product_name varchar(255),
            label_id INT UNIQUE
            brand_id INT,
            stock INT,
            cost_price INT,
            selling_price INT,
            FOREIGN KEY (product_id) REFERENCES ${process.env.CATEGORY_TABLE}(brand_id) ON DELETE CASCADE
        )
`;

module.exports = {
    userTableCreateQuery,
    createVerifyUserTable,
    createCategoryTable,
    createBrandTableQuery,
    createProdctTableQuery
};