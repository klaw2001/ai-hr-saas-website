import Api from "./Api";

export default {
  getJobs: async (queryString = '') => {
    const response = await Api.get(`/jobs${queryString}`);
    return response;
  },
};
