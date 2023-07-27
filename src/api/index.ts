import express from "express"
import http from "http"

import postsRouter from "./routers/post"
import settings from "./settings"

class App {
    private app: express.Application
    private server?: http.Server

    public constructor() {
        this.app = express()
        this.useMiddlewares()
        this.useRouters()
    }

    private useMiddlewares() {
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())
    }

    private useRouters() {
        this.app.use("/posts", postsRouter)
    }

    public start() {
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(settings.port, settings.host, () => {
                console.log(`> [app] Server listening on http://${settings.host}:${settings.port}/`)
                return resolve(null)
            })
        })
    }

    public stop() {
        return new Promise((resolve, reject) => {
            if (!this.server) return reject("Server has not started yet!")

            this.server.close((error) => {
                if (error) return reject(error)
                console.log("> [app] Server stopped as successful!")
                return resolve(null)
            })
        })
    }
}

export default App