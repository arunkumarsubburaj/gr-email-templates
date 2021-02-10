import Vue from "vue";
import VueRouter from "vue-router";
import EmailListing from "../views/EmailListing.vue";
import EmailEdit from "../views/EmailEdit.vue";
import VueMaterial from "vue-material";
import VueSimpleAccordion from 'vue-simple-accordion';
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/black-green-light.css";


import FomoListing from "../views/fomo/FomoListing.vue";

Vue.use(VueMaterial);
Vue.use(VueSimpleAccordion);

Vue.use(VueRouter);

const routes = [
  {
    path: "/view/email/templates/",
    name: "EmailListing",
    component: EmailListing
  },
  {
    path: "/view/email/templates/:emailId",
    name: "EmailEdit",
    props: true,
    component: EmailEdit
  },
  {
    path: "/view/fomo/templates/",
    name: "FomoListing",
    component: FomoListing
  }
];

const router = new VueRouter({
  routes
});

export default router;
