<template>
  <div class="product-wrap">
    <div class="create-btn">
      <button class="btn" @click="createNewProduct">建立新的產品</button>
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
            <td>未啟用</td>
            <td>
              <button class="edit">編輯</button>
              <button class="delete">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="new-product">
      <div class="bg"></div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import axios, { AxiosResponse } from "axios";
import { ref } from "vue";
import modelConfig from "@/components/models/S01/modelConfig";
import config from "../../../../config/dev.env";

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
const modelConfigController = ref(modelConfig); //控制模型
//取得產品API
const getProducts = () => {
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/products`;
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
const createNewProduct = (): boolean => {
  return (modelConfigController.value.createNewProduct = true);
};
getProducts(); //執行 取得產品 API
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
