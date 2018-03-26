import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.css'
import '../stylus/main.styl'
import App from './App.vue'
import firebase from 'firebase'
import Components from 'components/_index'
import DateFilter from '../filters/date'

import { store } from 'store/index'
import { createRouter } from 'router/index'
import { sync } from 'vuex-router-sync'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDNIZrN4eWKmIHRDZz4ukCzalTGVQoe_Jc",
    authDomain: "vuetify-meetups.firebaseapp.com",
    databaseURL: "https://vuetify-meetups.firebaseio.com",
    projectId: "vuetify-meetups",
    storageBucket: "vuetify-meetups.appspot.com"
  });
}

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken2,
    accent: colors.red.accent2,
    secondary: colors.grey.lighten1,
    info: colors.blue.lighten1,
    warning: colors.amber.darken2,
    error: colors.red.accent4,
    success: colors.green.lighten2
  },
  options: {
    // minifyTheme: function () {
    //   return process.env.NODE_ENV === 'production'
    //     ? val.replace(/[\s|\r\n|\r|\n]/g, '')
    //     : null
    // },
    // themeVariations: ['primary', 'secondary', 'success']
  }
})

Vue.filter('date', DateFilter)

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

export function createApp (ssrContext) {
  const router = createRouter()
  sync(store, router)

  const app = new Vue({
    router,
    store,
    ssrContext,
    render: h => h(App),
    beforeCreate () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.$store.dispatch('autoSignIn', user)
        }
      })
      this.$store.dispatch('loadMeetups')
    }
  })

  return { app, router, store }
}
