import Vue from 'vue'
import VueRouter from 'vue-router'

const Main =  () => import('views/main/Main')
const Recommend =  () => import('views/main/childComps/recommend/Recommend')
const Singer =  () => import('views/main/childComps/singer/Singer')
const Rank =  () => import('views/main/childComps/rank/Rank')
const Search =  () => import('views/main/childComps/search/Search')
const PlayList = () => import('views/detail/PlayList')
const Artist = () => import('views/detail/Artist')
const User = () => import('views/user/User')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/main'
  },
  {
    path: '/main',
    component: Main,
    children: [
      {
        path: '',
        redirect: 'recommend'
      },
      {
        path: 'recommend',
        component: Recommend,
        meta: { 
          index: 0
        },
      },
      {
        path: 'singer',
        component: Singer,
        meta: { 
          index: 1
        },
      },
      {
        path: 'rank',
        component: Rank,
        meta: { 
          index: 2
        },
      },
      {
        path: 'search',
        component: Search,
        meta: { 
          index: 3
        },
      },
    ]
  },
  {
    path: '/playlist/:playListId',
    component: PlayList,
    meta: { 
      index: 4
    },
  },
  {
    path: '/artist/:artistId',
    component: Artist,
    meta: { 
      index: 5
    },
  },
  {
    path: '/user',
    component: User,
    meta: { 
      index: 6
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
