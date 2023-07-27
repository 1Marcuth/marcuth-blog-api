import admin from "firebase-admin"
import dotenv from "dotenv"

dotenv.config()

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
const app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

const db = app.firestore()

export { db }