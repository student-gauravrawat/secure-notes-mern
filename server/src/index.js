import {app} from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./db/database.js"

dotenv.config({
    path: './.env'
})

const port = process.env.PORT

connectDB()
.then(()=>{
   app.listen(port, ()=>{
       console.log(`Server is running at port : ${port}`)
   })
}).catch((error)=>{
   console.log("MongoDB Connection Failed !!! ")
})