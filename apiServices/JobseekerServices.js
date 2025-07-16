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

    getJobseekerAppliedJobs: async () => {
        const response = await Api.get("/jobseeker/applied-jobs");
        return response;
    },

    generateResume: async (payload) => {
        const response = await Api.post("/jobseeker/profile/generate-resume", payload);
        return response;
    },

    downloadResume: async (payload) => {
        const response = await Api.post("/jobseeker/profile/download-resume", payload);
        return response;
    },

    updateResumeSection: async (payload) => {
        const response = await Api.post("/jobseeker/profile/update-resume-section", payload);
        return response;
    },

    scoreResume: async (payload) => {
        const response = await Api.post("/jobseeker/profile/score-resume", payload);
        return response;
    },
};
