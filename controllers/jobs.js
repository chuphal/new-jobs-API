const getAllJobs = async (req, res) => {
    res.send("get all jobs");
} 
const createJob = async (req, res) => {
    res.send("create job");
} 
const getSingleJob = async (req, res) => {
    res.send("get Single job");
} 
const updateJob = async (req, res) => {
    res.send("update job");
} 
const deleteJob = async (req, res) => {
    res.send("delete job");
} 

export {
    getAllJobs,
    createJob,
    getSingleJob,
    updateJob,
    deleteJob
};