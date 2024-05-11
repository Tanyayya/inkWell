import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {signinInput, signupInput} from "@tanyashukla/blog-common";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();
  
  userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  const {success}=signupInput.safeParse(body);
  if(!success)
  {
    c.status(403);
    return c.json({
        message:"Invalid Inputs"
    })
  }
  const password=new TextEncoder().encode(body.password);
  
  const hashPassword=await crypto.subtle.digest({
    name:'SHA-256'
  },
  password)
  
  const hexString = [...new Uint8Array(hashPassword)]
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
  try{
  const response=await prisma.user.create({
    data:{
      email:body.email,
      password:hexString,
      name:body.name
    }
  })
  
  const token = await sign({id:response.id}, c.env.JWT_SECRET)
  
  return c.json({
    jwt:token
  });
  }catch(err)
  {
     c.status(403);
     return c.text("Invalid Credentials");
  }
    
  })
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  const {success}=signinInput.safeParse(body);
  if(!success)
  {
    c.status(403);
    return c.json({
        message:"Invalid Inputs"
    })
  }
  const response=await prisma.user.findUnique({
    where:{
      email:body.email,
      
    }
  })
  if(!response)
  {
    c.status(403);
    return c.json({error:"User not found"});
    
  }
  const secret = 'mySecretKey'
  const token = await sign({id:response.id}, secret)
  
  return c.json({
    jwt:token
  });
  })