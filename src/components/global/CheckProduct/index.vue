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

// interface CreateNewProducts {
//   category: string;
//   content: string;
//   description: string;
//   id?: string;
//   imageUrl: string;
//   is_enabled: string;
//   origin_price: number;
//   price: number;
//   title: string;
//   unit: string;
//   num?: number;
//   image: string;
// }

// const creteNewProducts = ref<CreateNewProducts>({
//   imageUrl: "",
//   title: "",
//   category: "",
//   unit: "",
//   origin_price: 0,
//   price: 0,
//   description: "",
//   content: "",
//   is_enabled: "2",
//   image: "",
// });
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

// const buttonDisabled = ref(false); // 新增產品按鈕防呆

// // 點擊產品編輯後計算編輯頁面這的值
// const editProductsList = computed(() => {
//   if (modelConfigController.value.editProducts) {
//     const products = dataStore.products;
//     const findProduct = products.find(
//       (item) => item.id === modelConfigController.value.productsId
//     );
//     return findProduct as unknown as CreateNewProducts;
//   } else {
//     return creteNewProducts.value;
//   }
// });

// creteNewProducts.value = { ...editProductsList.value };

// const closureController = (): boolean => {
//   return (
//     (modelConfigController.value.editProducts = false),
//     (modelConfigController.value.createNewProduct = false)
//   );
// };

// const handleClick = () => {
//   if (modelConfigController.value.editProducts) {
//     editProducts();
//   } else {
//     createProducts();
//   }
// };

// const createProducts = () => {
//   buttonDisabled.value = true;
//   dataStore.isLoading = true;
//   const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/product`;
//   axios
//     .post(api, { data: creteNewProducts.value })
//     .then((response) => {
//       console.log(response);
//       closureController(); //新增成功後,關閉產品新增畫面
//       dataStore.getProducts(); //新增後更新畫面
//       buttonDisabled.value = false;
//       dataStore.isLoading = true;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// const editProducts = () => {
//   dataStore.isLoading = true;
//   const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/product/${modelConfig.productsId}`;
//   axios
//     .put(api, { data: creteNewProducts.value })
//     .then((response) => {
//       if (response.data.success) console.log("產品更新成功");
//       dataStore.getProducts();
//       closureController();
//       dataStore.isLoading = false;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// const uploadFile = (e: Event) => {
//   const target = e.target as HTMLInputElement;
//   const files = target.files;
//   if (!files || !files[0]) return;
//   const firstFiles = files[0];
//   const formData = new FormData();
//   formData.append("file-to-upload", firstFiles);
//   const url = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/upload`;
//   axios
//     .post(url, formData, { headers: { "Content-Type": "multipart/form-data" } })
//     .then((response) => {
//       if (response.data.success) {
//         creteNewProducts.value.imageUrl = response.data.imageUrl;
//         console.log("圖片上傳成功");
//       } else {
//         if (!response.data.success) {
//           dataStore.errorMessage(response.data.message);
//         }
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
