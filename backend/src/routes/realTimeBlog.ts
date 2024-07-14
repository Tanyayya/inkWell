import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  verify } from 'hono/jwt'
import { createBlog, updateBlog } from "@tanyashukla/blog-common";



export const realtimeblogRouter = new Hono<{
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

realtimeblogRouter.use('/*', async (c, next) => {
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
  

realtimeblogRouter.post('/realtimepost', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const authorId=c.get("userId");
        const { title, content } = await c.req.json();

        const realTimePost = await prisma.realTimePost.create({
            data: {
              title,
              content,
              authors: {
                create: [{ user: { connect: { id: authorId } } }]
              }
            }
          });
          return c.json(realTimePost);
    } catch (e) {
        console.error('Failed to create real-time post', e);
        return c.json({ error: 'Failed to create real-time post' }, 500);
    
    }
});

realtimeblogRouter.put('/realtimepost/:id', async (c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const postId = c.req.param("id");
      const { title, content } = await c.req.json();
  
      const updatedPost = await prisma.realTimePost.update({
        where: { id: postId },
        data: {
          title,
          content,
        }
      });
      return c.json(updatedPost);
    } catch (e) {
      console.error(`Failed to update real-time post with id ${c.req.param("id")}`, e);
      return c.json({ error: `Failed to update real-time post with id ${c.req.param("id")}` }, 500);
    }
  });


  