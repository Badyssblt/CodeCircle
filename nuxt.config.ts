// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    'dayjs-nuxt',
    "nuxt-tiptap-editor"
  ],
  css: ["~/assets/style.css"],
  plugins: [
    "~/plugins/pinia.js"
  ],
  dayjs: {
    locales: ['fr']
  },
  tiptap: {
    prefix: 'Tiptap'
  }
})