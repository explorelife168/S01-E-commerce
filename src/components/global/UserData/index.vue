<template>
  <div class="userData-wrap">
    <loading v-model:active="isLoading" />
    <div class="userData-container">
      <div class="userData-header" v-text="'Basic Information Of Order'"></div>
      <div class="userData-body">
        <div class="userData-left">
          <form action="">
            <div class="userData-name">
              <label for="name">Name:</label>
              <input type="text" />
            </div>
            <div class="userData-email">
              <label for="email">E-mail:</label>
              <input type="text" />
            </div>
            <div class="userData-tel">
              <label for="tel">Tel:</label>
              <input type="text" />
            </div>
            <div class="userData-address">
              <label for="address">Address:</label>
              <input type="text" />
            </div>
          </form>
        </div>
        <div class="userData-right">
          <div class="form-left">
            <form action="">
              <div class="userData-message">
                <label for="message">Message:</label>
                <textarea name="message" id=""></textarea>
              </div>
            </form>
            <div class="form-btn">
              <div class="back-btn">
                <button @click="closeInfo">Back</button>
              </div>
              <div class="next-btn">
                <button @click.prevent="">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import axios from "axios";
import { ref } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { modelConfig } from "../../models/S01/modelConfig";
// import useDataStore from "../../../stores/useDataStore";
// import currency from "../../../utils/filters/currency";
// import config from "../../../../config/dev.env";

// const dataStore = useDataStore();

const modelConfigController = ref(modelConfig);

// const selectQuantity = ref(1);

const isLoading = ref(false);

const closeInfo = (): boolean => {
  return (modelConfigController.value.userDataSwitch = false);
};

// const checkProduct = computed(() => dataStore.product);

// const subTotalPrice = computed(
//   () => checkProduct.value.price * Number(selectQuantity.value)
// );

// const checkProductSwitch = () => {
//   return (modelConfigController.value.checkProductSwitch = false);
// };

// const addCart = (id: string, qty: number) => {
//   isLoading.value = true;
//   const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/cart`;
//   axios
//     .post(api, { data: { product_id: id, qty: qty } })
//     .then((response) => {
//       console.log(response);
//       modelConfigController.value.checkProductSwitch = false;
//       dataStore.getCartsItem();
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
