const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const verifyJwt = promisify(jwt.verify);

const getAllUser = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ error: 'No authorization token provided' });
    return;
  }

  try {
    const splitToken = token.split(" ")[1];
    jwt.verify(splitToken, 'secret');
    const users = await prisma.user.findMany({
      include: {
        posts: {
          include: {
            design_type: true,
            design_style: true,
          }
        }
      },
      select: {
        username: true,
        email: true,
        posts: true,
      },
    });
    res.json({
      status: 'success',
      message: 'Successfully getAllUsers',
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 'failed',
      message: 'Service getAllUser unavailable.',
      error: error.message,
    });
  }
}
    
const getUserInfo = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ error: 'No authorization token provided' });
    } else {
      try {
        const splitToken = token.split(" ")[1];
        jwt.verify(splitToken, 'secret');
        const username = req.params.username;
        const userInfo = await prisma.user.findUnique({
          where: { username: username },
          select: {
            username: true,
            name: true,
            email: true,
            posts: true,
          },
        });
        
        if (userInfo && userInfo.username !== username) {
          return res.status(400).json({ error: "Username not available" });
        }
        res.status(200).json({
          status: 'success',
          message: 'Successfully getUserInfo',
          data: userInfo,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({
          status: 'failed',
          message: 'Service getUserInfo unavailable.',
        });
      }
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

module.exports = { getAllUser, getUserInfo }