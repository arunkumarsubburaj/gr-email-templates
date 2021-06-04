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
        </div>
        <div
          class="md-layout-item md-size-60 templateSection"
          v-if="templateData"
        >
          <div class="template activeTemplate">
            <figure class="template-inner">
              <img :src="activeTemplate.attributes.image_url" alt="" />
            </figure>
            <figcaption class="template-info">
              <p>{{ activeTemplate.attributes.name }}</p>
              <router-link :to="`/view/fomo/edit/${fomoId}/${template.id}`">
                <md-button class="md-raised">
                  <span>Edit</span>
                </md-button>
              </router-link>
            </figcaption>
          </div>
          <div class="display-flex align-items-start otherTemplates">
            <div
              class="template"
              v-for="template in templateData.filter(
                v => v.attributes.is_activated == 0
              )"
              :key="template.id"
            >
              <figure class="template-inner">
                <img :src="template.attributes.image_url" alt="" />
              </figure>
              <figcaption class="template-info">
                <p>{{ template.attributes.name }}</p>
                <router-link :to="`/view/fomo/edit/${fomoId}/${template.id}`">
                  <md-button class="md-raised">
                    <span>Select & Edit</span>
                  </md-button>
                </router-link>
              </figcaption>
            </div>
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
    <Loader :status="loader" />
  </div>
</template>
<script>
import Axios from "axios";
import FomoDisplaySetup from "@/components/fomo/FomoDisplaySetup.vue";
import FomoRewardSetup from "@/components/fomo/FomoRewardSetup.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "SelectTemplates",
  components: { FomoDisplaySetup, FomoRewardSetup, Loader },
  mixins: ["renderTemplate"],
  data: function() {
    return {
      fomoId: this.$route.params.fomoId,
      fomoData: null,
      templateData: null,
      contentData: null,
      activeEdit: false,
      loader: false
    };
  },
  computed: {
    rInfo: function() {
      return this.fomoData.reward_settings;
    },
    dInfo: function() {
      return this.fomoData.display_settings;
    },
    activeTemplate: function() {
      return this.templateData.find(item => item.attributes.is_activated == 1);
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
      this.loader = true;
      Axios.post(
        `https://logesh.devam.pro/gr/fomo/updateDisplaySettings?id_shop=1916&admin_email=logesh@appsmav.com`,
        this.createFormData({ ...params, id: this.fomoId })
      ).then(res => {
        console.log(res);
        this.fomoData.display_settings = params;
        this.loader = false;
      });
    },
    saveRewards: function(params) {
      this.loader = true;
      Axios.post(
        `https://logesh.devam.pro/gr/fomo/updateRewards?id_shop=1916&admin_email=logesh@appsmav.com`,
        this.createFormData({ ...params, id: this.fomoId })
      ).then(res => {
        console.log(res);
        this.loader = false;
        this.fomoData.reward_settings = params;
      });
    }
  },
  mounted: function() {
    Axios.get(
      `https://logesh.devam.pro/gr/fomo/getDetails?id=${this.fomoId}&id_shop=1916&admin_email=logesh@appsmav.com`
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
  .otherTemplates {
    width: 100%;
  }
  .template {
    width: 33%;
    margin: 0px 20px;
    position: relative;

    &-inner {
      margin: 0;
      background: #262321;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      &:before {
        content: "";
        display: block;
        padding-bottom: 80%;
      }
      &.active {
        background-color: #43ef9f;
      }
      img {
        width: 90%;
        position: absolute;
      }
    }
    &-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &.activeTemplate {
      width: calc(100% - 40px);
      max-width: 100%;
      margin-bottom: 1em;
      figure {
        &:before {
          content: "";
          display: block;
          padding-bottom: 50%;
        }
      }
    }
  }
}
</style>
