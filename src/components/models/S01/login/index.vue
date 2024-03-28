<template>
  <div class="login-wrap">
    <form class="login-container" @submit.prevent="signIn">
      <div
        class="logo"
        :style="{
          'background-image': `url(${require('@/assets/image/Vissla_Logo.png')})`,
        }"
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
import { ref, onMounted, reactive } from "vue";
import router from "@/router";
import config from "../../../../../config/dev.env";
import errInterceptors from "@/errInterceptors";

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
  const response = await errInterceptors.post(api, user);
  if (response.data.success) {
    const token = response.data.token;
    const expired = response.data.expired;
    document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
    router.push("/");
  } else {
    console.log(response.data);
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
