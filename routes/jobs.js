// import
import express from "express";
const router = express.Router();

// import files from controllers/jobs
import { 
    getAllJobs,
    createJob,
    getSingleJob,
    updateJob,
    deleteJob
} from "../controllers/jobs.js";

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getSingleJob).patch(updateJob).delete(deleteJob);

export {
    router
};