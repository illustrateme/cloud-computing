const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const getAllUser = async (req, res) => {
    try {
        const users = prisma.user.findMany()
        res.json(users)
    } catch (error) {
        console.log(error.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Service unavailable.',
    });
    return response;
    }
}

const getUserInfo = async (req, res) => {
    try {
        const {id} = req.params
    const userInfo = prisma.user.findUnique({
        where: {id: Number(id)},
    })
    res.status(201).json(userInfo)
    } catch (error) {
        console.log(error.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Service unavailable.',
    });
    return response;
    }
    
}

const register = async (req, res) => {
    const {username, name, email, password} = req.body;
    // const registeredAt = new Date().toISOString;
    // const postData = posts
    // ? posts.map((post) => {
    //     return { title: post.title, content: post.content || undefined }
    //   })
    // : []
    try {
         const newUser = await prisma.user.create({
            data: {
                username,
                name,
                email,
                password,
                
            },
        })
    } catch (error) {
        console.log(error.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Service unavailable.',
    });
    return response;
    }
}

module.exports = {getAllUser, getUserInfo, register}