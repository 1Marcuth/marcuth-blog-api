import dotenv from "dotenv"

dotenv.config()

const settings = {
    port: Number(process.env.PORT ?? 3000),
    host: process.env.HOST ?? "0.0.0.0"
}

export default settings