import axios from 'axios'
// Create instance called instance
const instance = axios.create({
  baseURL: process.env.BACKEND || `http://localhost:8081`,
  headers: {},
})
export default {
  getTestData: () =>
    instance({
      method: 'GET',
      url: '/test',
    }),

  getSiteMap: () =>
    instance({
      method: 'GET',
      url: '/sitemap/',
    }),

  getCategoryList: () =>
    instance({
      method: 'GET',
      url: '/categorylist/',
    }),

  getPageListOfCategory: (category) =>
    instance({
      method: 'GET',
      url: '/pagelist/' + category,
    }),

  getPageInfo: (category, page) =>
    instance({
      method: 'GET',
      url: '/pageinfo/' + category + '/' + page,
    }),

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

