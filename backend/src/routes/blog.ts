import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  verify } from 'hono/jwt'
import { createBlog, updateBlog } from "@tanyashukla/blog-common";


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string,
    
	},
  Variables:{
    userId:string,
    userName:string
}
}>();

 blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  console.log(authHeader)
  try {
      const user = await verify(authHeader, c.env.JWT_SECRET);
      if (user) {
          c.set("userId", user.id);
          c.set("userName",user.name)
          await next();
      } else {
          c.status(403);
          return c.json({
              message: "You are not logged in"
          })
      }
  } catch(e) {
      c.status(403);
      return c.json({
          message: "You are not logged in"
      })
  }
})
  
  blogRouter.post('/', async (c) => {
    
    
    const body = await c.req.json();
    const {success}=createBlog.safeParse(body);
  if(!success)
  {
    c.status(403);
    return c.json({
        message:"Invalid Inputs"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
    const response=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:c.get("userId"),
            
        }
    })
    return c.json({
        id:response.id
    })
  })
  
  
            
            
  blogRouter.put('/:id', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const id = c.req.param("id");
        const body = await c.req.json();

        // Fetch the author ID based on the provided author name, or set it to null if anonymous
        let authorId = "";
        if (body.author && body.author !== "Anonymous") {
            const author = await prisma.user.findFirst({
                where: {
                    name: body.author,
                },
            });
            if (author) {
                authorId = author.id;
            }
        }

        const response = await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                title: body.title,
                content: body.content,
                published: body.published,
                anonymous:body.anonymous
                 // Use the author ID if found, or null if anonymous
            },
        });

        return c.json({
            response,
        });
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({
            error: "Internal Server Error",
        });
    }
});

  
  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    

    const blogs=await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        publishedDate:true,
        anonymous:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
      
    

    return c.json({
      blogs
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
        },
        select:{
         
          content:true,
          title:true,
          id:true,
          publishedDate:true,
          anonymous:true,
          author:{
            select:{
              id:true,
              name:true
            }
          }
        }
    });

    return c.json({
      response
    })
  })


  