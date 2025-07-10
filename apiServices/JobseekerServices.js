import Api from "./Api";

export default {
    shortlistJob: async (payload) => {
        const response = await Api.post("/jobseeker/shortlist", payload);
        return response;
    },
};
