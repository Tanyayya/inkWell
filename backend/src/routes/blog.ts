import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlog, updateBlog } from "@tanyashukla/blog-common";


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string,
    
	},
    Variables:{
        userId:string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const header=c.req.header('authorization')||"";
    //const token=header?.split(" ")[1];
    const response=await verify(header,c.env.JWT_SECRET);
    if(response)
    {
        c.set('userId',response.id)
        await next();
    }
    else
    {
      c.status(403);
      return c.json({error:"Unauthorized"});
      }
    }
  )
  
  blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();
    const {success}=createBlog.safeParse(body);
  if(!success)
  {
    c.status(403);
    return c.json({
        message:"Invalid Inputs"
    })
  }
    const response=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:c.get("userId")
        }
    })
    return c.json({
        id:response.id
    })
  })
  
  blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();
    const {success}=updateBlog.safeParse(body);
  if(!success)
  {
    c.status(403);
    return c.json({
        message:"Invalid Inputs"
    })
  }
    const response=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
            
        }
    })
    return c.json({
        id:response.id
    })
  })
  
  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    

    const response=await prisma.post.findMany();

    return c.json({
      response
    })
  })

  blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    
    const id =  c.req.param("id");
    const response=await prisma.post.findMany({
        where:{
            id:id
        }
    });

    return c.json({
      response
    })
  })