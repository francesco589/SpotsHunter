import express from "express";
import cors from "cors";
import router from "./routers/router.js";



const port = 8001
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())
app.use(cors())

app.use('/', router)

app.listen(port, () => console.log(`server is running on port ${port}`) )
