<template>
  <div class="changeTemplateView">
    <div class="fixedHeaderBlock">
      <div class="fixedHeaderBlockInner">
        <a class="link-back" @click.prevent="handleBack">
          <i class="fa fa-long-arrow-left"
            ><md-tooltip md-direction="right">Back</md-tooltip></i
          >
        </a>
        <div class="title">
          <div class="icon far fa-bookmark margin-right-10"></div>
          <span>Signup Bonus FOMO</span>
        </div>
      </div>
    </div>

    <div class="container fomoContainer">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-40 configSection">
          <md-content class="md-elevation-6">
            <md-tabs class="fomo-tabs">
              <md-tab id="tab-rewards" md-label="Rewards Setup">
                Rewards Tab
              </md-tab>
              <md-tab id="tab-config" md-label="FOMO Config">
                Config Tab
              </md-tab>
              <md-tab id="tab-display" md-label="Display Rules">
                Display Tab
              </md-tab>
            </md-tabs>
          </md-content>
        </div>
        <div
          class="md-layout-item md-size-60 templateSection"
          v-if="templateData"
        >
          <div
            class="template"
            v-for="template in templateData"
            :key="template.id"
          >
            <figure class="template-inner"></figure>
            <figcaption class="template-info">
              <p>Template</p>
              <md-button
                :to="'../../../view/fomo/templates/' + templateData.id"
                class="md-raised"
              >
                <span v-if="template.status == 1"> Edit </span>
                <span v-else>Select & Edit</span>
              </md-button>
            </figcaption>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";

export default {
  name: "SelectTemplates",
  mixins: ["renderTemplate"],
  data: function() {
    return {
      fomoData: null,
      templateData: null,
      contentData: null
    };
  },

  methods: {
    handleBack: function() {
      window.history.back();
    }
  },
  mounted: function() {
    Axios.get("fomo/config-fomo.json").then(({ data }) => {
      this.fomoData = data.data;
      this.templateData = data.data.templates;
    });
  }
};
</script>
<style lang="less" scoped>
.fomoContainer {
  margin: 0 50px;
  display: flex;
  max-width: 1600px;
  margin-top: 100px;
}

// .configSection {
//   width: 40%;
//   max-width: 400px;
// }

.templateSection {
  display: flex;
  flex-flow: row wrap;

  .template {
    flex: 1 1 50%;
    max-width: calc(50% - 10px);
    margin: 0px 0px 10px 10px;
    position: relative;
    margin-bottom: 20px;

    &-inner {
      margin: 0;
      background: #262321;
      min-height: 300px;
      position: relative;
    }
    &-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
