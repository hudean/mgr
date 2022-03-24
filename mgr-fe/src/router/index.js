import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    children:[
      {
        path: 'doctor',
        name: 'Doctor',
        component: () => import(/* webpackChunkName: "Doctor" */ '../views/Doctor/index.vue'),
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import(/* webpackChunkName: "Article" */ '../views/Article/index.vue'),
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import(/* webpackChunkName: "Feedback" */ '../views/Feedback/index.vue'),
      },
      {
        path: 'consult',
        name: 'Consult',
        component: () => import(/* webpackChunkName: "Consult" */ '../views/Consult/index.vue'),
      },
      {
        path: 'medicine',
        name: 'Medicine',
        component: () => import(/* webpackChunkName: "Medicine" */ '../views/Medicine/index.vue'),
      },
      {
        path: 'medicine/:id',
        name: 'MedicineDetail',
        component: () => import(/* webpackChunkName: "MedicineDetail" */ '../views/MedicineDetail/index.vue'),
      },
    ]
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
