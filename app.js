// .env file
import dotenv from "dotenv";
dotenv.config();

// main imports
import express from "express";
const app = express();

// import db and connect
import { connectDB } from "./db/connect.js";

//error handler middlewares and files import

// import routers
import { router as authRouter } from "./routes/auth.js";
import { router as jobsRouter } from "./routes/jobs.js";

// middlewares
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

// routes
app.get("/", (req, res) => {
    res.send("jobs-api")
});

// custom errors

// db
const port = process.env.PORT || 3000;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }

}
start();