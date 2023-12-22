<template>
  <div class="Product-wrap">
    <div class="products">
      <table>
        <thead>
          <tr>
            <th>分類</th>
            <th>名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <th>{{ console.log(item) }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

// interface Products {
//   category: string;
//   id: string;
//   image: string;
//   is_enabled: number;
//   num: boolean;
//   origin_price: number;
//   price: number;
//   title: string;
//   unit: string;
// }

// type AxiosResponse<T> = {
//   data: T;
// };

const products = ref([]);
console.log(products);

const getProducts = () => {
  const api = "https://vue-course-api.hexschool.io/api/testapi_1/products";
  axios
    // .get<AxiosResponse<Products[]>>(api)
    .get(api)
    .then((response) => {
      products.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
onMounted(() => getProducts());
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
