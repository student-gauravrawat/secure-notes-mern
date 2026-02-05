import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/error.middleware.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORGIN,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

//? routes import
import userRouter from "./routes/user.route.js"
import todoRouter from "./routes/todo.route.js"

//? routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/notes", todoRouter)

app.use(errorHandler)
export {app}
