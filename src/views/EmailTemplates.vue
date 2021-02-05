<template>
  <div>
    <h1>Choose email templates</h1>
    <div class="md-layout md-gutter">
      <div class="md-layout-item" v-for="template in data" :key="template.id_theme">
        <md-card>
          <md-card-media>
            <div v-if="template" v-html="renderTemplate(template)"></div>
          </md-card-media>
          <md-card-header>
            <div class="md-title">{{ template.tpl_name }}</div>
          </md-card-header>
          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
            itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          </md-card-content>
          <md-card-actions>
            <md-button v-if="template.status == 1" @click="close"
              >activated</md-button
            >
            <md-button v-else @click="save">Preview & Edit</md-button>
          </md-card-actions>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EmailTemplates",
  props: ["data", "active", "close", "save"],
  mixins: ["renderTemplate"],
};
</script>