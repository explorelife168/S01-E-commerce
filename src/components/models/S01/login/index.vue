<template>
  <div class="login-wrap">
    <form class="login-container" @submit.prevent="signIn">
      <div
        class="logo"
        :style="{ 'background-image': `url(${require('@/assets/logo.png')})` }"
      ></div>
      <div class="title" v-html="'Please sign in'"></div>

      <div class="input">
        <input
          v-model="user.username"
          type="text"
          placeholder="Email address"
        />
        <input v-model="user.password" type="text" placeholder="Password" />
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="remember-me"
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Remember me
        </label>
      </div>
      <div class="btn-sign-in">
        <button type="submit">Sign in</button>
      </div>
      <div class="data" v-html="`© 2017-${currentYears}`"></div>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosResponse } from "axios";
import { ref, onMounted, reactive } from "vue";
import router from "@/router";
import config from "../../../../../config/dev.env";

const currentYears = ref(0);
const user = reactive({
  username: "",
  password: "",
});

onMounted(() => {
  getYears();
});

const getYears = () => {
  const now = new Date();
  const years = now.getFullYear();
  currentYears.value = years;
};

const signIn = () => {
  const api = `${config.API_PATH}/admin/signin`;
  axios.post(api, user).then((res: AxiosResponse) => {
    console.log(res.data);
    if (res.data.success) {
      const token = res.data.token;
      const expired = res.data.expired;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      router.push("/admin/products");
    }
  });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
