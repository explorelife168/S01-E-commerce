<template>
  <div class="dashboard-wrap">
    <Navbar />
    <div class="flex">
      <Sidebar />
      <Products />
    </div>
    <div
      class="new-product-cards"
      v-if="modelConfigController.createNewProduct"
    >
      <NewProduct />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../../../global/Navbar/index.vue";
import Sidebar from "../../../global/Sidebar/index.vue";
import Products from "../../../global/Products/index.vue";
import NewProduct from "../../../global/NewProduct/index.vue";
import { modelConfig } from "../modelConfig";
import { ref } from "vue";

const modelConfigController = ref(modelConfig);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
