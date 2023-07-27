import { z } from "zod"

const newPostSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(2500)
})

const getAllPostsSchema = z.object({
    startIndex: z.optional(z.string().regex(/^\d+$/).transform(Number)),
    limit: z.optional(z.string().regex(/^\d+$/).transform(Number))
})

export { newPostSchema, getAllPostsSchema }