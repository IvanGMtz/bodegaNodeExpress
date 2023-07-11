import mysql from "mysql2";

const con = mysql.createPool({
    host: "localhost",
    user: "campus",
    password: "campus2023",
    database: "admissionTest",
    port: 3306
});

export default  con;