import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        name: 'Home',
        path: '/home',
        component: ()=> import('@/pages/Home'),
    },
    {
        name: 'Post',
        path: '/post',
        component: ()=> import('@/pages/Post'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,

})

export default router;