const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const userRoutes = require('./src/routes/users.routes');
const postRoutes = require('./src/routes/posts.routes');
const port = 8080;



app.listen(port, () => {

    console.log(`Server is running on port ${port}`);
});

app.use(bodyParser.json());
app.use('/post', postRoutes);
app.use('/user', userRoutes);



app.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password


        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, 'secret');

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                user: user,
                token: token,
            },
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
})

app.post('/register', async(req, res) => {
    const { username, name, email, password } = req.body;

    try {
        // Check if the username is already used
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Username is already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                username,
                name,
                email,
                password: hashedPassword,
            },
        });

        // Generate JWT token
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_ACCESS_SECRET);

        res.status(201).json({
            status: 'success',
            message: 'Successfully registered',
            data: {
                user: newUser,
                token: token,
            },
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});

app.get('/', async(req, res, next) => {
    const checkDatabaseConnection = async() => {
        try {
            prisma.$connect();
            console.log('Connected to the database.');
        } catch (error) {
            console.error('Failed to connect to the database:', error);
        } finally {
            prisma.$disconnect();
        }
    }
    checkDatabaseConnection();
    res.status(200).send({ message: "Cool It Works!" });
});