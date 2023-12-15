<template>
  <div class="login-wrap">
    <div class="login-container">
      <div
        class="logo"
        :style="{ 'background-image': `url(${require('@/assets/logo.png')})` }"
      ></div>
      <div class="title" v-html="'Please sign in'"></div>

      <div class="input">
        <input type="text" placeholder="Email address" />
        <input type="text" placeholder="Password" />
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
        <button>Sign in</button>
      </div>
      <div class="data" v-html="`© 2017-${currentYears}`"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const currentYears = ref(0);

onMounted(() => {
  getYears();
});

const getYears = () => {
  const now = new Date();
  const years = now.getFullYear();
  currentYears.value = years;
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
