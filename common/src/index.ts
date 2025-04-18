import {z} from 'zod'
export const signUpSchema=z.object({
    email:z.string().email(),
    password:z.string()
})
export type SignupInput=z.infer<typeof signUpSchema>

export const signInSchema=z.object({
    email:z.string().email(),
    password:z.string()
})
export type SignInInput=z.infer<typeof signInSchema>


export const createBlog=z.object({
    title:z.string(),
    content:z.string()
})
export type createBlogInput=z.infer<typeof createBlog>

export const updateBlog=z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})
export type updateBlogInput=z.infer<typeof updateBlog>
