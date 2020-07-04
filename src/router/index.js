import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push(location) { 
  return originalPush.call(this, location).catch(err => err) 
}
const homepages=()=>import('../components/homepages')
const mine=()=>import('../components/mine')
const kinds=()=>import('../components/kinds')
const home=()=>import('../components/home')
const shopcar=()=>import('../components/shopcar')
const detail=()=>import('../components/detail')
  const routes = [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/homepages',
      name: 'homepages',
      component: homepages,
      children:[
        {
          path: '/home',
          name: 'home',
          component: home,
        },
        {
          path: '/shopcar',
          name: 'shopcar',
          component: shopcar,
        },
        {
          path: '/kinds',
          name: 'kinds',
          component: kinds,
        },
        {
          path: '/mine',
          name: 'mine',
          component: mine,
        },
      ]
    },
    {
      path: '/detail',
      name:'detail',
      component: detail,
    },
  ]

const router = new VueRouter({
  routes
})

export default router
