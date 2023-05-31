const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require(express.Router);

const port = 5000; // or any other port number of your choice
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Use bodyParser to parse JSON data
app.use(bodyParser.json());

// const auth = require("./src/api/auth/auth.routes.js");
// router.use("/auth", auth);

app.get("/", async(req, res, next) => {
    // Perform the necessary operations to retrieve all data
    // (e.g., fetch it from a database)

    // Send the retrieved data as a response
    res.status(200).send({ message: "Cool It Works!" });
});

// app.post("/api/data", async(req, res) => {
//     const data = req.body;

//     try {
//         // Insert the data into the MySQL database
//         const query = "INSERT INTO your_table SET ?";
//         const result = await pool.query(query, data);
//         console.log("Data inserted successfully:", result);

//         res.status(201).json({ message: "Data inserted successfully" });
//     } catch (error) {
//         console.error("Error inserting data:", error);
//         res.status(500).json({ message: "Error inserting data" });
//     }
// });

// app.get('/api/data/:id', (req, res) => {
//     const id = req.params.id;

//     // Perform the necessary operations to retrieve the data by ID
//     // (e.g., fetch it from a database)

//     // Send the retrieved data as a response
//     res.status(200).json({ data: /* Retrieved data */ });
// });

app.put("/api/data/:id", (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    // Perform the necessary operations to update the data by ID
    // (e.g., update it in a database)

    // Send a response indicating success or failure
    res.status(200).json({ message: "Data updated successfully" });
});

app.delete("/api/data/:id", (req, res) => {
    const id = req.params.id;

    // Perform the necessary operations to delete the data by ID
    // (e.g., remove it from a database)

    // Send a response indicating success or failure
    res.status(200).json({ message: "Data deleted successfully" });
});