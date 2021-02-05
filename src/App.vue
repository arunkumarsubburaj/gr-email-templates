<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import Home from "@/views/Home.vue";
import Vue from "vue";
import VueMaterial from "vue-material";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";
import "@/assets/icon/fontawesome.min.css";

Vue.use(VueMaterial);
Vue.use(CKEditor);

// GLOBAL MIXINS - HELPER FUNCTIONS
Vue.mixin({
  methods: {
    renderTemplate: (data) =>
      data.email_template.length > 5
        ? data.email_template.replace(/\[\[(.*?)\]]/g, (full, property) =>
            data.json_fields[property]
              ? data.json_fields[property].value
              : property
          )
        : "<div>Invalid Template</div>",
    createFormData: (data) => {
      let formData = new FormData();
      for (let key in data) {
        if (typeof data[key] === "object") {
          for (let subKey in data[key]) {
            formData.append(`${key}[${subKey}]`, data[key][subKey]);
          }
        } else {
          formData.append(key, data[key]);
        }
      }
      return formData;
    },
  },
});

export default {
  name: "app",
};
</script>

<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: #fafafa;
  }

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.switch {
  font-size: 14px;
  display: inline-block;
  height: 1.7em;
  position: relative;
  width: 3.3em;
  margin: 0;

  input {
    display: none;
  }

  i {
    background-color: #d12e2e;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
    border-radius: 34px;
    border: 1px solid #d12e2e;

    &:before {
      background-color: #fff;
      top: 0;
      left: 0;
      content: "";
      height: 1.25em;
      position: absolute;
      transition: 0.4s;
      margin: 0.15em;
      width: 1.3em;
      border-radius: 50%;
    }
  }

  input:checked + i {
    background-color: #2ed176;
    border-color: #ccc;
    color: #fff;
    content: "oui";
    &:before {
      transform: translateX(1.6em);
      background-color: fff;
    }
  }
}

.container {
  margin: auto;
  max-width: 1024px;
  padding: 0 20px;
}
</style>
