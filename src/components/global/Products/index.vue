<template>
  <div class="product-wrap">
    <div class="create-btn">
      <button class="btn">建立新的產品</button>
    </div>
    <div class="products">
      <table>
        <thead>
          <tr>
            <td>分類</td>
            <td>名稱</td>
            <td>原價</td>
            <td>售價</td>
            <td>是否啟用</td>
            <td>編輯</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="obj in products" :key="obj.id">
            <td>{{ obj.category }}</td>
            <td>{{ obj.title }}</td>
            <td>{{ obj.origin_price }}</td>
            <td>{{ obj.price }}</td>
            <td>
              <button>啟用</button>
            </td>
            <td>編輯</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
  unit: number;
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
