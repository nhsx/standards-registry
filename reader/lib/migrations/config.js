export default {
  local: {
    ckanUrl: process.env.LOCAL_CKAN_URL,
    ckanToken: process.env.LOCAL_CKAN_API_TOKEN,
  },
  dev: {
    ckanUrl: process.env.DEV_CKAN_URL,
    ckanToken: process.env.DEV_CKAN_API_TOKEN,
  },
  test: {
    ckanUrl: process.env.TEST_CKAN_URL,
    ckanToken: process.env.TEST_CKAN_API_TOKEN,
  },
  prod: {
    ckanUrl: process.env.PROD_CKAN_URL,
    ckanToken: process.env.PROD_CKAN_API_TOKEN,
  },
};
