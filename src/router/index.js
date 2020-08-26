/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import ForgotPassword from '../components/ForgotPassword.vue';

Vue.use(VueRouter);

const routes = [
  { path: '*', redirect: '/' },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'welcome',
    component: Login
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword
  },
  {
     path: '/home',
     name: 'home',
     component: Home
  },
  {
    path: '/createcompany',
    name: 'createcompany',
    component: () => import('../components/companies/CreateComponent.vue'),
    meta: {
                requiresAuth: true
            }
  },
  {
    path: '/viewcompany',
    name: 'viewcompany',
    component: () => import('../components/companies/ListComponent.vue'),
    meta: {
                requiresAuth: true
            }
  },

  {
    path: '/viewvisitors',
    name: 'viewvisitors',
    component: () => import('../components/visitors/ListComponent.vue')
  },

  {
    path: '/createvisitor',
    name: 'createvisitor',
    component: () => import('../components/visitors/CreateComponent.vue')
  },

  {
    path: '/viewquestions',
    name: 'viewquestions',
    component: () => import('../components/questions/ListComponent.vue')
  },
  {
    path: '/createquestion',
    name: 'createquestion',
    component: () => import('../components/questions/CreateComponent.vue')
  },

  {
    path: '/viewexams',
    name: 'viewexams',
    component: () => import('../components/exams/ListComponent.vue'),
    meta: {
                requiresAuth: true
            }
  },

  {
    path: '/createexam',
    name: 'createexam',
    component: () => import('../components/exams/CreateComponent.vue')
},

  {
    path: '/editcompany/:id',
    name: 'editcompany',
    component: () => import('../components/companies/EditComponent'),
    meta: {
                requiresAuth: true
            }
  },
  {
    path: '/list-questions',
    name: 'list-questions',
    component: () => import('../components/questions/ListComponent.vue'),
    meta: {
                requiresAuth: true
            }
  }
];

const router = new VueRouter({
  mode:'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login','/signup','/forgot-password'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router
