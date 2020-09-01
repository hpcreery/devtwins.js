import axios from 'axios'
// Create instance called instance
const instance = axios.create({
  baseURL: process.env.BACKEND || `http://localhost:8081`,
  headers: {
    // "content-type": "application/octet-stream",
    // "x-rapidapi-host": "example.com",
    // "x-rapidapi-key": process.env.RAPIDAPI_KEY,
  },
})
export default {
  getTestData: () =>
    instance({
      method: 'GET',
      url: '/test',
    }),

  getPageListOfCategory: (category) =>
    instance({
      method: 'GET',
      url: '/pagelist/' + category,
    }),
  // getProjectPages: () => instance({
  //   method: "GET",
  //   url: "/pagelist/Projects",
  // }),
  getPageInfo: (category, page) =>
    instance({
      method: 'GET',
      url: '/pageinfo/' + category + '/' + page,
    }),

  // postData: () => instance({
  //   method: "POST",
  //   url: "/api",
  //   data: {
  //     item1: "data1",
  //     item2: "item2",
  //   },
  // }),

  getPageContent: (category, page, file) =>
    instance({
      method: 'GET',
      url: '/pagecontent/' + category + '/' + page + '/' + file,
    }),
  getPageList: () =>
    instance({
      method: 'GET',
      url: '/pages/',
    }),
  getPageContentBaseUrl: (category, page) => {
    return instance.defaults.baseURL + '/pagecontent/' + category + '/' + page
  },
}

