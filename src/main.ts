import { createApp } from "vue";
import App from "./App.vue";
import CircleProgress from "./entry";

const app = createApp(App);

app.component("circle-progress", CircleProgress);

app.mount("#app");
