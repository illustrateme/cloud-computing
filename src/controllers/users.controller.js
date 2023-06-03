const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const getAllUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json({
            status: 'success',
            message: 'Successfully getAllUsers',
            data: {users}
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

const getUserInfo = async (req, res) => {
    try {
        const {username} = req.body
    const userInfo = await prisma.user.findUnique({
        where: {username: username}
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

const register = async (req, res) => {
    const {username, name, email, password} = req.body;
    try {
         const newUser = await prisma.user.create({
            data: {
                username,
                name,
                email,
                password,
            },
        })
        res.status(200).json({
            status: 'success',
            message: 'Successfully register',
            data: newUser
        })
    } catch (error) {
        console.log(error.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Service register unavailable.',
    });
    return response;
    }
}

module.exports = {getAllUser, getUserInfo, register}