<template>
  <div class="image-wrap">
    <div class="container">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="`image-${index + 1}`"
        :style="{
          'background-image': `url(${require(`@/assets/image/${image}`)})`,
        }"
        @click="toShop"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import router from "@/router";

const images = ref([
  "HOME-PAGE-BANNER-ECO_ZY.png",
  "HOME-PAGE-MANTLE-SLIDER_CREATORS.png",
  "HOME-PAGE-MAIN-NEW-SEAS.png",
]);

const currentIndex = ref(0);
const imageRun = ref();

const imageMovie = () => {
  let tl = gsap.timeline();

  tl.to(imageRun.value, {
    opacity: 1,
    duration: 1,
    onComplete: () => {
      console.log("onComplete-1");
      tl.to(imageRun.value, {
        opacity: 0,
        duration: 1,
        delay: 3,
        onComplete: () => {
          currentIndex.value = (currentIndex.value + 1) % images.value.length;
          imageRun.value = document.querySelector(
            `.image-${currentIndex.value + 1}`
          );
          imageMovie();
        },
      });
    },
  });
  tl.play();
};
const toShop = () => {
  router.push("/customer_order");
};
onMounted(() => {
  imageRun.value = document.querySelector(`.image-${currentIndex.value + 1}`);
  imageMovie();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
