<template>
  <div class="dashboard-wrap">
    <Navbar />
    <div class="flex">
      <Sidebar />
      <ProductsList />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "../../../global/Navbar/index.vue";
import Sidebar from "../../../global/Sidebar/index.vue";
import ProductsList from "../../../global/ProductsList/index.vue";
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
