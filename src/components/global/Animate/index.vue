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
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

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
      tl.to(imageRun.value, {
        opacity: 0,
        duration: 1,
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

onMounted(() => {
  imageRun.value = document.querySelector(`.image-${currentIndex.value + 1}`);
  imageMovie();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
