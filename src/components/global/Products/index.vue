<template>
  <div class="product-wrap">
    <loading v-model:active="dataStore.isLoading" />
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
          <tr v-for="obj in updateProducts" :key="obj.id">
            <td>{{ obj.category }}</td>
            <td>{{ obj.title }}</td>
            <td>{{ currency(obj.origin_price) }}</td>
            <td>{{ currency(obj.price) }}</td>
            <td>{{ obj.is_enabled == 1 ? "啟用" : "未啟用" }}</td>
            <td>
              <button class="edit" @click="editProducts(obj)">編輯</button>
              <button class="delete" @click="deleteProducts(obj.id)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, computed } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import useDataStore from "../../../stores/useDataStore";
import modelConfig from "@/components/models/S01/modelConfig";
import config from "../../../../config/dev.env";
import currency from "@/utils/filters/currency"; // 小數點

interface EditProducts {
  category: string;
  content: string;
  description: string;
  id: string;
  imageUrl: string;
  is_enabled: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  num: number;
  image: string;
}

const dataStore = useDataStore();

// const products = ref(); //產品List
const modelConfigController = ref(modelConfig); //控制模型

// const isLoading = ref(false);

// 產品畫面顯示
const updateProducts = computed(() => dataStore.products);
const pagination = computed(() => dataStore.pagination);

// // 開啟建立新產品及編輯產品開關
const createNewProduct = () => {
  return (
    (modelConfigController.value.editProducts = false),
    (modelConfigController.value.createNewProduct = true)
  );
};

// 刪除產品
const deleteProducts = (id: string) => {
  dataStore.isLoading = true;
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/product/${id}`;
  axios
    .delete(api, { data: id })
    .then((response) => {
      if (response.data.success) console.log("刪除商品成功");
      dataStore.getProducts();
      dataStore.isLoading = false;
    })
    .catch((error) => {
      console.error(error);
    });
};

const editProducts = (obj: EditProducts) => {
  modelConfigController.value.createNewProduct = true;
  modelConfigController.value.editProducts = true;
  modelConfigController.value.productsId = obj.id;
};

// getProducts(); //執行 取得產品 API
dataStore.getProducts();
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
