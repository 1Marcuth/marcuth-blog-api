import { Request, Response } from "express"
import { ZodError } from "zod"

import { getAllPostsSchema, newPostSchema } from "../schemas/post"
import PostsRepository from "../../repositories/posts-repository"

const postsController = {
    async newPost(req: Request, res: Response) {
        try {
            const data = newPostSchema.parse(req.body)
            const postsRepository = new PostsRepository()
            const result = await postsRepository.createPost(data)

            return res.status(201).send({
                message: "Post created as successful!",
                data: result
            })
        } catch(error) {
            if (error instanceof ZodError) {
                return res.status(400).send({
                    message: "Invalid body data."
                })
            }

            return res.status(500).send({
                message: "Internal server error."
            })
        }
    },
    async getPost(req: Request, res: Response) {
        const postId = req.params.postId
        const postsRepository = new PostsRepository()
        const result = await postsRepository.getPostById(postId)

        if (!result) {
            return res.status(400).send({
                message: `Not found post from id ${postId}.`
            })
        }

        return res.status(200).send({
            message: "Post fetched successfully!",
            data: result
        })
    },
    async getAllPosts(req: Request, res: Response) {
        try {
            const data = getAllPostsSchema.parse(req.params)
            const postsRepository = new PostsRepository()
            const result = await postsRepository.getAllPosts(data.startIndex, data.limit)

            return res.status(200).send({
                message: "Posts retrieved successfully!",
                data: result
            })
        } catch(error) {
            if (error instanceof ZodError) {
                return res.status(400).send({
                    message: "Invalid body data."
                })
            }

            return res.status(500).send({
                message: "Internal server error."
            })
        }
    }
}

export default postsController