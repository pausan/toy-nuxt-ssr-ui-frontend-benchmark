// import this after install `@mdi/font` package
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,

    icons: {
      defaultSet: 'mdi',
   /*   aliases,
      sets: {
        mdi,
      },*/
    },
  })
  app.vueApp.use(vuetify)
})