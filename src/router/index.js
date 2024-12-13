import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'home',
    descName: '优势才干解读',
    icon: 'el-icon-s-cooperation',
    component: HomeView,
    auth: [],
  },
  {
    path: '/about',
    name: 'about',
    descName: '关于我们助教',
    icon: 'el-icon-user-solid',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    auth: ['admin'],
  },
  {
    path: '/class',
    name: 'class',
    descName: '初级教练班',
    icon: 'el-icon-s-grid',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ClassView.vue'),
    auth: ['admin'],
  },
  {
    path: '/personal',
    name: 'personal',
    descName: '个人报告',
    icon: 'el-icon-s-order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonalView.vue'),
    auth: ['admin'],
  },
  {
    path: '/team',
    name: 'team',
    descName: '团队分析',
    icon: 'el-icon-s-order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamView.vue'),
    auth: ['admin'],
  },
  {
    path: '/test',
    name: 'test',
    descName: '功能测试',
    icon: 'el-icon-s-tools',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TestView.vue'),
    auth: ['admin'],
  },
].filter((item) => {
  if (item.auth.includes('admin')) {
    return localStorage.getItem('role') === 'admingallup';
  }
  return true;
});

console.log(routes, 'routes');

const router = new VueRouter({
  routes,
});

export default router;
