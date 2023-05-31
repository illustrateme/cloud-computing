// let mysql = require("mysql");
// let connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "illustrateme",
// });

const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

module.exports = { db };