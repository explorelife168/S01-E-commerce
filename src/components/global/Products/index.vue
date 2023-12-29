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
          <tr v-for="obj in products" :key="obj.id">
            <th>{{ obj.category }}</th>
            <th>{{ obj.title }}</th>
            <th>{{ obj.origin_price }}</th>
            <th>{{ obj.price }}</th>
            <th>
              <button></button>
            </th>
            <th>編輯</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosResponse } from "axios";
import { ref } from "vue";

interface Products {
  category: string;
  id: string;
  image: string;
  is_enabled: number;
  num: boolean;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
}
interface ProductApi {
  products: Partial<Products>;
}

const products = ref(); //產品List

const getProducts = () => {
  const api = "https://vue-course-api.hexschool.io/api/testapi_2/products";
  axios
    .get<ProductApi>(api)
    .then((response: AxiosResponse<ProductApi>) => {
      products.value = response.data.products;
      console.log(products.value);
    })
    .catch((error) => {
      console.error(error);
    });
};

getProducts(); //執行 取得產品 API
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
