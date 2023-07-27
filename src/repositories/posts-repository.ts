import { firestore } from "firebase-admin"

import Post, { PostProps } from "../entities/post"
import { db } from "../services/firebase"

interface CreatePostResult {
    id: string
    props: PostProps
}

type GetPostResult = {
    id: string
    props: PostProps
} | null

class PostsRepository {
    private collection: firestore.CollectionReference

    constructor() {
        this.collection = db.collection("posts")
    }
    
    public async getPostById(id: string): Promise<GetPostResult> {
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

export default PostsRepository
export { CreatePostResult, GetPostResult }