<template>
  <div class="dashboard-wrap">
    <Navbar />
    <router-view />
    <div
      class="new-product-cards"
      v-if="modelConfigController.createNewProduct"
    >
      <NewProduct />
    </div>
    <div class="new-coupon-cards" v-if="modelConfigController.createNewCoupon">
      <NewCoupon />
    </div>
    <div class="check-product" v-if="modelConfigController.checkProductSwitch">
      <CheckProduct />
    </div>
    <div class="userData" v-if="modelConfigController.userDataSwitch">
      <UserData />
    </div>
    <AlertMessage />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import AlertMessage from "../../../global/AlertMessage/index.vue";
import Navbar from "../../../global/Navbar/index.vue";
import NewProduct from "../../../global/NewProduct/index.vue";
import NewCoupon from "../../../global/NewCoupon/index.vue";
import CheckProduct from "../../../global/CheckProduct/index.vue";
import UserData from "../../../global/UserData/index.vue";
// import useDataStore from "@/stores/useDataStore";
// import config from "../../../../../config/dev.env";
// import errInterceptors from "@/errInterceptors";
import { modelConfig } from "../modelConfig";

const modelConfigController = ref(modelConfig);

// const dataStore = useDataStore();

const updateToken = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  // console.log(token);
  axios.defaults.headers.common.Authorization = token;
};
// const checkSingIn = async () => {
//   const api = `${config.API_PATH}/api/user/check`;
//   const response = await errInterceptors.post(api);
//   if (response.data.success) {
//     console.log("登入狀態為(Dashboard):", response.data.success);
//   } else {
//     console.log("登入狀態為(Dashboard):", response.data.success);
//   }
// };
// checkSingIn();

// dataStore.checkSingIn();

updateToken(); // 保存cookie以及request時候發送Token驗證用
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
