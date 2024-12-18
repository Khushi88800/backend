import { config } from "dotenv";
import express from "express";
import databaseconnect from "./config/db.js";
import router from "./router/user.router.js";
import morgan from "morgan";
import cors from "cors"

config()
const app = express();
app.use(express.json());
app.use(morgan('dev'))
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
    })
);
app.use("/api/v1/user", router)
const PORT = process.env.PORT || 8080;
app.get('/ping', (_req, res) => {
    res.send('Pong')
})

app.listen(PORT, async () => {
    await databaseconnect();
    console.log(`app is running ar http://localhost:${PORT}`)
})