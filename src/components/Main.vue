<template>
  <div>
    <h1>{{ msg }} / {{$route.params.listName}} List</h1>

    <div id="left">
      <TodoHeader v-bind:propsdata="localList" v-on:selectList="selectList" v-on:addList="addList"></TodoHeader>
    </div>

    <div id="content">
        <TodoInput v-on:addTodo="addTodo"></TodoInput>
        <TodoList v-bind:propsdata="todoItems" @removeTodo="removeTodo" @selectedTodo="selectedTodo" @checkTodo="checkTodo"></TodoList>
    </div>
    <div id="right" v-bind:style="{ display: display}">
        <TodoMemo v-bind:propsdata="todoItems" v-on:updateMemo="updateMemo"></TodoMemo>
    </div>

    <div id="footer">
        <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
    </div>

  </div>
</template>

<script>

import TodoHeader from './todo/TodoHeader.vue'
import TodoInput from './todo/TodoInput.vue'
import TodoList from './todo/TodoList.vue'
import TodoMemo from './todo/TodoMemo.vue'
import TodoFooter from './todo/TodoFooter.vue'

export default {
  data() {
      return {
          msg: 'Main vue!',
          todoItems: JSON.parse(window.localStorage.getItem('todoItems')),
          localList : JSON.parse(window.localStorage.getItem('List')),
          listName : '',
          itemIdx : '',
          display: 'none',

      }
  },
  computed: {

  },
  watch: {
    '$route' (to, from) {

      this.listName = to.params.listName;
      if(this.$route.params.listName==undefined){
        this.$route.params.listName = this.localList[0].List;
      }

      if(this.listName==undefined){
        this.listName="ALL";
      }

      var index = this.$route.params.index && this.$route.params.index.trim();
      var listName = this.$route.params.listName && this.$route.params.listName.trim();

      if((this.todoItems[index]==null)||(this.todoItems[index].category!=listName)){
        console.log("error : 예외처리 필요3");
        this.display = 'none';
      }else{
        if((index==undefined)||(index=='')){
          this.display = 'none';
        }else{
          this.display = 'block';
          this.memo=this.todoItems[this.$route.params.index].memo;
        }
      }

    }
  },
  created(){

    if(this.listName==undefined){
      this.listName="ALL";
    }

    if(this.localList==null){
      this.localList=[];
      this.localList.push({"List":"ALL","ListUUID":"733b85a4-bba1-49da-8078-2a815408899f"});
      localStorage.setItem('List', JSON.stringify(this.localList));
    }

    if(this.$route.params.listName==undefined){
      this.$route.params.listName =this.localList[0].List;
    }

    if(this.todoItems==null){
      this.todoItems=[];
    }

    var index = this.$route.params.index && this.$route.params.index.trim();
    var listName = this.$route.params.listName && this.$route.params.listName.trim();

    if((this.todoItems[index]==null)||(this.todoItems[index].category!=listName)){
      console.log("error : list와 index가 맞는 item 이 없을때");
      this.display = 'none';

    }else{
      if((this.$route.params.index==undefined)||(this.$route.params.index=='')){
        this.display = 'none';
      }else{
        if(this.todoItems[this.$route.params.index]==undefined){
          this.display = 'none';
          console.log("error : 예외처리 필요1");

        }else{
          this.display = 'block';
          // this.memo=this.todoItems[this.$route.params.index].memo;
        }

      }
    }

  },
  methods: {
    getUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    },
    updateMemo(memo, index){

      this.todoItems[index].memo=memo;
      localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
    },
    selectList(List, ListUUID){
      this.$router.push("/main/"+List+"/ ");
      // this.memo = '';

    },
    addList(addListName){

      var addListJson = { 'List': addListName, 'ListUUID': this.getUUID() };
      this.localList.push(addListJson);
      localStorage.setItem('List', JSON.stringify(this.localList));

    },
    addTodo(todoItem){

      var listName = this.$route.params.listName && this.$route.params.listName.trim();
      var todoItemObject = { 'category': listName, 'contents': todoItem, 'completed' : "Not", 'memo': '', 'itemUUID': this.getUUID() };

      this.todoItems.push( todoItemObject );
      localStorage.setItem('todoItems', JSON.stringify(this.todoItems));


    },
    removeTodo(itemUUID, index) {

      this.todoItems.splice(index,1);
      localStorage.setItem('todoItems', JSON.stringify(this.todoItems));

    },

    selectedTodo(category, index) {

      this.itemIdx = index;
      this.$router.push("/main/"+category+"/"+index);

    },

    checkTodo(itemUUID, index) {

      this.$router.push("/main/"+this.$route.params.listName+"/"+index);
      var completed = this.todoItems[index].completed;
      if(completed=='completed'){
        this.todoItems[index].completed='Not'
      }else{
        this.todoItems[index].completed='completed';
      }
      localStorage.setItem('todoItems', JSON.stringify(this.todoItems));

    },

    clearAll() {
      localStorage.removeItem("todoItems");
      this.todoItems = [];
      // this.todoContents = [];
    }
  },components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter,
    'TodoMemo': TodoMemo
  }
}
</script>

<style scoped>
  div {
    background-color: #ECC7C0;
    text-align: center;
    color : #3C2E3D;
  }

.completed { text-decoration: line-through; }

#container {
 width: 95%;
 margin: 0px auto;
 padding: 20px;
 border: 1px solid #bcbcbc;
}
#header {
 padding: 20px;
 margin-bottom: 20px;
 border: 1px solid #bcbcbc;
}
#left {
 width: 10%;
 padding: 20px;
 margin-right: 20px;
 margin-bottom: 20px;
 float: left;
 border: 1px solid #bcbcbc;
}
#content {
 width: 48%;
 padding: 20px;
 margin-bottom: 20px;
 float: left;
 border: 1px solid #bcbcbc;
}
#right {
 width: 40%;
 padding: 20px;
 margin-bottom: 20px;
 float: right;
 border: 1px solid #bcbcbc;
}

#footer {
 clear: both;
 padding: 20px;
 border: 1px solid #bcbcbc;
}
</style>
