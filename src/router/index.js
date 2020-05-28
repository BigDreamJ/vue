import Vue from 'vue'
import Router from 'vue-router'
//使用懒加载的方式来引入,只有路由被访问的时候才加载
import home from '@/views/home/home'
import newBlog from '@/views/home/newBlog'
import edit from '@/views/home/edit'
import show from '@/views/home/show'
import amap from '@/views/home/amap'
const indexpage = resolve => require(['@/views/home/index'],resolve)

Vue.use(Router)
let router =  new Router({
  routes: [
    {
      path:'/',
      name :'index',
      meta:{index:1,title: '主页'},
      component:indexpage
    },
    {
      path:'/index',
      name :'index',
      meta:{index:1,title: '主页'},
      component:indexpage
    },
    {
      path:'/newBlog',
      name :'newBlog',
      component:newBlog
    },
    {
      path:'/edit',
      name :'edit',
      component:edit
    },
    {
      path:'/show',
      name :'show',
      component:show
    },
    {
      path:'/map',
      name :'map',
      component:amap
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

//对每次访问之前都要先看是否已经登录
router.beforeEach((to,from,next)=>{
  if(to.path.startsWith('/')){
    window.sessionStorage.removeItem('access-token');
    next();
  }else{
    let token = window.sessionStorage.getItem('access-token');
    if(!token){
      //未登录  跳回主页面
      next({path:'/'});
    }else{
      next();
    }
  }

});


export default router
