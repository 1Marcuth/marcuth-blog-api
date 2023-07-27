import { Router } from "express"

import postsController from "../controllers/post"

const postsRouter = Router()

postsRouter.post("/new", postsController.newPost)
postsRouter.get("/:postId", postsController.getPost)

export default postsRouter