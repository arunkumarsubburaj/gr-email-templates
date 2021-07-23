import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";

import VueMaterial from "vue-material";
import VueSimpleAccordion from "vue-simple-accordion";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/black-green-light.css";

Vue.use(Vuelidate);

Vue.use(VueMaterial);
Vue.use(VueSimpleAccordion);

Vue.config.productionTip = false;

if (window.location.origin.includes("localhost")) {
  window.Config = {
    callback_url: "https://gr-v1.devam.pro",
    cdn_img_url: "https://gr-v1.devam.pro/public",
    cdn_raw_url: "https://gr-v1.devam.pro/public",
    s3_image_url: "https://s3.us-east-1.amazonaws.com/devam.pro/gr/master",
  };
}

// FOMO API
var hostname = window.location.hostname;
var pathname = window.location.pathname;

if (hostname == "localhost") {
  Vue.prototype.$callback_url = "https://logesh.devam.pro/gr/";
} else if (pathname.includes("/gr/")) {
  Vue.prototype.$callback_url = "https://" + hostname + "/gr/";
} else {
  Vue.prototype.$callback_url = "https://" + hostname + "/";
}

Vue.prototype.$shop_id = "1916";
Vue.prototype.$email = "logesh@appsmav.com";
Vue.prototype.$asset_url = `${Vue.prototype.$callback_url}/public`;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#email-app");
