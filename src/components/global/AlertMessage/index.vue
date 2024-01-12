<template>
  <div class="alert-message-container" v-if="dataStore().alertSwitch">
    <div class="message" v-text="`${alertMessage}`"></div>
    <div class="close-button">
      <button @click="alertSwitchController">x</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useDataStore from "../../../stores/useDataStore";

const dataStore = useDataStore;

// const alertSwitch = ref(true);
// const messages = ref([
//   {
//     message: "測試3",
//     status: "danger",
//     timestamp: 123,
//   },
// ]);

const alertMessage = computed(() => {
  if (!dataStore().message) return;
  return dataStore().message;
});

const alertSwitchController = () => {
  dataStore().alertSwitch = false;
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
