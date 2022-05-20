// https://github.com/vercel/next.js/discussions/35478
// Putting this here so that JEST gets to use babel, whilst nextjs can use SWC
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
