<template>
  <Progress
    :viewport="true"
    :is-shadow="true"
    :is-bg-shadow="true"
    :percent="percent"
  />
  <Progress :viewport="true" :is-gradient="true" :percent="percent" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Progress from "./components/Progress.vue";

export default defineComponent({
  name: "App",
  components: {
    Progress
  },
  setup() {
    const percent = ref(10);

    setInterval(() => {
      if (percent.value > 99) {
        percent.value = 0;
      }
      percent.value += 1;
    }, 100);

    return {
      percent
    };
  }
});
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
