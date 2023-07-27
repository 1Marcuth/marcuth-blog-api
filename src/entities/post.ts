import Entity from "./entity"

type PostProps = {
    title: string
    content: string
    createdAt?: number
}

class Post extends Entity<PostProps> {
    private constructor(props: PostProps, id?: string) {
        super(props, id)
    }

    public static create(props: PostProps, id?: string) {
        const post = new Post({
            ...props,
            createdAt: props.createdAt ?? Date.now()
        }, id)

        return post
    }
}

export { PostProps }
export default Post