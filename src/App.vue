<template>
  <circle-progress
    :percent="percent"
    :viewport="true"
    :is-shadow="true"
    :is-bg-shadow="true"
    :show-percent="true"
    :unit="'%'"
  />
  <circle-progress :viewport="true" :is-gradient="true" />
  <circle-progress :viewport="true" :show-percent="true" :unit="'Acres'" />
  <circle-progress
    :is-bg-shadow="true"
    :bg-shadow="{
      inset: true,
      vertical: 2,
      horizontal: 2,
      blur: 4,
      opacity: 0.4,
      color: '#000000'
    }"
    empty-color="#f7f7f7"
    :border-width="6"
    :border-bg-width="30"
  />
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "App",
  setup() {
    const percent = ref(75);

    onMounted(() => {
      setInterval(() => {
        if (percent.value === 25) {
          percent.value = 75;
        } else {
          percent.value = 25;
        }
      }, 1000);
    });

    return {
      percent
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
