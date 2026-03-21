import {app} from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./db/database.js"

dotenv.config()

const port = process.env.PORT || 5000;

connectDB()
.then(()=>{
   app.listen(port, ()=>{
       console.log(`Server is running at port : ${port}`)
   })
}).catch((error)=>{
   console.log("MongoDB Connection Failed !!! ")
})