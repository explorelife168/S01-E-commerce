<template>
  <div class="check-product-container">
    <loading v-model:active="isLoading" />
    <div class="check-cart-container">
      <div
        class="check-cart-image"
        :style="{ 'background-image': `url(${checkProduct.imageUrl})` }"
      ></div>
      <div class="check-cart-info">
        <div class="closure">
          <button @click="checkProductSwitch">X</button>
        </div>
        <div class="check-cart-title" v-text="`${checkProduct.title}`"></div>
        <div class="check-cart-content">
          {{ checkProduct.description }}
        </div>
        <div class="check-cart-price">
          <div class="price">{{ currency(checkProduct.price) }}</div>
          <div class="origin-price">
            {{ currency(checkProduct.origin_price) }}
          </div>
        </div>
        <div class="check-cart-quantity">
          <div class="quantity-title" v-text="'Quantity:'"></div>
          <select name="quantity" id="selectQuantity" v-model="selectQuantity">
            <option :value="qty" v-for="qty in 10" :key="qty">{{ qty }}</option>
          </select>
        </div>
        <div
          class="subtotal-price"
          v-text="`Subtotal:${currency(subTotalPrice)}`"
        ></div>
        <div class="check-cart-add">
          <button @click="addCart(checkProduct.id, selectQuantity)">
            Add Carts
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, computed } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { modelConfig } from "../../models/S01/modelConfig";
import useDataStore from "../../../stores/useDataStore";
import currency from "../../../utils/filters/currency";
import config from "../../../../config/dev.env";

const dataStore = useDataStore();

const modelConfigController = ref(modelConfig);

const selectQuantity = ref(1);

const isLoading = ref(false);

const checkProduct = computed(() => dataStore.product);

const subTotalPrice = computed(
  () => checkProduct.value.price * Number(selectQuantity.value)
);

const checkProductSwitch = () => {
  return (modelConfigController.value.checkProductSwitch = false);
};

const addCart = (id: string, qty: number) => {
  isLoading.value = true;
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/cart`;
  axios
    .post(api, { data: { product_id: id, qty: qty } })
    .then((response) => {
      console.log(response);
      modelConfigController.value.checkProductSwitch = false;
      dataStore.getCartsItem();
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
