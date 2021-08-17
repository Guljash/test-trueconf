import Vue from 'vue'
import VueRouter from 'vue-router'
import light from '.././components/light'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/red',
      component: light,
      props: { color:'red', ptime: 10}
    },
    {
      path: '/yellow',
      component: light,
      props: { color:'yellow', ptime: 3}
    },
    {
      path: '/green',
      component: light,
      props: { color:'green', ptime: 15}
    }
  ]
})
