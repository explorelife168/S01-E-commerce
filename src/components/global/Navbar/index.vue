<template>
  <div class="Navbar-wrap">
    <div class="title">
      <div
        class="logo"
        :style="{
          'background-image': `url(${require('@/assets/image/Vissla_Logo.png')})`,
        }"
      ></div>
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
// import axios, { AxiosResponse } from "axios";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import router from "@/router";
import useDataStore from "@/stores/useDataStore";
// import config from "../../../../config/dev.env";

const dataStore = useDataStore();

// const signIn = () => {
//   router.push("/login");
// };

// const signOut = () => {
//   const api = `${config.API_PATH}/logout`;
//   axios.post(api).then((res: AxiosResponse) => {
//     console.log(res.data);
//     if (res.data.success) {
//       router.push("/login");
//     }
//   });
// };

dataStore.checkSingIn();
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
