<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" placeholder="Type what you have to do" v-on:keyup.enter="addTodo">
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn fa fa-plus" aria-hidden="true"></i>
    </span>
  </div>
</template>

<script>

export default {
  data() {
    return {
      newTodoItem:'',
      category:'',
    }
  },
  methods: {
    addTodo(){
      if(this.newTodoItem!==""){
        var todoItem = this.newTodoItem && this.newTodoItem.trim();
        this.$emit('addTodo', todoItem);
        this.clearInput();
      }
    },
    clearInput(){
      this.newTodoItem="";
    }
  },
  components: {

  }
}
</script>

<style scoped>
input {
    /* border-style: groove; */
    /* width: 200px; */
    line-height: normal !important;
  }
input:focus {
outline: none;
}
.inputBox {
background: white;
height: 50px;
line-height: 50px;
border-radius: 5px;
}
.inputBox input {
border-style: none;
font-size: 0.9rem;
}
.addContainer {
float: right;
background: linear-gradient(to right, #6478FB, #8763FB);
display: inline-block;
width: 3rem;
border-radius: 0 5px 5px 0;
}
.addBtn {
color: white;
vertical-align: middle;
}
</style>
