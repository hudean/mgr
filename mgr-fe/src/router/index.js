import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';


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
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */ '../views/Users/index.vue'),
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


router.beforeEach(async (to,from,next)=>{
  if(!store.state.characterInfo.length){
      store.dispatch('getCharacterInfo');
  }

  store.dispatch('getUserInfo');
  next();
});

export default router;
