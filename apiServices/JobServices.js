import Api from "./Api";

export default {
  getJobs: async (params) => {
    const response = await Api.get("/jobs", { params });
    return response;
  },
};
