<template>
  <div class="new-coupon-container">
    <loading v-model:active="isLoading" />
    <div class="card-container">
      <div class="title">
        <div
          class="title-name"
          v-text="
            `${
              modelConfigController.editCoupon
                ? 'Edit NewCoupon'
                : 'Create NewCoupon'
            }`
          "
        ></div>
        <div class="closure">
          <button
            @click="
              (modelConfigController.createNewCoupon = false),
                (modelConfigController.createNewCoupon = false)
            "
          >
            X
          </button>
        </div>
      </div>
      <div class="content">
        <div class="input-due-date">
          <div class="input-date-text" v-text="'Due-Date'"></div>
          <input
            type="text"
            placeholder="input Due Date"
            v-model="createNewCouponDate.due_date"
          />
        </div>
        <div class="input-title">
          <div class="title-text" v-text="'Title'"></div>
          <input
            type="text"
            placeholder="input title"
            v-model="createNewCouponDate.title"
          />
        </div>
        <div class="input-percent">
          <div class="percent-text" v-text="'Percent'"></div>
          <input
            type="number"
            placeholder="input percent"
            v-model="createNewCouponDate.percent"
          />
        </div>

        <div class="input-code">
          <div class="code-text" v-text="'Code'"></div>
          <input
            type="text"
            placeholder="input code"
            v-model="createNewCouponDate.code"
          />
        </div>
        <div class="form-enable">
          <input
            class="form-enable-input"
            type="checkbox"
            id="formEnableDefault"
            v-model="createNewCouponDate.is_enabled"
            :true-value="1"
            :false-value="2"
          />
          <label class="form-enable-label" for="formEnableDefault"
            >是否啟用</label
          >
        </div>

        <div class="buttonContainer">
          <button
            class="confirm"
            @click="
              modelConfigController.editCoupon
                ? editCoupon()
                : createNewCoupon()
            "
          >
            Confirm
          </button>
          <button
            class="cancel"
            @click="
              (modelConfigController.createNewCoupon = false),
                (modelConfigController.createNewCoupon = false)
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import axios from "axios";
import { ref, computed } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { modelConfig } from "../../models/S01/modelConfig";
import useDataStore from "@/stores/useDataStore";
import config from "../../../../config/dev.env";
import errInterceptors from "@/errInterceptors";

interface CreateNewCoupon {
  title: string;
  is_enabled: number;
  percent: number;
  due_date: string | number;
  code: string;
  id: string;
  num: number;
}

const createNewCouponDate = ref<CreateNewCoupon>({
  title: "",
  is_enabled: 0,
  percent: 0,
  due_date: "",
  code: "",
  id: "",
  num: 0,
});

const modelConfigController = ref(modelConfig); //控制模型

const dataStore = useDataStore();

const isLoading = ref(false);

const editCouponData = computed(() => {
  if (modelConfigController.value.editCoupon) {
    return modelConfigController.value.couponId;
  } else {
    return createNewCouponDate.value;
  }
});

createNewCouponDate.value = { ...editCouponData.value };

const createNewCoupon = async () => {
  isLoading.value = true;
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/coupon`;

  const response = await errInterceptors.post(api, {
    data: {
      title: createNewCouponDate.value.title,
      is_enabled: createNewCouponDate.value.is_enabled,
      percent: createNewCouponDate.value.percent,
      due_date: dateTransfer(createNewCouponDate.value.due_date as string),
      code: createNewCouponDate.value.code,
    },
  });
  console.log(response);
  dataStore.getCouponList();
  modelConfigController.value.createNewCoupon = false;
  isLoading.value = false;
};

// const createNewCoupon = async () => {
//   isLoading.value = true;
//   const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/coupon`;
//   try {
//     const response = await axios.post(api, {
//       data: {
//         title: createNewCouponDate.value.title,
//         is_enabled: createNewCouponDate.value.is_enabled,
//         percent: createNewCouponDate.value.percent,
//         due_date: dateTransfer(createNewCouponDate.value.due_date as string),
//         code: createNewCouponDate.value.code,
//       },
//     });
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     dataStore.getCouponList();
//     modelConfigController.value.createNewCoupon = false;
//     isLoading.value = false;
//   }
// };

const editCoupon = async () => {
  isLoading.value = true;
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/coupon/${createNewCouponDate.value.id}`;
  const response = await errInterceptors.put(api, {
    data: {
      title: createNewCouponDate.value.title,
      is_enabled: createNewCouponDate.value.is_enabled,
      percent: createNewCouponDate.value.percent,
      due_date: dateTransfer(createNewCouponDate.value.due_date as string),
      code: createNewCouponDate.value.code,
    },
  });
  console.log(response);
  dataStore.getCouponList();
  modelConfigController.value.createNewCoupon = false;
  modelConfigController.value.editCoupon = false;
  isLoading.value = false;
};

// const editCoupon = async () => {
//   isLoading.value = true;
//   const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/admin/coupon/${createNewCouponDate.value.id}`;
//   try {
//     const response = await axios.put(api, {
//       data: {
//         title: createNewCouponDate.value.title,
//         is_enabled: createNewCouponDate.value.is_enabled,
//         percent: createNewCouponDate.value.percent,
//         due_date: dateTransfer(createNewCouponDate.value.due_date as string),
//         code: createNewCouponDate.value.code,
//       },
//     });
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     dataStore.getCouponList();
//     modelConfigController.value.createNewCoupon = false;
//     modelConfigController.value.editCoupon = false;
//     isLoading.value = false;
//   }
// };

const dateTransfer = (d: string): number => {
  const unixDate = Math.floor(new Date(d).getTime() / 1000);
  return unixDate;
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
