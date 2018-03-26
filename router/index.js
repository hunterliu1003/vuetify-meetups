import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import { store } from '../store'
const meta = require('./meta.json')

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBrMrSeFfaeRfPXVXlPhR11J2b1zZxhhPc',
    authDomain: 'ht-storybook.firebaseapp.com',
    databaseURL: 'https://ht-storybook.firebaseio.com',
    projectId: 'ht-storybook',
    storageBucket: 'gs://ht-storybook.appspot.com'
  });
}

function route (path, view, obj) {
  return {
    path: path,
    meta: meta[path],
    component: resolve => import(`pages/${view}.vue`).then(resolve),
    ...obj
  }
}

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    base: __dirname,
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      route('/', 'Home'),
      route('/meetups/:id', 'Meetup/Meetup', { props: true }),
      route('/meetups', 'Meetup/Meetups'),
      route('/meetup/new', 'Meetup/CreateMeetup', { meta: {requiresAuth: true}}),
      route('/profile', 'User/Profile', { meta: {requiresAuth: true}}),
      route('/signin', 'User/Signin'),
      route('/signup', 'User/Signup'),
      // Global redirect for 404
      { path: '*', redirect: '/' }
    ]
  })

  // Send a pageview to Google Analytics
  router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (to.matched.some(record => record.meta.requiresAuth)) {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            next('signin')
        } else {
            next()
        }
      })
    } else {
      next()
    }
  })

  return router
}