import Api from "./Api";

export default {
    shortlistJob: async (payload) => {
        const response = await Api.post("/jobseeker/shortlist", payload);
        return response;
    },
    getJobseekerProfile: async () => {
        const response = await Api.get("/jobseeker/profile");
        return response;
    },
    updateJobseekerProfile: async (payload) => {
        const response = await Api.post("/jobseeker/profile/upsert", payload);
        return response;
    },

    getJobseekerShortlistedJobs: async () => {
        const response = await Api.get("/jobseeker/shortlisted");
        return response;
    },
};
