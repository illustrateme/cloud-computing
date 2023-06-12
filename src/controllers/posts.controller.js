const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUserPost = async(req, res) => {
    try {
        const username = req.params.username
        const posts = await prisma.post.findMany({
          where: {
            username: username
          }
        })
        res.status(200).json({
          status: 'success',
          message: 'Successfully retrieved user posts',
          data: posts,
        });
    } catch (error) {

    }
}

const addPost = async (req, res) => {
    const { title, description, imageUrl } = req.body;
  
    try {
      // Get the user ID from the decoded JWT token
      const userId = req.user.id;
  
      // Create a new post using Prisma's create method
      const newPost = await prisma.post.create({
        data: {
          title,
          description,
          imageUrl,
          userId, // Associate the post with the logged-in user
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
  };
  
  module.exports = {addPost};