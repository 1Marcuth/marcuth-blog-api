import { firestore } from "firebase-admin"

import Post, { PostProps } from "../entities/post"
import { db } from "../services/firebase"

interface CreatePostResult {
    id: string
    props: PostProps
}

type GetPostByIdResult = {
    id: string
    props: PostProps
} | null

type GetAllPostsResult = {
    id: string
    props: PostProps
}[]

class PostsRepository {
    private collection: firestore.CollectionReference

    constructor() {
        this.collection = db.collection("posts")
    }

    public async getAllPosts(
        startIndex?: number,
        limit?: number
    ): Promise<GetAllPostsResult> {
        const postRefs = await this.collection.listDocuments()
        const posts: GetAllPostsResult = []

        if (startIndex === null || startIndex === undefined) {
            startIndex = 0
        } else if (startIndex >= postRefs.length) {
            throw new Error("The start index is greater than the publications length!")
        }

        if (!limit || limit > postRefs.length) {
            limit = postRefs.length
        }
        
        for (let i = startIndex; i < (limit + 1); i++) {
            if (i > (postRefs.length - 1)) break

            const postRef = postRefs[i]
            const postSnapshot = await postRef.get()
            const postData = postSnapshot.data()
            
            if (postSnapshot.exists && postData) {
                const post = Post.create({
                    title: postData.title,
                    content: postData.content, 
                    createdAt: postData.createdAt
                }, postRef.id)

                posts.push(post.toObject())
            }
        }

        return posts
    }
    
    public async getPostById(id: string): Promise<GetPostByIdResult> {
        const postRef = this.collection.doc(id)
        const postSnapshot = await postRef.get()
        const postData = postSnapshot.data()

        if (postSnapshot.exists && postData) {
            const post = Post.create({
                title: postData.title,
                content: postData.content, 
                createdAt: postData.createdAt
            }, postRef.id)

            return post.toObject()
        }

        return null
    }

    public async createPost(props: PostProps): Promise<CreatePostResult> {
        const post = Post.create(props)
        const postRef = this.collection.doc(post.id)
        await postRef.set(post.props)
        const result = { id: post.id, props: post.props }
        return result
    }
}

export {
    CreatePostResult,
    GetPostByIdResult,
    GetAllPostsResult
}
export default PostsRepository