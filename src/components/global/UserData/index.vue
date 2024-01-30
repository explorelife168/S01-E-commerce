<template>
  <div class="userData-wrap">
    <loading v-model:active="isLoading" />
    <div class="userData-container">
      <div class="userData-header" v-text="'Basic Information Of Order'"></div>
      <div class="userData-body">
        <div class="userData-left">
          <form action="">
            <div class="userData-name">
              <label for="name">Name:</label>
              <input type="text" v-model="dataInfo.name" />
            </div>
            <div class="userData-email">
              <label for="email">E-mail:</label>
              <input type="text" v-model="dataInfo.email" />
            </div>
            <div class="userData-tel">
              <label for="tel">Tel:</label>
              <input type="text" v-model="dataInfo.tel" />
            </div>
            <div class="userData-address">
              <label for="address">Address:</label>
              <input type="text" v-model="dataInfo.address" />
            </div>
          </form>
        </div>
        <div class="userData-right">
          <div class="form-left">
            <form action="">
              <div class="userData-message">
                <label for="message">Message:</label>
                <textarea
                  name="message"
                  id=""
                  v-model="dataInfo.message"
                ></textarea>
              </div>
            </form>
            <div class="form-btn">
              <div class="back-btn">
                <button @click="closeInfo">Back</button>
              </div>
              <div class="next-btn">
                <button @click.prevent="createOrder">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";
import router from "@/router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { modelConfig } from "../../models/S01/modelConfig";
import useDataStore from "../../../stores/useDataStore";
// import currency from "../../../utils/filters/currency";
import config from "../../../../config/dev.env";

interface DataInfo {
  name: string;
  email: string;
  tel: string;
  address: string;
  message: string;
}

const dataStore = useDataStore();

const modelConfigController = ref(modelConfig);

const dataInfo = ref<DataInfo>({
  name: "FontEnd Test Personnel",
  email: "testapi@gmail.com",
  tel: "0000-000-000",
  address: "Taipei",
  message: "Test only",
});

// const selectQuantity = ref(1);

const isLoading = ref(false);

const closeInfo = (): boolean => {
  return (modelConfigController.value.userDataSwitch = false);
};

const createOrder = async () => {
  isLoading.value = true;
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/order`;
  try {
    const response = await axios.post(api, {
      data: {
        user: {
          name: dataInfo.value.name,
          email: dataInfo.value.email,
          tel: dataInfo.value.tel,
          address: dataInfo.value.address,
        },
        message: dataInfo.value.message,
      },
    });
    dataStore.getCartsItem();
    closeInfo();
    if (response.data.success) {
      isLoading.value = false;
      router.push(`/customer_payOrder/${response.data.orderId}`);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
