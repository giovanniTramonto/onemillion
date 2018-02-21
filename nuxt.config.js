module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'SASCHA HUNDORFF',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
      { name: 'description', content: 'SASCHA HUNDORFF – OneMillionDollarBook' },
      { name: 'author', content: 'SASCHA HUNDORFF' },
      { name: 'publisher', content: 'SASCHA HUNDORFF' },
      { name: 'language', content: 'de' },
      { name: 'company', content: 'onemilliondollarbook.com' },
      { name: 'page-topic', content: 'onemilliondollarbook' },
      { name: 'keywords', content: 'million dollar, Sascha Hundorff, book, photography, contemporary art, german, publishing' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['> 5%']
      })
    ],
    publicPath: 'onemillion/'
  },
  css: [
    '@/assets/scss/styles.scss'
  ],
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ]
}
