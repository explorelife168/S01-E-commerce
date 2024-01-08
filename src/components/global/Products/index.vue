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
          <tr v-for="obj in dataStore.products" :key="obj.id">
            <td>{{ obj.category }}</td>
            <td>{{ obj.title }}</td>
            <td>{{ obj.origin_price }}</td>
            <td>{{ obj.price }}</td>
            <td>未啟用</td>
            <td>
              <button class="edit">編輯</button>
              <button class="delete" @click="deleteProducts(obj.id)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import axios, { AxiosResponse } from "axios";
import axios from "axios";
import { ref } from "vue";
import useDataStore from "../../../stores/useDataStore";
import modelConfig from "@/components/models/S01/modelConfig";
import config from "../../../../config/dev.env";

const dataStore = useDataStore();

// interface Products {
//   category: string;
//   id: string;
//   image: string;
//   is_enabled: number;
//   num: boolean;
//   origin_price: number;
//   price: number;
//   title: string;
//   unit: number;
// }
// interface ProductApi {
//   products: Partial<Products>;
// }

// const products = ref(); //產品List
const modelConfigController = ref(modelConfig); //控制模型

//取得產品API
// const getProducts = () => {
// const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/products`;
// axios
//   .get<ProductApi>(api)
//   .then((response: AxiosResponse<ProductApi>) => {
//     products.value = response.data.products;
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// };

// [API]: /api/:api_path/admin/product/:product_id
// [說明]:  刪除產品
//    @api_path = 'thisismycourse2'
// [方法]: delete
// [成功回傳]:
//   {
//     "success": true,
//     "message": "已刪除產品"
//   }
// [失敗回傳]: 找不到產品
//   {
//     "success": false,
//     "message": "找不到產品"
//   }
// 刪除產品
const deleteProducts = (id: string) => {
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/product/${id}`;
  axios
    .delete(api, { data: id })
    .then((response) => {
      if (response.data.success) console.log("刪除商品成功");
      //產品刪除成功後再次更新products list
      dataStore.getProducts();
    })
    .catch((error) => {
      console.error(error);
    });
};

//開啟建立新產品開關
const createNewProduct = (): boolean => {
  return (modelConfigController.value.createNewProduct = true);
};
// getProducts(); //執行 取得產品 API
dataStore.getProducts();
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
