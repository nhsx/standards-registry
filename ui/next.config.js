const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './styles/mixins')],
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  env: {
    NEXT_PUBLIC_TRACKING_ID: process.env.NEXT_PUBLIC_TRACKING_ID,
    NEXT_PUBLIC_TAG_ID: process.env.NEXT_PUBLIC_TAG_ID,
  },
};
