import Vue from "vue";
import VueRouter from "vue-router";
import EmailListing from "../views/EmailListing.vue";
import EmailEdit from "../views/EmailEdit.vue";
import VueMaterial from "vue-material";
import VueSimpleAccordion from "vue-simple-accordion";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/black-green-light.css";

import FomoListing from "../views/fomo/FomoListing.vue";
import FomoSelectTemplate from "../views/fomo/SelectTemplates.vue";
import FomoEditTemplate from "../views/fomo/EditTemplates.vue";

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
    path: "/view/fomo",
    name: "FomoListing",
    component: FomoListing
  },
  {
    path: "/view/fomo/config/:fomoId",
    name: "FomoSelectTemplate",
    props: true,
    component: FomoSelectTemplate
  },
  {
    path: "/view/fomo/edit/:fomoId",
    name: "FomoEditTemplate",
    props: true,
    component: FomoEditTemplate
  }
];

const router = new VueRouter({
  routes
});

export default router;
