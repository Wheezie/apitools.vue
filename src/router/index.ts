import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import ForgotPassword from '@/views/auth/ForgotPassword.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },

  {
    path: '/login',
    name: 'apiLogin',
    component: Login
  },
  {
    path: '/register',
    name: 'apiRegister',
    component: Register
  },
  {
    path: '/forgotPassword',
    name: 'apiForgotPassword',
    component: ForgotPassword
  },

  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/Index.vue'),
    children: [
      {
        path: '',
        name: 'apiAdminDashboard',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/Dashboard.vue')
      },

      {
        path: 'albums',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/albums/Index.vue'),
        children: [
          {
            path: '',
            name: 'apiAdminBlogsList',
            component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/albums/List.vue')
          },
          {
            path: ':albumId',
            name: 'apiAdminBlogsAlbum',
            component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/albums/Album.vue')
          },
        ]
      },

      {
        path: 'blogs',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/blogs/Index.vue'),
        children: [
          {
            path: '',
            name: 'apiAdminBlogsList',
            component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/blogs/List.vue')
          },
          {
            path: ':blogId',
            name: 'apiAdminBlogsBlog',
            component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/blogs/Blog.vue')
          },
          {
            path: ':blogId/:postId',
            name: 'apiAdminBlogsPost',
            component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/blogs/Post.vue')
          }
        ]
      },

      // Administrative roles
      {
        path: 'users',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/users/Index.vue'),
        children: [
          {
            path: '',
            name: 'apiAdminUsersList',
            component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/users/List.vue')
          },
          {
            path: ':userId',
            name: 'apiAdminUsersUser',
            component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/users/User.vue')
          }
        ]
      },
      {
        path: 'roles',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/roles/List.vue'),
        children: [
          {
            path: '',
            name: 'apiAdminRolesList',
            component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/roles/List.vue'),
          },
          {
            path: ':roleId',
            name: 'apiAdminRolesRole',
            component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/roles/Role.vue'),
          }
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Authentication guard
// router.beforeEach((to, from, next) => {

// });

export default router
