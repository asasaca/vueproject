<template>
  <div>
    <ul>
      <li v-for="(todoItems, index) in propsdata" v-if="(todoItems.category==routeListName)&&(routeListName!='ALL')">
        <span @click="selectedTodo(todoItems.category, index)">{{ todoItems.contents }}
          <span v-if="todoItems.completed=='completed'" style="color:#8BCBCB;">I DID IT!!</span>
          <span v-if="todoItems.completed=='Not'" style="color:#8BCBCB;">COMPLETED??</span>
        </span>
        <button class="checkBtn" type="button" @click="checkTodo(todoItems.itemUUID, index)">
          <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button class="removeBtn" type="button" @click="removeTodo(todoItems.itemUUID, index)">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </li>
      <li v-for="(todoItems, index) in propsdata" v-if="routeListName=='ALL'">
        <span @click="selectedTodo(todoItems.category, index)">{{ todoItems.contents }}
          <span v-if="todoItems.completed=='completed'" style="color:#8BCBCB;">I DID IT!!</span>
          <span v-if="todoItems.completed=='Not'" style="color:#8BCBCB;">COMPLETED??</span>
        </span>
        <button class="checkBtn" type="button" @click="checkTodo(todoItems.itemUUID, index)">
          <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button class="removeBtn" type="button" @click="removeTodo(todoItems.itemUUID, index)">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  props: ['propsdata'],
  data() {
      return {
        todoItems : [],
        routeListName : this.$route.params.listName,
      }
  },
  created(){

  },
  watch: {
    '$route' (to, from) {
      this.routeListName = to.params.listName
    }
  },

  methods: {
    removeTodo(itemUUID, index) {
      this.$emit('removeTodo', itemUUID, index);
    },
    selectedTodo(category, index) {
      this.$emit('selectedTodo', category, index);
    },
    checkTodo(itemUUID, index) {
      this.$emit('checkTodo', itemUUID, index);
    },
  },

}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  /* margin-left: auto; */
  color: #8BCBCB;
  background: white;
  border: 1px solid #ffffff;

}
.removeBtn {
  margin-left: auto;
  color: #de4343;
  background: white;
  border: 1px solid #ffffff;
}


.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-move {
  transition: transform 1s;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}


</style>
