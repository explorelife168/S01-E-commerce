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
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import router from "@/router";
import config from "../../../../../config/dev.env";

const currentYears = ref(0);

const user = reactive({
  username: "testapi@gmail.com",
  password: "123456789",
});

onMounted(() => {
  getYears();
});

const getYears = () => {
  const now = new Date();
  const years = now.getFullYear();
  currentYears.value = years;
};

const signIn = async () => {
  const api = `${config.API_PATH}/admin/signin`;
  try {
    const response = await axios.post(api, user);
    if (response.data.success) {
      const token = response.data.token;
      const expired = response.data.expired;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
      console.log(document.cookie);
    }
  } catch (error) {
    console.log(error);
  } finally {
    router.push("/");
  }
};

const checkSingIn = async () => {
  const api = `${config.API_PATH}/api/user/check`;
  try {
    const response = await axios.post(api);
    if (response.data.success) {
      console.log("signIn");
    } else {
      console.log("unSignIn");
    }
  } catch (error) {
    console.log(error);
  }
};
checkSingIn();
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
