<template>
  <div>
    <h1>
        {{ msg }}
    </h1>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'Login vue!'
        }
    }
}
</script>

<style scoped>
  div {
    background-color: #8BCBCB;
    text-align: center;
    color : #3C2E3D;
  }
</style>
