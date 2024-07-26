require("dotenv").config();
const envirnoment = process.env.NODE_ENV === "production" ? "production" : "development";
console.log(`-------- welcome to ${envirnoment} --------`);

console.log("starting...");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("./db/db.connection");


const app = express();
// MIDDLEWARE
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.status(200).send("server running...");
})
app.use("/api/v1/task", require("./router/task.router"));




const port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log(`~> Server Running at http://localhost:${port}`);
})