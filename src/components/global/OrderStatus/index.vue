<template>
  <div class="order-status-wrap">
    <loading v-model:active="isLoading" />
    <div class="order-container">
      <table>
        <thead>
          <tr>
            <td>CreateTime</td>
            <td>Order ID</td>
            <td>Paid</td>
            <td>PaidTime</td>
            <td>Price</td>
            <td>Message</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orderListStatusData" :key="index">
            <td>{{ dateTransfer(order.create_at) }}</td>
            <td>{{ order.id }}</td>
            <td :style="{ color: order.is_paid ? 'green' : 'red' }">
              {{ order.is_paid ? "Paid" : "Not Pay" }}
            </td>
            <td>{{ order.is_paid ? dateTransfer(order.paid_date) : "" }}</td>
            <td>{{ currency(order.total) }}</td>
            <td :style="{ color: order.message ? 'red' : 'green' }">
              {{ order.message ? "N" : "Y" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <div class="left-btn">
        <button
          @click.prevent="getOrderListStatus(pagination.current_page - 1)"
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
          @click.prevent="getOrderListStatus(pages)"
        >
          {{ pages }}
        </button>
      </div>
      <div class="right-btn">
        <button
          @click.prevent="getOrderListStatus(pagination.current_page + 1)"
          class="right"
          :class="{ disabled: !pagination.has_next }"
        >
          >>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
// import useDataStore from "../../../stores/useDataStore";
// import modelConfig from "@/components/models/S01/modelConfig";
import config from "../../../../config/dev.env";
import currency from "@/utils/filters/currency"; // 小數點

// interface EditProducts {
//   category: string;
//   content: string;
//   description: string;
//   id: string;
//   imageUrl: string;
//   is_enabled: number;
//   origin_price: number;
//   price: number;
//   title: string;
//   unit: string;
//   num: number;
//   image: string;
// }

// const products = ref(); //產品List
// const modelConfigController = ref(modelConfig); //控制模型

const isLoading = ref(false);

const orderListStatusData = ref();

// 產品畫面顯示
// const updateProducts = computed(() => dataStore.products);
const pagination = ref({
  category: "",
  current_page: 1,
  has_next: true,
  has_pre: false,
  total_pages: 1,
});

// // // 開啟建立新產品及編輯產品開關
// const createNewProduct = () => {
//   return (
//     (modelConfigController.value.editProducts = false),
//     (modelConfigController.value.createNewProduct = true)
//   );
// };

// 刪除產品
// const deleteProducts = (id: string) => {
//   isLoading.value = true;
//   const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/product/${id}`;
//   axios
//     .delete(api, { data: id })
//     .then((response) => {
//       if (response.data.success) console.log("刪除商品成功");
//       dataStore.getProducts();
//       isLoading.value = false;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

const dateTransfer = (t: number): string => {
  return new Date(t * 1000).toISOString().replace("T", " ").substring(0, 19);
};

const getOrderListStatus = async (page = 1) => {
  isLoading.value = true;
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/orders?page=${page}`;
  try {
    const response = await axios.get(api);
    console.log(response);
    orderListStatusData.value = response.data.orders;
    pagination.value = response.data.pagination;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

// const editProducts = (obj: EditProducts) => {
//   modelConfigController.value.createNewProduct = true;
//   modelConfigController.value.editProducts = true;
//   modelConfigController.value.productsId = obj.id;
// };

getOrderListStatus();
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
