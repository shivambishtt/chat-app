import cors from "cors"
import "dotenv/config"
import express from "express"


const app = express()
app.use(express.json())
app.use(cors({ origin: "*" }))

const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.json({ message: "Server is running " })
})

app.listen(PORT, () => {
    console.log(`Server is running at http:localhost:/${PORT}`)
})