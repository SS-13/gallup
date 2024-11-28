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
  },
];

const router = new VueRouter({
  routes,
});

export default router;
