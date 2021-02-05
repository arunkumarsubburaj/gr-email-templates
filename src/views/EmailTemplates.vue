<template>
  <div class="changeTemplateView">
    <div class="container">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-75"><h1>Choose template</h1></div>
        <div class="md-layout-item md-size-25">
          <md-button class="md-raised">+ Create a blank email </md-button>
        </div>
        <section class="md-layout-item">
          <div
            class="templateBox"
            v-for="template in data"
            :key="template.id_theme"
          >
            <div class="boxView">
              <div v-if="template" v-html="renderTemplate(template)"></div>
            </div>
            <div class="boxFooter">
              <div>
                <h4>{{ template.tpl_name }}</h4>
                <small>Template description</small>
              </div>
              <md-button
                class="md-raised md-accent"
                v-if="template.status == 1"
                @click="e => save(template.id_theme)"
              >
                activated
              </md-button>
              <md-button class="md-raised" v-else @click="e => save(template.id_theme)">
                Preview & Edit
              </md-button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EmailTemplates",
  props: ["data", "close", "save"],
  mixins: ["renderTemplate"],
};
</script>
<style lang="less" scoped>
.changeTemplateView {
  padding: 40px 0 20px;
  section {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
  }
}
.templateBox {
  width: 48%;
  display: flex;
  flex-direction: column;
  margin: 25px 0;
  .boxView {
    flex-grow: 1;
    background-color: #DDEFEF;
    > div {
      zoom: 0.5;
      width: 50%;
      margin: auto;
      display: block;
    }
  }
  .boxFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 0;
    h4 {
      margin: 0;
    }
  }
}
</style>