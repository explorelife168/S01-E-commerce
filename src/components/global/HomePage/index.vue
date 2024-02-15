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

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const images = ref([
  "HOME-PAGE-BANNER-ECO_ZY.png",
  "HOME-PAGE-MAIN-NEW-SEAS.png",
  "HOME-PAGE-MANTLE-SLIDER_CREATORS.png",
]);

const currentIndex = ref(0);

const imageRun = ref();

const imageMovie = () => {
  const animateImage = () => {
    gsap.set(imageRun.value, { x: window.innerWidth, opacity: 0 });

    gsap.to(imageRun.value, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(imageRun.value, {
          opacity: 0,
          duration: 0.5,
          delay: 2,
          onComplete: () => {
            currentIndex.value = (currentIndex.value + 1) % images.value.length;
            imageRun.value = document.querySelector(
              `.image-${currentIndex.value + 1}`
            );
            animateImage();
          },
        });
      },
    });
  };
  animateImage();
};
onMounted(() => {
  imageRun.value = document.querySelector(`.image-${currentIndex.value + 1}`);
  if (imageRun.value) {
    imageMovie();
  }
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
