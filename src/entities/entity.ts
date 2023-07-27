import crypto from "node:crypto"

abstract class Entity<T> {
    protected _id: string
    public props: T

    public get id() {
        return this._id
    }

    public constructor(props: T, id?: string) {
        this.props = props
        this._id = id ?? crypto.randomUUID()
    }

    public toObject() {
        return {
            id: this.id,
            props: this.props
        }
    }
}

export default Entity