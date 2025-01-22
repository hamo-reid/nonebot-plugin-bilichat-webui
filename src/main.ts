import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueForm from "@lljj/vue3-form-naive";
import {
  create,
  NButton,
  NForm,
  NInput,
  NFormItem,
  NInputNumber,
  NSwitch,
  NSelect,
} from "naive-ui";

const naive = create({
  components: [
    NButton,
    NInput,
    NForm,
    NFormItem,
    NInputNumber,
    NSwitch,
    NSelect,
  ],
});

const app = createApp(App);
app.component("VueForm", VueForm);
app.use(naive);
app.mount("#app");
