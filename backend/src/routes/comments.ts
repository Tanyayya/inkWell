import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  verify } from 'hono/jwt'
import { createBlog, updateBlog } from "@tanyashukla/blog-common";



export const commentsRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string,
    
	},
  Variables:{
    userId:string,
    userName:string,
    ids:string
}
}>();

commentsRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization")||"";
   
    
    try {
      const user = await verify(authHeader, c.env.JWT_SECRET);
      if (user) {
        c.set("userId", user.id as string);
        c.set("userName", user.name as string);
        await next();
      } else {
        c.status(403);
        return c.json({
          message: "You are not logged in"
        });
      }
    } catch (e) {
      c.status(403);
      return c.json({
        message: "You are not logged in"
      });
    }
  });


  commentsRouter.post('/:postId', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const postId  =c.req.param("postId");
    const body = await c.req.json();
    
    const userId=c.get("userId");
    const text=body.text;
    try{
        const newComment = await prisma.comment.create({
            data: {
              text: text,
              postId: postId,
              userId: userId,
            },
          });
         return  c.json({newComment});
    } catch(e) {
        console.error('Error creating comment:', e);
        c.status(500);
        return c.json({
            error: "An error occurred while creating the comment.",
        });

    }
  
    
  })


  commentsRouter.put('/:commentId', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const commentId = c.req.param("commentId");
    const body = await c.req.json();
    const text = body.text;
  
    try {
      const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: { text: text },
      });
      return c.json({ updatedComment });
    } catch (e) {
      console.error('Error updating comment:', e);
      c.status(500);
      return c.json({
        error: "An error occurred while updating the comment.",
      });
    }
  });

  commentsRouter.delete('/:commentId', async (c) => {
    const commentId = c.req.param("commentId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      await prisma.comment.delete({
        where: { id: commentId },
      });
      return c.json({ message: "Comment deleted successfully." });
    } catch (e) {
      console.error('Error deleting comment:', e);
      c.status(500);
      return c.json({
        error: "An error occurred while deleting the comment.",
      });
    }
  });
  
  // Create a reply to a comment
  commentsRouter.post('/:commentId/replies', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const commentId = c.req.param("commentId");
  const body = await c.req.json();
  const userId = c.get("userId");
  const text = body.text;

  try {
    const parentComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!parentComment) {
      c.status(404);
      return c.json({
        error: "Parent comment not found.",
      });
    }

    const newReply = await prisma.comment.create({
      data: {
        text: text,
        postId: parentComment.postId,
        userId: userId,
        parentId: commentId,
      },
    });
    return c.json({ newReply });
  } catch (e) {
    console.error('Error creating reply:', e);
    c.status(500);
    return c.json({
      error: "An error occurred while creating the reply.",
    });
  }
});

commentsRouter.get('/:postId', async (c) => {
    const postId = c.req.param("postId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const comments = await prisma.comment.findMany({
        where: { postId: postId, parentId: null },
        include: {
            user:{
                select:{
                    name:true
                }
            },
          replies: {
            include: {
                user: {
                    select: {
                      name: true,
                    },
                  },
              replies: true, // Nested replies (optional, depending on your schema)
            },
          },
        },
      });
      return c.json({ comments });
    } catch (e) {
      console.error('Error fetching comments:', e);
      c.status(500);
      return c.json({
        error: "An error occurred while fetching the comments.",
      });
    }
  });