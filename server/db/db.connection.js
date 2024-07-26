require("dotenv").config();
const mongoose = require("mongoose");


const dbName = "rak_todo"

const dbUrl = process.env.DB_URL + dbName;

try {
    mongoose.connect(dbUrl);
    console.log("~> Database connected successfully");
}
catch (error) {
    console.error("~> Database connection failed ", error.message);
}
