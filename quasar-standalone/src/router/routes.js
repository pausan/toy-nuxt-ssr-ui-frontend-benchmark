const routes = [
  {
    path: '/',
    component: () => import('layouts/empty.vue'),
    children: [
      { path: 'login', component: () => import('pages/login.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
