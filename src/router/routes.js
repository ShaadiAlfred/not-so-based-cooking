
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'recipe/new',
        name: 'add_recipe',
        component: () => import('pages/AddRecipe.vue'),
      },
      {
        path: 'recipe/:slug',
        name: 'recipe',
        component: () => import('pages/Recipe.vue'),
      },
    ]
  },

  {
    path: '/404',
    name: 'not_found',
    component: () => import('pages/Error404.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  }
]

export default routes
