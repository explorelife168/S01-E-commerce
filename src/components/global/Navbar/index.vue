<template>
  <div class="Navbar-wrap">
    <div class="title">
      <div class="left-title" v-text="'Company name'"></div>
      <div class="right-title">
        <button class="sign-out" @click.prevent="signOut">Sign Out</button>
      </div>
    </div>
    <div class="block"></div>
  </div>
</template>

<script lang="ts" setup>
import axios, { AxiosResponse } from "axios";
import router from "@/router";
import config from "../../../../config/dev.env";

const signOut = () => {
  const api = `${config.API_PATH}/logout`;
  axios.post(api).then((res: AxiosResponse) => {
    console.log(res.data);
    if (res.data.success) {
      router.push("/login");
    }
  });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
