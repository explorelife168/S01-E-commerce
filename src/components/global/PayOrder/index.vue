<template>
  <div class="payOrder-wrap">
    <loading v-model:active="isLoading" />
    <form @submit.prevent="payOrderMoney">
      <div class="left-table">
        <table>
          <thead>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
          </thead>
          <tbody>
            <tr v-for="(list, index) in orderList" :key="index">
              <td>{{ list.product.title }}</td>
              <td>{{ list.qty }} {{ list.product.unit }}</td>
              <td>{{ currency(list.product.price) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>Total</td>
              <td>{{ currency(total) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="right-table">
        <table>
          <tbody>
            <tr>
              <th>Email</th>
              <td>{{ userData.email }}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{{ userData.name }}</td>
            </tr>
            <tr>
              <th>Addressee Phone</th>
              <td>{{ userData.tel }}</td>
            </tr>
            <tr>
              <th>receiver's address</th>
              <td>{{ userData.address }}</td>
            </tr>
            <tr>
              <th>payment status</th>
              <td :style="{ color: colorStatus ? 'green' : 'red' }">
                {{ colorStatus ? "Already Paid" : "not paid yet" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pay-btn">
        <button>pay</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
// import router from "@/router";
import { useRoute } from "vue-router";
import { ref } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
// import { modelConfig } from "../../models/S01/modelConfig";
// import useDataStore from "../../../stores/useDataStore";
import currency from "../../../utils/filters/currency";
import config from "../../../../config/dev.env";

interface GetList {
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

interface UpdateGetList {
  final_total: number;
  id: string;
  product: GetList;
  product_id: string;
  qty: number;
  total: number;
}

const route = useRoute();

const isLoading = ref(false);

const orderList = ref();

const total = ref(0);

const userData = ref({
  name: "",
  address: "",
  tel: "",
  email: "",
});

const colorStatus = ref(false);

const getOrderList = async () => {
  isLoading.value = true;
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/order/${route.params.orderId}`;
  try {
    const response = await axios.get(api);
    orderList.value = response.data.order.products as UpdateGetList;
    total.value = response.data.order.total;
    userData.value = response.data.order.user;
    colorStatus.value = response.data.order.is_paid;
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
const payOrderMoney = async () => {
  isLoading.value = true;
  const api = `${config.API_PATH}/api/${config.CUSTOM_PATH}/pay/${route.params.orderId}`;
  try {
    const response = await axios.post(api);
    console.log(response);
    getOrderList();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
    // router.push("/customer_order");
  }
};

getOrderList();
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
