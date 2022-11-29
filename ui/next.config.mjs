import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// TODO:
// * find out how to push SubresourceIntegrityPlugin props to app
// * can we wrap script resources at the webpack level?

const nextConfig = () => {
  return {
    reactStrictMode: true,
    sassOptions: {
      includePaths: [path.join(path.dirname(__filename), './styles/mixins')],
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
};

export default nextConfig;
