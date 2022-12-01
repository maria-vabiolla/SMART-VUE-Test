import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// layouts
import User from '@/components/layouts/full-layout-user/Layout.vue';

// views without layouts
import LandingPage from '@/views/Landing.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/user',
    component: User,
    children: [
      {
        path: '/user/index',
        component: () =>
          import(/* webpackChunkName: "managerIndex" */ '@/views/Index.vue'),
      },
    ],
  },
  {
    path: '/',
    component: LandingPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
