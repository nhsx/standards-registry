const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './styles/mixins')],
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  async redirects() {
    return [
      {
        source: '/current-standards/:path*',
        destination: '/published-standards/:path*',
        permanent: true,
      },
    ];
  },
};
