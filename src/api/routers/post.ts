import { Router } from "express"

import postsController from "../controllers/post"

const postsRouter = Router()

postsRouter.post("/new", postsController.newPost)
postsRouter.get("/all/:startIndex?/:limit?", postsController.getAllPosts)
postsRouter.get("/get/:postId", postsController.getPost)

export default postsRouter