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
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "Log" */ '../views/Log/index.vue'),
      },
      {
        path: 'medicine/:id',
        name: 'MedicineDetail',
        component: () => import(/* webpackChunkName: "MedicineDetail" */ '../views/MedicineDetail/index.vue'),
      },
      {
        path: 'reset/password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword/index.vue'),
      },
      {
        path: 'invite-code',
        name: 'InviteCode',
        component: () => import(/* webpackChunkName: "InviteCode" */ '../views/InviteCode/index.vue'),
      },
      {
        path: 'article-classify',
        name: 'ArticleClassify',
        component: () => import(/* webpackChunkName: "ArticleClassify" */ '../views/ArticleClassify/index.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile/index.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/index.vue'),
      },
    ]
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


router.beforeEach(async (to,from,next)=>{
  if(to.path === '/auth'){
    next();
    return;
  }
  if(!store.state.characterInfo.length){
    await store.dispatch('getCharacterInfo');
  }

  const reqArr = [];

  if(!store.state.userInfo.account){
    reqArr.push(store.dispatch('getUserInfo'));
 }

  if(!store.state.articleClassify.length){
    reqArr.push(store.dispatch('getArticleClassify'));
  }
 
 await Promise.all(reqArr);

  next();
});

export default router;
