<template>
  <div class="dashboard-wrap">
    <Navbar />
    <div class="flex">
      <Sidebar />
      <products />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "../../../global/Sidebar/index.vue";
import Navbar from "../../../global/Navbar/index.vue";
import products from "../../../global/Products/index.vue";
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
