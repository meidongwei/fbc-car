import Vue from 'vue'
import Router from 'vue-router'
import fenpeiPage from '@/pages/fenpei'
import jiansuoPage from '@/pages/jiansuo'
import pingguPage from '@/pages/pinggu'
import caiwuPage from '@/pages/caiwu'
import shipinPage from '@/pages/shipin'
import suochePage from '@/pages/suoche'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: fenpeiPage
    },
    {
      path: '/fenpei',
      component: fenpeiPage
    },
    {
      path: '/jiansuo',
      component: jiansuoPage
    },
    {
      path: '/pinggu',
      component: pingguPage
    },
    {
      path: '/caiwu',
      component: caiwuPage
    },
    {
      path: '/shipin',
      component: shipinPage
    },
    {
      path: '/suoche',
      component: suochePage
    }
  ]
})
