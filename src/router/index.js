import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Friends from '@/views/Friends.vue'
import Leaderboard from '@/views/Leaderboard.vue'
import MyBooks from '@/views/MyBooks.vue'
import Quizzes from '@/views/Quizzes.vue'
import Profile from '@/views/Profile.vue'
import Books from '@/views/Books.vue'
import BookDetail from '@/views/BookDetail.vue'
import Clubs from '@/views/Clubs.vue'
import CreateClub from '@/views/CreateClub.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/friends',
      name: 'friends',
      component: Friends,
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard,
    },
    {
      path: '/mybooks',
      name: 'mybooks',
      component: MyBooks,
    },
    {
      path: '/quizzes',
      name: 'quizzes',
      component: Quizzes,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/books',
      name: 'books',
      component: Books,
    },
    {
      path: '/clubs',
      name: 'clubs',
      component: Clubs,
    },
    {
      path: '/clubs/create',
      name: 'CreateClub',
      component: CreateClub,
    },
    {
  path: '/clubs/chat/:id',
  name: 'ClubChat',
  component: () => import('@/views/ClubChat.vue'),
},

     {
    path: '/books/:title',
    name: 'BookDetail',
    component: BookDetail,
    props: true, // optional but useful
  },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
