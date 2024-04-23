<template>
  <div class="Navbar-wrap">
    <!-- <div class="title"> -->
    <div
      class="logo"
      :style="{
        'background-image': `url(${require('@/assets/image/Vissla_Logo.png')})`,
      }"
      @click="toHomePage"
    ></div>

    <div class="userIcon">
      <font-awesome-icon
        :icon="
          loginStatus ? 'fa-solid fa-right-from-bracket' : 'fa-regular fa-user'
        "
        @click="loginStatus ? signOut() : toLogin()"
      />
    </div>

    <!-- <div class="userIcon" v-if="!dataStore.signInCheck">
        <font-awesome-icon icon="fa-regular fa-user" @click="toLogin" />
      </div>
      <div class="signOutIcon" v-if="dataStore.signInCheck">
        <font-awesome-icon
          icon="fa-solid fa-right-from-bracket"
          @click="signOut"
        />
      </div> -->
    <div class="admin-Link" v-if="dataStore.signInCheck">
      <div class="admin" @click="toggleDropdown">
        <p>Admin</p>
        <ul v-show="showDropdown" ref="dropdownMenu">
          <li>
            <router-link to="/admin_products">Product List</router-link>
          </li>
          <li>
            <router-link to="/admin_order_status">Order Status</router-link>
          </li>
          <li>
            <router-link to="/admin_coupon">Coupon</router-link>
          </li>
          <li>
            <router-link to="/customer_order">Orders</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import axios, { AxiosResponse } from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "@/router";
import gsap from "gsap";
import useDataStore from "@/stores/useDataStore";
import config from "../../../../config/dev.env";
// import errInterceptors from "@/errInterceptors";

const dataStore = useDataStore();

const showDropdown = ref(false);

const dropdownMenu = ref();

const loginStatus = computed(() => dataStore.getLoginStatus);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;

  if (showDropdown.value) {
    gsap.to(dropdownMenu.value, { opacity: 1, duration: 1 });
  } else {
    gsap.to(dropdownMenu.value, { opacity: 0, duration: 0.6 });
  }
};
const signOut = () => {
  const api = `${config.API_PATH}/logout`;
  axios.post(api).then((res: AxiosResponse) => {
    console.log(res.data);
    if (res.data.success) {
      router.push("/login");
      dataStore.actionLoginStatus();
      clearAllCookie();
      console.log("document.cookie(登出):", document.cookie);
    }
  });
};
const toHomePage = () => {
  router.push("/homepage");
};

const toLogin = () => {
  router.push("/login");
};

const clearAllCookie = () => {
  var keys = document.cookie.match(/[^ =;]+(?=)/g);
  if (keys) {
    for (var i = keys.length; i--; )
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
  }
};
// const checkSingIn = async () => {
//   const api = `${config.API_PATH}/api/user/check`;
//   const response = await errInterceptors.post(api);
//   if (response.data.success) {
//     console.log("登入狀態為(Navbar):", response.data.success);
//   } else {
//     console.log("登入狀態為(Navbar):", response.data.success);
//   }
// };
// checkSingIn();
// dataStore.checkSingIn();
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
