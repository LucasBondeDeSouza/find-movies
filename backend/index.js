import "dotenv/config"
import express from "express"
import UserRoutes from "./domains/users/routes.js"
import MyListRoutes from "./domains/my-list/routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
const { PORT } = process.env

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://find-movies-zeta.vercel.app", // "http://localhost:5173",
    credentials: true,
}))
app.use("/users", UserRoutes)
app.use("/my-list", MyListRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})