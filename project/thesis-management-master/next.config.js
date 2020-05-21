module.exports = () => {
  const withCSS = require("@zeit/next-css");
  return withCSS({
      exportPathMap: function() {
          return {
            '/': { page: '/' },
            '/login': {page: '/login'}
          }
      },
      // assetPrefix: '/thesis_management'
  });
}