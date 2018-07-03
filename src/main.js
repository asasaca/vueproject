import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Main from './components/Main.vue';
import Login from './components/Login.vue';

import TodoMemo from './components/todo/TodoMemo.vue';

import 'expose-loader?$!expose-loader?jQuery!jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter)

var routes = [
  { path: '/main', component: Main },
  { path: '/login', component: Login },

  { path: '/main/:listName/:index', component: Main },
  // { path: '/main/:listName', component: Main },

  { path: '/main/:listName/:index', component: TodoMemo },
];


var router = new VueRouter({
  mode:'history',
  routes
});


new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
