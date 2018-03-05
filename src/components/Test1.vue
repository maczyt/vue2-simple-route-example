<template>
  <div>
    <h1>我是Test1啊</h1>
    <router-link to="/test1/id">子节点</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$route);
  }
};
</script>

