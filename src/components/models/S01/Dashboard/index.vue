<template>
  <div class="dashboard-wrap">
    <Navbar />
    <div class="flex">
      <div class="left">
        <Sidebar />
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
    <div
      class="new-product-cards"
      v-if="modelConfigController.createNewProduct"
    >
      <NewProduct />
    </div>
    <div class="check-product">
      <CheckProduct />
    </div>
    <AlertMessage />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import AlertMessage from "../../../global/AlertMessage/index.vue";
import Navbar from "../../../global/Navbar/index.vue";
import Sidebar from "../../../global/Sidebar/index.vue";
import NewProduct from "../../../global/NewProduct/index.vue";
import CheckProduct from "../../../global/CheckProduct/index.vue";
import { modelConfig } from "../modelConfig";

const modelConfigController = ref(modelConfig);

const updateToken = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  axios.defaults.headers.common.Authorization = token;
};
updateToken(); //保存cookie以及request時候發送Token驗證用
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
