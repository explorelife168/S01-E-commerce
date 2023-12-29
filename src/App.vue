<template>
  <router-view />
</template>

<script setup lang="ts">
// import axios from "axios";
import { onMounted } from "vue";

onMounted(() => {
  // const api = "https://vue-course-api.hexschool.io/api/neilwu/products";
  // axios.get(api).then((response) => console.log(response.data));
});
</script>

<style lang="scss">
* {
  margin: 0;
}
html,
body,
#app {
  height: 100%;
}
</style>
