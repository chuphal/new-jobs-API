// .env file
import dotenv from "dotenv";
dotenv.config();

// main imports
import express from "express";
const app = express();

// import db and connect

//error handler middlewares and files import

// import routers

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.send("jobs-api")
});

// custom errors

// db
const port = process.env.PORT || 3000;

const start = async () => {
    try{
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }

}
start();