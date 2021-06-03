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

    <div class="container fomoContainer" v-if="fomoData">
      <div class="md-layout md-gutter" v-if="activeEdit == false">
        <div class="md-layout-item md-size-40 configSection">
          <h2>FOMO Summary</h2>
          <md-card v-if="fomoData.config_settings">
            <md-card-content> config info </md-card-content>
          </md-card>
          <md-card class="mb-20">
            <md-card-content>
              <h4>This FOMO :</h4>
              <ul>
                <li>
                  {{
                    rInfo.mode_points == 1
                      ? `Has enabled Points Mode with ${rInfo.worth_entries} reward points`
                      : "Has disabled Points Mode"
                  }}
                </li>
                <li>
                  {{
                    rInfo.mode_instant == 1
                      ? `Is providing Instant reward as ${
                          rInfo.instant_reward_opt == 1
                            ? "Coupon"
                            : rInfo.instant_reward_opt == 3
                            ? "Redirection link"
                            : "Image Or Text"
                        }`
                      : "Has disabled Instant Reward"
                  }}
                </li>
                <li
                  v-if="
                    rInfo.mode_instant == 1 && rInfo.instant_reward_opt == 1
                  "
                >
                  Is providing Coupons as
                  {{
                    rInfo.reward_type == "runique"
                      ? "Automagic Coupons"
                      : "Common Coupons"
                  }}
                </li>
                <li
                  v-if="
                    rInfo.mode_instant == 1 &&
                      rInfo.instant_reward_opt == 1 &&
                      rInfo.reward_type == 'runique'
                  "
                >
                  Coupon type is
                  {{
                    rInfo.realtime_coupon_type == 1
                      ? "Percentage off the order total"
                      : rInfo.realtime_coupon_type == 2
                      ? "Fixed amount off the order total"
                      : "Free shipping"
                  }}
                </li>
                <li
                  v-if="
                    rInfo.mode_instant == 1 &&
                      rInfo.instant_reward_opt == 1 &&
                      rInfo.reward_type == 'runique'
                  "
                >
                  Minimum spend value is {{ rInfo.currency
                  }}{{ rInfo.realtime_min_order }}
                </li>
                <li
                  v-if="
                    rInfo.mode_instant == 1 &&
                      rInfo.instant_reward_opt == 1 &&
                      rInfo.reward_type == 'runique' &&
                      rInfo.realtime_coupon_type !== 3
                  "
                >
                  Coupon value is
                  {{
                    rInfo.realtime_coupon_type == 1
                      ? `${rInfo.realtime_coupon_value}%`
                      : `${rInfo.currency}${rInfo.realtime_coupon_value}`
                  }}
                </li>
                <li
                  v-if="
                    rInfo.mode_instant == 1 && rInfo.instant_reward_opt == 3
                  "
                >
                  Goto
                  <a :href="rInfo.instant_reward_lnk" target="_blank"
                    >Redirection URL</a
                  >
                </li>
              </ul>
              <md-button
                size="small"
                v-on:click.stop.prevent="activeEdit = 'rewards'"
                class="md-raised md-accent"
                >Edit</md-button
              >
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-content>
              <h4>This FOMO is :</h4>
              <ul>
                <li>Visible to {{ dInfo.visible_to }}</li>
                <li v-if="dInfo.show_on_home_page">
                  Displayed only in home page
                </li>
                <li v-else>
                  {{
                    dInfo.show_on_pages.length
                      ? `Displayed on pages ${dInfo.show_on_pages}`
                      : "Displayed on all pages"
                  }}
                </li>
                <li v-if="dInfo.show_on_first_visit == 1">
                  Displayed on first visit only
                </li>
                <li>
                  positioned at
                  {{ contentData.prompt_positions[dInfo.position] }}
                </li>
              </ul>
              <md-button
                size="small"
                v-on:click.stop.prevent="activeEdit = 'display'"
                class="md-raised md-accent"
                >Edit</md-button
              >
            </md-card-content>
          </md-card>
          <!-- <md-content class="md-elevation-6"></md-content> -->
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
            <figure
              class="template-inner"
              :class="{ active: template.attributes.is_activated == 1 }"
            >
              <img :src="template.attributes.image_url" alt="" />
            </figure>
            <figcaption class="template-info">
              <p>{{ template.attributes.name }}</p>
              <md-button
                :to="'../../../view/fomo/templates/' + templateData.id"
                class="md-raised"
              >
                <span v-if="template.attributes.is_activated == 1"> Edit </span>
                <span v-else>Select & Edit</span>
              </md-button>
            </figcaption>
          </div>
        </div>
      </div>
      <div v-else class="poppin">
        <FomoRewardSetup
          v-if="activeEdit == 'rewards'"
          :data="fomoData.reward_settings"
          :id="fomoId"
          :close="closePopin"
          :save="saveRewards"
        />
        <FomoDisplaySetup
          v-if="activeEdit == 'display'"
          :data="fomoData.display_settings"
          :save="saveDisplay"
          :content="contentData"
          :close="closePopin"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import FomoDisplaySetup from "@/components/fomo/FomoDisplaySetup.vue";
import FomoRewardSetup from "@/components/fomo/FomoRewardSetup.vue";

export default {
  name: "SelectTemplates",
  components: { FomoDisplaySetup, FomoRewardSetup },
  mixins: ["renderTemplate"],
  data: function() {
    return {
      fomoId: this.$route.params.fomoId,
      fomoData: null,
      templateData: null,
      contentData: null,
      activeEdit: false
    };
  },
  computed: {
    rInfo: function() {
      return this.fomoData.reward_settings;
    },
    dInfo: function() {
      return this.fomoData.display_settings;
    }
  },
  methods: {
    handleBack: function() {
      window.history.back();
    },
    closePopin: function() {
      this.activeEdit = false;
    },
    saveDisplay: function(params) {
      Axios.post(
        `https://logesh.devam.pro/gr/fomo/updateDisplaySettings?id_shop=1902&admin_email=jayakumar@appsmav.com`,
        this.createFormData({ ...params, id: this.fomoId })
      ).then(res => {
        console.log(res);
        this.fomoData.display_settings = params;
      });
    },
    saveRewards: function(params) {
      Axios.post(
        `https://logesh.devam.pro/gr/fomo/updateRewards?id_shop=1902&admin_email=jayakumar@appsmav.com`,
        this.createFormData({ ...params, id: this.fomoId })
      ).then(res => {
        console.log(res);
        this.fomoData.reward_settings = params;
      });
    }
  },
  mounted: function() {
    Axios.get(
      `https://logesh.devam.pro/gr/fomo/getDetails?id=${this.fomoId}&id_shop=1902&admin_email=jayakumar@appsmav.com`
    ).then(({ data }) => {
      const { attributes, relationship, includes } = data;
      this.fomoData = attributes;
      this.contentData = relationship;
      this.templateData = includes.templates;
    });
  }
};
</script>
<style lang="less" scoped>
.fomoContainer {
  margin: 0 auto;
  display: flex;
  max-width: 1600px;
  min-height: 100vh;
  overflow: visible;
  padding-top: 100px;
}

.poppin {
  width: 100%;
  color: #000;
  max-width: 1200px;
  margin: auto;
}

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
      display: flex;
      align-items: center;
      justify-content: center;
      &.active {
        background-color: #43ef9f;
      }
      img {
        width: 90%;
      }
    }
    &-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
