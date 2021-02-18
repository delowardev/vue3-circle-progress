<template>
  <Progress :viewport="true" :is-shadow="true" :is-bg-shadow="true" />
  <Progress :viewport="true" :is-gradient="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
  <Progress :viewport="true" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Progress from "./components/Progress.vue";

export default defineComponent({
  name: "App",
  components: {
    Progress
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
