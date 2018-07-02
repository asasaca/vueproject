<template>
  <div id="memoDiv">
      <ul style="height: 30px;">
        <li class="title"><h3>Memo</h3></li>
      </ul>
      <ul style="border-radius:5px;" v-for="(todoItems, index) in propsdata" v-if="index==itemIdx">
        <li style="min-height: 80px; text-align:left; width:100%; background-color:#ffffff;">
          List Name : {{todoItems.category}}<br />
          index : {{index}}<br />
          item UUID : {{todoItems.itemUUID}}
        </li>
        <li style="text-align:left; clear:both; width:100%; height:250px; background-color:#ffffff;">
          <div>Contents</div>
          <div style="clear:both;"></div>
          <div>
            <textarea v-model="memo" v-on:keyup.enter="updateMemo" col="500" row="80" style="width:100%; height:150px; resize: none;">
            </textarea><br />
          </div>
          <input class="updateBt" type="button" v-on:click="updateMemo" value= "update">
        </li>
      </ul>
  </div>

</template>

<script>
export default {
  props: ['propsdata'],
  data() {
      return {
        itemIdx : '',
        listName : '',
        memo : '',
        todoItems: '',
      }
  },
  watch: {

    '$route' (to, from) {

      this.todoItems = JSON.parse(window.localStorage.getItem('todoItems'));
      var index = to.params.index && to.params.index.trim();
      if(index=='' || index==undefined){
        this.itemIdx = '';
      }else{
        this.itemIdx = index;
        this.memo=this.todoItems[this.$route.params.index].memo;
      }

      this.listName = to.params.listName;

    }
  },
  created(){

    this.todoItems = JSON.parse(window.localStorage.getItem('todoItems'));
    var index = this.$route.params.index;
    var listName = this.$route.params.listName;

    if(this.todoItems==null||this.todoItems[this.$route.params.index]==undefined){
      console.log("error : 예외처리 필요2");
      
    }else{
      this.memo=this.todoItems[this.$route.params.index].memo;
      this.itemIdx=this.$route.params.index;
    }


  },
  methods: {
    updateMemo(){
      var memo = this.memo && this.memo.trim();
      this.$emit('updateMemo', memo, this.itemIdx);

    },
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0px;
    margin: 0px !important;
  }

  li {
    /* display: flex; */
    /* min-height: 80px; */
    /* height: 50px; */
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    border-radius: 5px;
  }

  .title{
    width: 65px;
    font-weight: 500;
    text-align: left;
    /* padding: 10px; */
  }

  .updateBt{
    color: #fff;
    background: linear-gradient(to right, #6478FB, #8763FB);
    padding: 5px;
    border-radius: 5px;
    margin: 0.5rem 0;

  }
</style>
