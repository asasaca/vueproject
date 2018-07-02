<template>
  <ul class="float_left_padding_0">
    <li v-for="(localList, index) in propsdata" @click="selectList(localList.List, localList.ListUUID)">
      <span class="span">{{localList.List}}</span>
    </li>

    <li><input type="text" v-model="newList" id="createList" class="newList"></li>
    <li>
      <span v-on:click="addList" class="span">
        <i class="addBtn fa fa-plus" aria-hidden="true"></i>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['propsdata'],
  data() {
    return {
      newList:'',
      // listArray:JSON.parse(window.localStorage.getItem('List')),
    }
  },
  methods: {
    addList(){
      if(this.newList!==""){
        var value = this.newList && this.newList.trim();
        this.$emit('addList', value);
        this.newList='';
      }
    },
    selectList(List, ListUUID){
      this.$emit('selectList', List, ListUUID);
    },
  }
}
</script>

<style scoped>
  li{
    list-style: none;
    padding-bottom: 10px;
    background: linear-gradient(to right, #6478FB, #8763FB);
    margin-bottom: 5px;
    border-radius: 5px;
  }
  div {
    color : #726A95;
  }
  .float_left_padding_0{
    padding: 5px !important;
  }
  .span{
    color:#ffffff;
    /* background: linear-gradient(to right, #6478FB, #8763FB); */
    vertical-align: sub;
  }
  input{
    color:#709fb0;
    background-color: #ffffff;
    width: 50px;
    margin-top: 7px;
  }
  .newList{
    width:70%;
    border-radius: 5px;
  }
</style>
