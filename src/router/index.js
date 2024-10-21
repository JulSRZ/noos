/*eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../common/hooks/auth';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "LoginView" */ '../views/auth/LoginView.vue'),
  },
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "DashboardView" */ '../views/dashboard/DashboardView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "UsersView" */ '../views/users/UsersView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/add-user',
    name: 'add-user',
    component: () => import(/* webpackChunkName: "AddUserView" */ '../views/users/AddUserView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage-users',
    name: '/manage-users',
    component: () => import(/* webpackChunkName: "ManageUsersView" */ '../views/users/ManageUsersView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/financial',
    name: 'financial',
    component: () => import(/* webpackChunkName: "FinancialView" */ '../views/financial/FinancialView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/add-financial',
    name: 'add-financial',
    component: () => import(/* webpackChunkName: "AddFinancialView" */ '../views/financial/AddFinancialView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage-financial-states',
    name: 'manage-financial-states',
    component: () => import(/* webpackChunkName: "ManageFinancialStatesView" */ '../views/financial/ManageFinancialStatesView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import(/* webpackChunkName: "NotesView" */ '../views/notes/NotesView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/add-notes',
    name: 'add-notes',
    component: () => import(/* webpackChunkName: "AddNotesView" */ '../views/notes/AddNotesView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/manage-notes',
    name: 'manage-notes',
    component: () => import(/* webpackChunkName: "ManageNotesView" */ '../views/notes/ManageNotesView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/homeworks',
    name: 'homeworks',
    component: () => import(/* webpackChunkName: "HomeworksView" */ '../views/homeworks/HomeworksView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/add-homework',
    name: 'add-homework',
    component: () => import(/* webpackChunkName: "AddHomeworkView" */ '../views/homeworks/AddHomeworkView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/manage-homeworks',
    name: 'manage-homeworks',
    component: () => import(/* webpackChunkName: "ManageHomeworksView" */ '../views/homeworks/ManageHomeworksView.vue'),
    meta: {
      requiresAuth: true
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userAuthenticated = await isAuthenticated();

  if (requiresAuth && !userAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && userAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
