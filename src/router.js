// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Grid from './components/GridTable2.vue';

const routes = [
  {
    path: '/Grid',
    name: 'Grid',
    component: Grid,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
