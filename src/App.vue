<template>
  <circle-progress
    :viewport="true"
    :is-shadow="true"
    :is-bg-shadow="true"
    :percent="percent"
  />
  <circle-progress :viewport="true" :is-gradient="true" />
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
export default {
  name: "App"
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
