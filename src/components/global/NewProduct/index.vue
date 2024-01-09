<template>
  <div class="new-product-container">
    <div class="card-container">
      <div class="title">
        <div class="title-name" v-text="'新增產品'"></div>
        <div class="closure">
          <button @click="closureController">X</button>
        </div>
      </div>
      <div class="content">
        <div class="content-left">
          <div class="input-image">
            <div class="input-image-text" v-text="'輸入圖片網址'"></div>
            <input
              type="text"
              placeholder="請輸入圖片連結"
              v-model="newProducts.imageUrl"
            />
          </div>
          <div class="transmit-image">
            <div class="transmit-image-text" v-text="'或 上傳圖片'"></div>
            <input type="text" placeholder="未選擇任何檔案" />
            <button class="choiceFile">選擇檔案</button>
          </div>
        </div>
        <div class="content-right">
          <div class="input-title">
            <div class="input-title-text" v-text="'標題'"></div>
            <input
              type="text"
              placeholder="請輸入標題"
              v-model="newProducts.title"
            />
          </div>
          <div class="type-unit-flex">
            <div class="input-type">
              <div class="type-text" v-text="'分類'"></div>
              <input
                type="text"
                placeholder="請輸入分類"
                v-model="newProducts.category"
              />
            </div>
            <div class="input-unit">
              <div class="unit-text" v-text="'單位'"></div>
              <input
                type="text"
                placeholder="請輸入單位"
                v-model="newProducts.unit"
              />
            </div>
          </div>
          <div class="price-sell-flex">
            <div class="input-price">
              <div class="price-text" v-text="'原價'"></div>
              <input
                type="text"
                placeholder="請輸入原價"
                v-model="newProducts.origin_price"
              />
            </div>
            <div class="input-sell">
              <div class="sell-text" v-text="'單位售價'"></div>
              <input
                type="text"
                placeholder="請輸入售價"
                v-model="newProducts.price"
              />
            </div>
          </div>
          <div class="describe">
            <div class="describe-text" v-text="'產品描述'"></div>
            <textarea
              name="產品描述"
              id=""
              placeholder="請輸入產品描述"
              v-model="newProducts.description"
            ></textarea>
          </div>

          <div class="content-description">
            <div class="content-description-text" v-text="'說明內容'"></div>
            <textarea
              name="說明內容"
              id=""
              placeholder="請輸入產品說明內容"
              v-model="newProducts.content"
            ></textarea>
          </div>
          <div class="form-enable">
            <input
              class="form-enable-input"
              type="checkbox"
              id="formEnableDefault"
              v-model="newProducts.is_enabled"
              :true-value="1"
              :false-value="2"
            />
            <label class="form-enable-label" for="formEnableDefault"
              >是否啟用</label
            >
          </div>
          <div class="buttonContainer">
            <button class="confirm" @click="createProducts">確認</button>
            <button class="cancel" @click="closureController">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, Ref } from "vue";
import { modelConfig } from "../../models/S01/modelConfig";
import useDataStore from "@/stores/useDataStore";

const dataStore = useDataStore();

type NewProducts<T = number | string> = {
  imageUrl: string;
  title: string;
  category: string;
  unit: string;
  origin_price: T;
  price: T;
  description: string;
  content: string;
  is_enabled: string;
};

const modelConfigController = ref(modelConfig);
const newProducts: Ref<NewProducts> = ref({
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: 0,
  price: 0,
  description: "",
  content: "",
  is_enabled: "",
});

const closureController = (): boolean => {
  return (modelConfigController.value.createNewProduct = false);
};

const createProducts = () => {
  const api = "https://vue-course-api.hexschool.io/api/testapi_2/admin/product";
  axios
    .post(api, { data: newProducts.value })
    .then((response) => {
      console.log(response);
      closureController(); //新增成功後,關閉產品新增畫面
      dataStore.getProducts(); //新增後更新畫面
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
