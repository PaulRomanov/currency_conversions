import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ConvertPage from '@/views/ConvertPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/convert',
      name: 'Convert',
      component: ConvertPage,
    },
  ],
});

export default router;
