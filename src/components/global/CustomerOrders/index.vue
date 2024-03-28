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
          <button @click="addCart(cart.id, 1)">Add to cart</button>
        </div>
      </div>
    </div>
    <!-- 按鈕 -->
    <div class="pagination">
      <div class="left-btn">
        <button
          @click.prevent="dataStore.getProducts(pagination.current_page - 1)"
          class="left"
          :class="{ disabled: !pagination.has_pre }"
        >
          &lt;&lt;
        </button>
      </div>

      <div
        class="pages-btn"
        v-for="(pages, index) in pagination.total_pages"
        :key="index"
      >
        <button
          :class="[
            `pages-${pages}`,
            { active: pagination.current_page === pages },
          ]"
          @click.prevent="dataStore.getProducts(pages)"
        >
          {{ pages }}
        </button>
      </div>
      <div class="right-btn">
        <button
          @click.prevent="dataStore.getProducts(pagination.current_page + 1)"
          class="right"
          :class="{ disabled: !pagination.has_next }"
        >
          >>
        </button>
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
      <div class="add-carts-qty" v-text="`${dataStore.cartsItem.length}`"></div>
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
          <div class="carts-item" v-for="item in updateItem" :key="item.id">
            <div class="carts-image-container">
              <div
                class="carts-image"
                :style="{
                  'background-image': `url(${item.product.imageUrl})`,
                }"
              ></div>
            </div>
            <div class="carts-info">
              <div class="carts-trashcan">
                <font-awesome-icon
                  @click="deleteCart(item.id)"
                  icon="fa-regular fa-trash-can"
                />
              </div>
              <div class="carts-title">{{ item.product.title }}</div>
              <div class="carts-qty">{{ `Qty: ${item.qty}` }}</div>
              <div class="carts-price">
                {{ currency(item.final_total) }}
              </div>
            </div>
          </div>
        </div>
        <div class="carts-footer">
          <div class="discount-input">
            <div class="input-code">
              <input
                type="text"
                placeholder="Enter your discount code"
                v-model="couponCode"
              />
            </div>
            <div class="confirm-btn">
              <button @click="addCouponCode">confirm</button>
            </div>
          </div>
          <div
            class="subtotal"
            v-text="`Subtotal: ${currency(dataStore.total)}`"
          ></div>
          <div
            class="discount-price"
            v-text="`Discount price:  ${currency(dataStore.final_total)}`"
          ></div>
          <div class="add-btn">
            <button @click="addUserData">Proceed to checkout</button>
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
import config from "../../../../config/dev.env";
import currency from "../../../utils/filters/currency"; // 小數點
import errInterceptors from "@/errInterceptors";

const dataStore = useDataStore();

const modelConfigController = ref(modelConfig); //控制模型

const cartsModel = ref(false);

const isLoading = ref(false);

const carts = ref(null);

const cartsIcon = ref(null);

const couponCode = ref("");

const updateProducts = computed(() => dataStore.products);
const updateItem = computed(() => dataStore.cartsItem);
const pagination = computed(() => dataStore.pagination);

const clickProduct = async (id: string) => {
  isLoading.value = true;
  await dataStore.getProduct(id);
  modelConfigController.value.checkProductSwitch = true;
  isLoading.value = false;
};

// const clickProduct = async (id: string) => {
//   isLoading.value = true;
//   try {
//     await dataStore.getProduct(id);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     modelConfigController.value.checkProductSwitch = true;
//     isLoading.value = false;
//   }
// };

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

const addCart = async (id: string, qty: number) => {
  isLoading.value = true;
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/cart`;
  const response = await errInterceptors.post(api, {
    data: { product_id: id, qty: qty },
  });
  console.log(response);
  isLoading.value = false;
  dataStore.getCartsItem();
};

// const addCart = (id: string, qty: number) => {
//   isLoading.value = true;
//   const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/cart`;
//   axios
//     .post(api, { data: { product_id: id, qty: qty } })
//     .then((response) => {
//       console.log(response);
//       isLoading.value = false;
//       dataStore.getCartsItem();
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

const deleteCart = async (id: string) => {
  isLoading.value = true;
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/cart/${id}`;
  const response = await errInterceptors.delete(api);
  console.log(response);
  dataStore.getCartsItem();
  isLoading.value = false;
};

// const deleteCart = (id: string) => {
//   isLoading.value = true;
//   const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/cart/${id}`;
//   axios
//     .delete(api)
//     .then((response) => {
//       console.log(response);
//       dataStore.getCartsItem();
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//     .finally(() => {
//       isLoading.value = false;
//     });
// };

const addCouponCode = async () => {
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/coupon`;
  const response = await errInterceptors.post(api, {
    data: { code: couponCode.value },
  });
  console.log(response);
  console.log(couponCode.value);
};

// const addCouponCode = () => {
//   const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/coupon`;
//   axios
//     .post(api, { data: { code: couponCode.value } })
//     .then((response) => {
//       console.log(response);
//       console.log(couponCode.value);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// 客戶資料填寫頁面

const addUserData = () => {
  if (dataStore.cartsItem.length === 0) return;
  modelConfigController.value.userDataSwitch = true;
  cartsModel.value = false;
};

dataStore.getProducts(); // 產品建立初始化
dataStore.getCartsItem();
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
