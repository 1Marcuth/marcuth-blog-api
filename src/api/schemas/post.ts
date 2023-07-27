import { z } from "zod"

const postSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(2500)
})

export default postSchema