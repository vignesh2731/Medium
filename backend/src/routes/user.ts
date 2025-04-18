import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";
import { signUpSchema } from "@sreevignesh27/common";
export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
  
    }
  }>();
userRouter.post("/signup",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json();
    const {success}=signUpSchema.safeParse(body);
    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password
      } 
    })
    const token=await sign({id:user.id},"secret");
    return c.json({
      token:token
    })
  })
  
userRouter.post("/signin",async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body=await c.req.json();
    const user=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!user)
    {
      return c.json({
        msg:"User doesnot exist"
      })
    }
    const token=await sign({id:user.id},"secret");
    return c.json({
      token:token
    })
  })