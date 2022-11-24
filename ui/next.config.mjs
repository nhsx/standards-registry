import path from 'path';
import { SubresourceIntegrityPlugin } from 'webpack-subresource-integrity';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// TODO:
// * find out how to push SubresourceIntegrityPlugin props to app
// * can we wrap script resources at the webpack level?

const nextConfig = (phase, { defaultConfig }) => {
  // console.log(phase, defaultConfig);
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
    webpack(config) {
      config.output.crossOriginLoading = 'anonymous';
      config.plugins.push(
        new SubresourceIntegrityPlugin({
          hashFuncNames: ['sha384', 'sha512'],
          enabled: true,
        })
      );
      console.log('iam now the config', config);
      return config;
    },
  };
};

export default nextConfig;
