// .env file
import dotenv from "dotenv";
dotenv.config();

// main imports
import express from "express";
import async_errors from "express-async-errors";
const app = express();

// security pkgs.
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

//swagger import
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./swagger-docs.yaml");

// import db and connect
import { connectDB } from "./db/connect.js";

//error handler middlewares and files import
import { auth as authenticate } from "./middlewares/authentication.js"

// import routers
import { router as authRouter } from "./routes/auth.js";
import { router as jobsRouter } from "./routes/jobs.js";
import { notFoundMiddleware } from "./middlewares/not-found.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js"

// middlewares
app.use(express.json());

// security middlewares.
app.set("trust proxy", 1);
app.use(
    rateLimiter({
        windowMs: 15*60*1000, // 15 min.
        max: 100
    })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
  });
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticate, jobsRouter);


// custom errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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