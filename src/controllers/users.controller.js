const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUser = async(req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json({
            status: 'success',
            message: 'Successfully getAllUsers',
            data: { users }
        })
    } catch (error) {
        console.log(error.message);
        const response = res.status(500).json({
            status: 'failed',
            message: 'Service getAllUser unavailable.',
        });
        return response;
    }
}

const getUserInfo = async(req, res) => {
    try {
        const { username } = req.body
        const userInfo = await prisma.user.findUnique({
            where: { username: username },
            select: {
                username: true,
                name: true,
                email: true,
                posts: {
                    select: {
                        id: true
                    }
                }
              }
        })
        res.status(201).json({
            status: "success",
            message: "Successfully getUserInfo",
            data: userInfo
        })
    } catch (error) {
        console.log(error.message);
        const response = res.status(500).json({
            status: 'failed',
            message: 'Service getUserInfo unavailable.',
        });
        return response;
    }
}
const register = async(req, res) => {
    const { username, name, email, password } = req.body;
    try {
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
        const token = jwt.sign({ userId: newUser.id }, 'your-secret-key');

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
};

// const register = async (req, res) => {
//     const {username, name, email, password} = req.body;
//     try {
//          const newUser = await prisma.user.create({
//             data: {
//                 username,
//                 name,
//                 email,
//                 password,
//             },
//         })
//         res.status(200).json({
//             status: 'success',
//             message: 'Successfully register',
//             data: newUser
//         })
//     } catch (error) {
//         console.log(error.message);
//     const response = res.status(500).json({
//       status: 'failed',
//       message: 'Service register unavailable.',
//     });
//     return response;
//     }
// }

// const login = async (req, res) => {
//     const {username, password}
// }

module.exports = { getAllUser, getUserInfo, register }