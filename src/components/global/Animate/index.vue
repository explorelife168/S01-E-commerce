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
        :ref="`image-${index + 1}`"
        @click="toShop"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
// import { ref } from "vue";
// import router from "@/router";
import { gsap } from "gsap";

const images = ref([
  "HOME-PAGE-BANNER-ECO_ZY.png",
  "HOME-PAGE-MANTLE-SLIDER_CREATORS.png",
  "HOME-PAGE-MAIN-NEW-SEAS.png",
]);

const currentIndex = ref(2);

const imageMovie = () => {
  const imageRun = document.querySelector(`.image-${currentIndex.value + 1}`);
  if (!imageRun) return;
  // console.log(imageRun);
  gsap.to(imageRun, {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.inOut",
    onComplete: () => {
      console.log("complete-1");
      gsap.to(imageRun, {
        opacity: 0,
        duration: 0.5,
        delay: 3,
        onComplete: () => {
          console.log("complete-2");
          startImageMovie();
        },
      });
    },
  });
};

const startImageMovie = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;

  console.log("currentIndex.value:", currentIndex.value);
  imageMovie();
};

const toShop = () => {
  startImageMovie();
};

onMounted(() => {
  startImageMovie();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
