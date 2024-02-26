<template>
  <div class="Navbar-wrap">
    <div class="title">
      <div
        class="logo"
        :style="{
          'background-image': `url(${require('@/assets/image/Vissla_Logo.png')})`,
        }"
        @click="toHomePage"
      ></div>
      <div class="userIcon" v-if="!dataStore.signInCheck">
        <font-awesome-icon icon="fa-regular fa-user" @click="toLogin" />
      </div>
      <div class="signOutIcon" v-if="dataStore.signInCheck">
        <font-awesome-icon
          icon="fa-solid fa-right-from-bracket"
          @click="signOut"
        />
      </div>
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

      <!-- <div class="right-icon">
        <font-awesome-icon
          icon="fa-solid fa-right-to-bracket"
          class="sign-in"
          @click.prevent="signIn"
          v-if="!dataStore.signInCheck"
        />
        <font-awesome-icon
          icon="fa-solid fa-right-from-bracket"
          @click.prevent="signOut"
          class="sign-out"
          v-if="dataStore.signInCheck"
        />
      </div> -->
    </div>
    <!-- <div class="block"></div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios, { AxiosResponse } from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "@/router";
import gsap from "gsap";
import useDataStore from "@/stores/useDataStore";
import config from "../../../../config/dev.env";

const dataStore = useDataStore();

const showDropdown = ref(false); // 控制下拉菜单的显示状态

const dropdownMenu = ref();

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value; // 切换显示状态

  // 如果显示下拉菜单，则执行展开动画，否则执行收起动画
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
    }
  });
};
const toHomePage = () => {
  router.push("/homepage");
};

const toLogin = () => {
  router.push("/login");
};
dataStore.checkSingIn();
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
