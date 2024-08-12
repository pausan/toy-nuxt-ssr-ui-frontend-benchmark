import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  // devtools: { enabled: true }
  ssr: true,
  css: [
    'primeicons/primeicons.css'
  ],
  modules: ['@primevue/nuxt-module', "@nuxtjs/tailwindcss"],
  primevue: {
    usePrimeVue: true,
    autoImport: true,
    options: {
        theme: {
            preset: Aura
        }
    }
  }
})