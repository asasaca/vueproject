<template>
  <div id="app">
    <!-- <div class="menu">
      <router-link to="/login">Login</router-link>
      <router-link to="/main">Main</router-link>
    </div> -->

    <div id="container">
       <div id="header">
         <ul>
           <li>
            <router-link to="/login">Login</router-link>
           </li>
           <li>
            <router-link to="/main">Main</router-link>
           </li>
         </ul>
       </div>
       <div class="todoBody"><router-view></router-view></div>
     </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      listName : '',
      index : '',
    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style>
  div {
    /* background-color: #DAE9E4; */
  }
  a:-webkit-any-link {
    color: blue;
    cursor: pointer;
    text-decoration: none;
  }


</style>
