<template>
  <div class="order-container">
    <loading v-model:active="isLoading" />
    <!-- 產品項目 -->
    <div class="order-carts" v-for="cart in updateProducts" :key="cart.id">
      <div
        class="order-pictures"
        :style="{
          'background-image': `url(${cart.imageUrl})`,
        }"
      ></div>
      <div class="order-product-name">
        <div class="flex-center">
          {{ cart.title }}
        </div>
      </div>
      <div class="price">
        <div class="origin-price">
          {{ currency(cart.origin_price) }}
        </div>
        <div class="selling-price">
          {{ currency(cart.price) }}
        </div>
      </div>
      <div class="order-carts-footer">
        <div class="see-more">
          <button @click="clickProduct(cart.id)">See more</button>
        </div>
        <div class="add-carts">
          <button>Add to cart</button>
        </div>
      </div>
    </div>
    <!-- 購物車圖示 -->
    <div
      class="add-carts-icon"
      v-show="!cartsModel"
      @click="cartsOpenModelController"
      ref="cartsIcon"
    >
      <font-awesome-icon
        icon="fa-solid fa-cart-shopping"
        style="color: #fff; font-size: 1.4rem"
      />
      <div class="add-carts-qty" v-text="'45'"></div>
    </div>
    <!-- 購物車 -->
    <div class="carts-sidebar-cover" v-show="cartsModel">
      <div class="carts-sidebar-container" ref="carts">
        <div class="carts-header">
          <div class="carts-title" v-text="'Your Carts'"></div>
          <div class="close-btn">
            <font-awesome-icon
              @click="cartsCloseModelController"
              icon="fa-solid fa-xmark"
            />
          </div>
        </div>
        <div class="carts-body">
          <div class="carts-item" v-for="bag in updateProducts" :key="bag.id">
            <div class="carts-image-container">
              <div
                class="carts-image"
                :style="{
                  'background-image': `url(${bag.imageUrl})`,
                }"
              ></div>
            </div>
            <div class="carts-info">
              <div class="carts-trashcan">
                <font-awesome-icon icon="fa-regular fa-trash-can" />
              </div>
              <div class="carts-title">{{ bag.title }}</div>
              <div class="carts-qty">{{ "Qty: 1" }}</div>
              <div class="carts-price">{{ currency(bag.price) }}</div>
            </div>
          </div>
        </div>
        <div class="carts-footer">
          <div class="discount-input">
            <div class="input-code">
              <input type="text" placeholder="Enter your discount code" />
            </div>
            <div class="confirm-btn">
              <button>confirm</button>
            </div>
          </div>
          <div class="subtotal" v-text="'Subtotal: $11,000'"></div>
          <div class="discount-price" v-text="'Discount price:  $10,000'"></div>
          <div class="add-btn">
            <button>Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { gsap } from "gsap";
import { ref, computed } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import useDataStore from "../../../stores/useDataStore";
import modelConfig from "@/components/models/S01/modelConfig";
// import config from "../../../../config/dev.env";
import currency from "../../../utils/filters/currency"; // 小數點

const dataStore = useDataStore();

const updateProducts = computed(() => dataStore.products);

const modelConfigController = ref(modelConfig); //控制模型

const cartsModel = ref(false);

const isLoading = ref(false);

const carts = ref(null);

const cartsIcon = ref(null);

const clickProduct = async (id: string) => {
  isLoading.value = true;
  try {
    await dataStore.getProduct(id);
  } catch (error) {
    console.log(error);
  } finally {
    modelConfigController.value.checkProductSwitch = true;
    isLoading.value = false;
  }
};

const cartsOpenModelController = () => {
  cartsModel.value = true;
  gsap.set(carts.value, { x: 0, opacity: 1 });
  gsap.from(carts.value, {
    x: 300,
    duration: 0.5,
    opacity: 1,
    ease: "easeInOut",
  });
};
const cartsCloseModelController = () => {
  gsap.to(carts.value, {
    x: 300,
    duration: 0.5,
    opacity: 0,
    ease: "easeInOut",
    onComplete: () => {
      cartsModel.value = false;
      gsap.from(cartsIcon.value, {
        y: -100,
        duration: 1,
        opacity: 1,
        ease: "back.out",
      });
    },
  });
};
// watch(cartsModel, () => {
//   if (cartsModel.value) {

//   }
// });

dataStore.getProducts(); // 產品建立初始化
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
