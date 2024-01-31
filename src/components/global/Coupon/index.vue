<template>
  <div class="coupon-wrap">
    <loading v-model:active="isLoading" />
    <div class="create-btn">
      <button class="btn" @click="createNewCoupon">NewCoupon</button>
    </div>
    <div class="coupons">
      <table>
        <thead>
          <tr>
            <td>Due_Date</td>
            <td>Title</td>
            <td>Code</td>
            <td>Percent</td>
            <td>Is_Enabled</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coupon, index) in updateCouponList" :key="index">
            <td>{{ dateTransfer(coupon.due_date) }}</td>
            <td>{{ coupon.title }}</td>
            <td>{{ coupon.code }}</td>
            <td>{{ coupon.percent }}</td>
            <td>{{ coupon.is_enabled == 1 ? "啟用" : "未啟用" }}</td>
            <td>
              <button class="edit" @click="editBtnController(coupon)">
                Edit
              </button>
              <button class="delete" @click="deleteCoupon(coupon.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <div class="left-btn">
        <button
          @click.prevent="dataStore.getCouponList(pagination.current_page - 1)"
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
          @click.prevent="dataStore.getCouponList(pages)"
        >
          {{ pages }}
        </button>
      </div>
      <div class="right-btn">
        <button
          @click.prevent="dataStore.getCouponList(pagination.current_page + 1)"
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
// import currency from "@/utils/filters/currency"; // 小數點
import type { Coupon } from "@/@types";

// const products = ref(); //產品List
const dataStore = useDataStore();

const modelConfigController = ref(modelConfig); //控制模型

const isLoading = ref(false);

const updateCouponList = computed(() => dataStore.updateCouponList);

const pagination = computed(() => dataStore.couponPagination);

// 建立新優惠券
const createNewCoupon = () => {
  return (
    (modelConfigController.value.createNewCoupon = true),
    (modelConfigController.value.editCoupon = false)
  );
};

const deleteCoupon = async (id: string) => {
  isLoading.value = true;
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/coupon/${id}`;
  try {
    const response = await axios.delete(api);
    console.log(response);
    console.log("刪除成功");
  } catch (error) {
    console.log(error);
    console.log("刪除失敗");
  } finally {
    dataStore.getCouponList();
    isLoading.value = false;
  }
};

const editBtnController = (coupon: Coupon) => {
  modelConfigController.value.editCoupon = true;
  modelConfigController.value.createNewCoupon = true;
  modelConfigController.value.couponId = coupon;
};

const dateTransfer = (t: number) => {
  if (!t) return;
  return new Date(t * 1000).toISOString().replace("T", " ").substring(0, 19);
};

dataStore.getCouponList();
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
