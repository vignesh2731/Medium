import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
    },
    Variables:{
        userId:string
    }
}>();
blogRouter.use("/*",async(c,next)=>{
    const header:string=c.req.header("Authorization") || " ";
    try{
        const user=await verify(header,"secret");
            c.set("userId",String(user.id));
        await next();
        
    }
    catch(e){
      return c.json({
        msg:"Invalid Authorization"
      })
    }
  })
  
blogRouter.post("/",async(c)=>{
    const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const body=await c.req.json();
        const blog=await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                authorId:c.get("userId")
            }
        })
        return c.json({
            id:blog.id
        })

})
blogRouter.put("/",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body=await c.req.json();
    const blog=await prisma.post.update({
        where:
        {
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })
    return c.json({
        blog
    })
})
blogRouter.get("/",async(c)=>{
    const blogId=c.req.query("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog=await prisma.post.findFirst({
        where:{
            id:blogId
        },
        select:{
            id:true,    
            title:true,
            content:true,
            author:{
                select:{
                    email:true
                }
            }
        }
    })
    return c.json({
        blog:blog
    })
})
blogRouter.get("/bulk",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs=await prisma.post.findMany({
        select:{
            title:true,
            content:true,
            id:true,
            author:{
                select:{
                    email:true
                }
            }
        }
    });
    return c.json({
        blogs
    })
})
  