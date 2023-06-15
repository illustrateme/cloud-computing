const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const getAllPost = async (req, res) => {
 

  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            username: true
          }
        },
        design_style: {
          select: {
            name: true
          }
        },
        design_type: {
          select: {
            name: true
          }
        }
      }
    });
    res.json({
      status: 'success',
      message: 'Successfully getAllPosts',
      data: {posts},
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 'failed',
      message: 'Service getAllPost unavailable.',
      error: error.message,
    });
  }
}

const getAllUserPost = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    });
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: `User with username '${username}' not found`,
      });
      return;
    }
    const posts = await prisma.post.findMany({
      where: {
        authorId: user.id
      },
      include: {
        design_type: true,
        design_style: true
      }
    });
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved user posts',
      data: posts,
    });
  } catch (error) {
    console.error('Error retrieving user posts', error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving user posts',
      error: error.message,
    });
  }
}

const searchByTag = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ error: 'No authorization token provided' });
  } else {
    try {
      const splitToken = token.split(" ")[1];
      jwt.verify(splitToken, 'secret');
      const { query } = req.body || {};
      console.log(query)
      const queryParts = query ? query.split(' ') : [];
      const search = await prisma.post.findMany({
        where: {
          OR: queryParts.map(part => ({
            design_type: {
              name: { contains: part }
            }
          })).concat(queryParts.map(part => ({
            design_style: {
              name: { contains: part }
            }
          })))
        }
      });
      res.status(200).json(search);
    } catch (error) {
      console.error('Error search', error);
      res.status(500).json({ message: 'Error searching' });
    }
  }
}

const addPost = async (req, res) => {
  console.log("enter addpost")
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ error: 'No authorization token provided' });
  } else {
    try {
      console.log("enter try")
      const splitToken = token.split(" ")[1];
        const decoded = jwt.verify(splitToken, 'secret');
        console.log("verified")
        const { username, title, description, imageUrl, priceStartFrom, designTypeId, designStyleId } = req.body;
        // Get the user ID from the decoded JWT token
        const user = await prisma.user.findUnique({ where: { username } });
        if(!user){
          return res.status(401).json({ message: 'User not found' });
        }
        const authorId = await prisma.user.findUnique({
          where: {
            username: username
          },
          select:{
            id: true
          },
          
        })
    
        // Create a new post using Prisma's create method
        const newPost = await prisma.post.create({
          data: {
            title,
            description,
            imageUrl,
            priceStartFrom,
            designTypeId,
            designStyleId,
            authorId: authorId.id
            // Associate the post with the logged-in user
          },
        });
    
        res.status(201).json({
          status: 'success',
          message: 'Post created successfully',
          data: newPost,
        });
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post' });
      }
  }
};


  
  module.exports = {addPost, searchByTag, getAllUserPost, getAllPost};