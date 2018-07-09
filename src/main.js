import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';

import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';

import 'common/stylus/index.styl';

// 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
Vue.use(VueRouter);
// 注册vue-resource
Vue.use(VueResource);

// extend创建的是一个组件构造器，而不是一个具体的组件实例。
// 路由器需要一个根组件
let app = Vue.extend(App);

// 创建一个路由器实例
let router = new VueRouter({
  linkActiveClass: 'active'
});

// 定义路由规则
router.map({
  '/goods': {
    component: goods
  }
});

router.map({
  '/ratings': {
    component: ratings
  }
});

router.map({
  '/seller': {
    component: seller
  }
});

// 路由器会创建一个app实例,并且挂载到#app元素上
router.start(app, '#app');

// 指定首次加载页面
router.go('/goods');
