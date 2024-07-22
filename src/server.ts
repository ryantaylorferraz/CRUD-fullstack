import express, { json } from "express"
import { crudRouter } from "./router"

export const app = express()
app.use(json())

app.get("/health", (req, res) => {
    return res.json("ola rapeize")
})

app.listen(3000, () => console.log("ola mundo")
)
app.use(crudRouter)