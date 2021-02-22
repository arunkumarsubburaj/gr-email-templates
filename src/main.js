import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
     
window.Config = {
  callback_url: "https://gr-v1.devam.pro",
  cdn_img_url: "https://gr-v1.devam.pro/public",
  cdn_raw_url: "https://gr-v1.devam.pro/public",
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#email-app");
