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
    userName:string,
    ids:string
}
}>();



blogRouter.use('/*', async (c, next) => {
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

blogRouter.get('/drafts', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    

    try {
        const blogs = await prisma.post.findMany({
            where:{
                authorId:c.get("userId"),
                published:false
            },
            select: {
                content: true,
                title: true,
                id: true,
                published:true,
                publishedDate: true,
                anonymous: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        console.log("Fetched blogs for /drafts:", blogs);

        if (blogs.length === 0) {
            console.log("No drafts found");
            return c.json({ message: "No drafts found" });
        }

        return c.json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs for /drafts:", error);
        return c.json({ error: "An error occurred while fetching drafts" }, 500);
    }
  })
  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    

    const blogs=await prisma.post.findMany({
        where:{
            published:true
        },
      select:{
        content:true,
        title:true,
        id:true,
        publishedDate:true,
        anonymous:true,
        author:{
          select:{
            name:true,
            id:true
          }
        },
        savedBy:true
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
              name:true,
              about:true
            }
          },
          savedBy:true
        }
    });

    return c.json({
      response
    })
  })


  

  

blogRouter.post("/save",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId=c.get("userId")
    const body = await c.req.json();
    const postId=body.postId;

    try {
        const res=await prisma.saved.create({
          data: {
            user: userId,
            post: postId,
          },
        });
        return Response.json(
          {
            res,
            success: true,
            data: "created",
          },
          {
            status: 200,
          }
        );
      } catch (error) {
        console.log(error);
        return Response.json(
          {
            success: false,
          },
          {
            status: 400,
          }
        );
      }
})

blogRouter.post("/savedStatus",async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId=c.get("userId")
    const body = await c.req.json();
    const postId=body.postId;

    try{
        const savedstatus=await prisma.saved.findFirst({
            where:
            {
                user:userId,
                post:postId
            }
            
        })
        if(savedstatus===null)
            {
                return Response.json({
                    success: false,
                  });
            }
            return Response.json(
                {
                  savedstatus,
                  success: true,
                },
                {
                  status: 200,
                }
              );
    }
    catch(error){
        return Response.json(
            {
              success: false,
            },
            {
              status: 400,
            }
          );
    }
  })


  
blogRouter.post("/unsave",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId=c.get("userId")
    const body = await c.req.json();
    const postId=body.postId;

    try {
        const userSaved = await prisma.saved.findFirst({
            where: {
              user: userId,
              post: postId,
            },
          });
          if (userSaved) {
            await prisma.saved.delete({
              where: {
                id: userSaved.id,
              },
            });
            return Response.json(
              {
                success: true,
                data: "deleted",
              },
              {
                status: 200,
              }
            );
          } else {
            return Response.json(
              {
                status: false,
              },
              {
                status: 400,
              }
            );
          }
        } catch (error) {
          console.log(error);
          return Response.json(
            {
              success: false,
            },
            {
              status: 400,
            }
          );
        
      }
})

blogRouter.post("/saved",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId=c.get("userId")
    

    try {
        const userSaved = await prisma.saved.findFirst({
            where: {
              user: userId,
             
            },
            select:{
                post:true
            }
          });
          
          return Response.json({
            userSaved
          })
        } catch (error) {
          console.log(error);
          return Response.json(
            {
              success: false,
            },
            {
              status: 400,
            }
          );
        
      }

     
})