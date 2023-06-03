const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require('./src/routes/users.routes');



const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(bodyParser.json());
app.use('/user', userRoutes);

app.get('/', async (req, res, next) => {
    res.status(200).send({ message: "Cool It Works!"});
});

