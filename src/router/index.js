/*eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/users',
    name: 'users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "UsersView" */ '../views/users/UsersView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/add-user',
    name: 'add-user',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "AddUserView" */ '../views/users/AddUserView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/manage-users',
    name: '/manage-users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ManageUsersView" */ '../views/users/ManageUsersView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/financial',
    name: 'financial',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "FinancialView" */ '../views/financial/FinancialView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/add-financial',
    name: 'add-financial',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "AddFinancialView" */ '../views/financial/AddFinancialView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/manage-financial-states',
    name: 'manage-financial-states',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ManageFinancialStatesView" */ '../views/financial/ManageFinancialStatesView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/notes',
    name: 'notes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "NotesView" */ '../views/notes/NotesView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/add-notes',
    name: 'add-notes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "AddNotesView" */ '../views/notes/AddNotesView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/manage-notes',
    name: 'manage-notes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ManageNotesView" */ '../views/notes/ManageNotesView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/homeworks',
    name: 'homeworks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "HomeworksView" */ '../views/homeworks/HomeworksView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/add-homework',
    name: 'add-homework',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "AddHomeworkView" */ '../views/homeworks/AddHomeworkView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/manage-homeworks',
    name: 'manage-homeworks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ManageHomeworksView" */ '../views/homeworks/ManageHomeworksView.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
