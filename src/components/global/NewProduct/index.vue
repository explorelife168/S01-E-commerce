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
            <input type="text" placeholder="請輸入圖片連結" />
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
            <input type="text" placeholder="請輸入標題" />
          </div>
          <div class="type-unit-flex">
            <div class="input-type">
              <div class="type-text" v-text="'分類'"></div>
              <input type="text" placeholder="請輸入分類" />
            </div>
            <div class="input-unit">
              <div class="unit-text" v-text="'單位'"></div>
              <input type="text" placeholder="請輸入單位" />
            </div>
          </div>
          <div class="price-sell-flex">
            <div class="input-price">
              <div class="price-text" v-text="'原價'"></div>
              <input type="text" placeholder="請輸入原價" />
            </div>
            <div class="input-sell">
              <div class="sell-text" v-text="'單位售價'"></div>
              <input type="text" placeholder="請輸入售價" />
            </div>
          </div>
          <div class="describe">
            <div class="describe-text" v-text="'產品描述'"></div>
            <textarea
              name="產品描述"
              id=""
              placeholder="請輸入產品描述"
            ></textarea>
          </div>
          <div class="content-description">
            <div class="content-description-text" v-text="'說明內容'"></div>
            <textarea
              name="說明內容"
              id=""
              placeholder="請輸入產品說明內容"
            ></textarea>
          </div>
          <div class="form-enable">
            <input
              class="form-enable-input"
              type="checkbox"
              id="formEnableDefault"
            />
            <label class="form-enable-label" for="formEnableDefault"
              >是否啟用</label
            >
          </div>
          <div class="buttonContainer">
            <button class="confirm">確認</button>
            <button class="cancel" @click="closureController">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { modelConfig } from "../../models/S01/modelConfig";

const modelConfigController = ref(modelConfig);

const closureController = (): boolean => {
  return (modelConfigController.value.createNewProduct = false);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
