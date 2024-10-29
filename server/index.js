// Import dependencies
const express = require("express");
const morgan = require("morgan");
const pg = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json()); // Parse JSON bodies

// Root endpoint
app.get("/", (req, res) => {
    res.send("<h1>Yohi Bendhu</h1>");
});

// Database connection setup
const db = new pg.Client({
    host: "localhost",
    port: 5432,
    database: "crypto_tracker",
    user: "postgres",
    password: "123"
});

db.connect()
    .then(() => {
        console.log("DINGUS HAS BEEN DETECTED");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

// Endpoint to add a record to the 'history' table
app.post("/add", async (req, res) => {
    const data = req.body;
    await db.query(
        'INSERT INTO cryp(c_id, c_name, c_value) VALUES ($1, $2, $3)',
        [data.c_id, data.c_name, data.c_value]
    );
    res.status(201).send("Record Inserted!");
});

// Start the server
app.listen(3001, () => {
    console.log("Server started at port 3001");
});