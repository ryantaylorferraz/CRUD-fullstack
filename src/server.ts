import express, { json } from "express"
import { crudRouter } from "./router"
import cors from 'cors'; 

export const app = express()
app.use(json())
app.use(cors())

app.listen(3000, () => console.log("ola mundo")
)
app.use(crudRouter)