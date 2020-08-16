import axios from "axios";
// Create instance called instance
const instance = axios.create({
  baseURL: process.env.BACKEND || `http://localhost:8081`,
  headers: {
    // "content-type": "application/octet-stream",
    // "x-rapidapi-host": "example.com",
    // "x-rapidapi-key": process.env.RAPIDAPI_KEY,
  },
});
export default {
  getTestData: () => instance({
    method: "GET",
    url: "/test",
  }),

  getPhotoPages: () => instance({
    method: "GET",
    url: "/pagelist/Photos",
  }),
  getProjectPages: () => instance({
    method: "GET",
    url: "/pagelist/Projects",
  }),

  // postData: () => instance({
  //   method: "POST",
  //   url: "/api",
  //   data: {
  //     item1: "data1",
  //     item2: "item2",
  //   },
  // }),

  getPageContent: (page, file) => instance({
    method: "GET",
    url: "/pagecontent/Projects/" + page + "/" + file,
  }),
};
