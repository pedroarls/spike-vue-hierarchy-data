import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/VueEcharts.vue') }, 
      { path: '/quasarTree', component: () => import('pages/IndexPage.vue') },
      { path: '/vueOrgChart', component: () => import('pages/VueOrgChart.vue') },
      { path: '/vOrgTree', component: () => import('pages/VOrgTree.vue') }    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
