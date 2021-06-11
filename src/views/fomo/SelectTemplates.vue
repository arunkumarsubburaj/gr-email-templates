<template>
  <div class="changeTemplateView">
    <div class="fixedHeaderBlock">
      <div class="fixedHeaderBlockInner">
        <a
          class="link-back"
          @click.prevent="handleBack"
          v-if="activeEdit == false"
        >
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
          <md-card class="mb-20" v-if="fomoData.config_settings">
            <md-card-content>
              <div class="innerConfigSection">
                <div class="handBand">
                  <h3>This FOMO :</h3>
                  <i
                    class="fas fa-edit editIcn"
                    v-on:click.stop.prevent="activeEdit = 'rewards'"
                  ></i>
                </div>
              </div> </md-card-content
          ></md-card>
          <md-card class="mb-20">
            <md-card-content>
              <div class="innerConfigSection">
                <div class="handBand">
                  <h3>This FOMO :</h3>
                  <i
                    class="fas fa-edit editIcn"
                    v-on:click.stop.prevent="activeEdit = 'rewards'"
                  ></i>
                </div>
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
              </div>
            </md-card-content>
          </md-card>
          <md-card class="mb-20">
            <md-card-content>
              <div class="innerConfigSection">
                <div class="handBand">
                  <h3>This FOMO is :</h3>
                  <i
                    class="fas fa-edit editIcn"
                    v-on:click.stop.prevent="activeEdit = 'display'"
                  ></i>
                </div>
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
              </div>
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
              <router-link
                :to="`/view/fomo/edit/${fomoId}/${activeTemplate.id}`"
              >
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
      this.$router.push("../");
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

  .md-card {
    box-shadow: none;
    border: 1px solid #d1d1d1;

    .md-card-content {
      padding: 0;
      &:last-of-type {
        padding-bottom: 24px;
      }
    }
  }

  .configSection {
    h2,
    h3 {
      margin-top: 0;
      color: #333;
    }
    .innerConfigSection {
      .handBand {
        display: flex;
        align-items: baseline;
        background: #187aff;
        padding: 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid #d1d1d1;
        color: #fff;
        h3 {
          color: #fff;
          flex: 100%;
          margin: 0;
        }
        .editIcn {
          text-align: right;
          cursor: pointer;
        }
      }

      ul {
        margin: 0;
        padding-right: 24px;
      }
    }
  }
}

.poppin {
  width: 100%;
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
<style lang="less">
@rewardColor: #f8f8f8;
@pointsColor: #f3f3f3;
.poppin {
  .topControl.formSubmit {
    position: fixed;
    top: 12px;
    z-index: 9999;
    right: 12px;
    justify-content: flex-end;
    .md-button {
      margin-left: 10px;
    }
  }
  h2 {
    margin-top: 0;
  }

  label.md-checkbox-label {
    display: flex;
    align-items: center;
    height: auto;
    .fas {
      margin-left: 10px;
      font-size: 20px;
    }
  }
  .bLabel {
    .fas {
      margin-left: 10px;
      font-size: 20px;
    }
  }

  .displaySetting {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;

    @media only screen and (max-width: 599px) {
      flex-direction: column;
    }

    .setupMode {
      border: 1px solid #d1d1d1;
      border-bottom: none;
      background: #fff;

      @media only screen and (max-width: 599px) {
        margin-bottom: 20px;
      }
      .head {
        padding: 0 20px;
        color: #333;
        font-weight: bold;
        border-bottom: 1px solid #d1d1d1;
      }
      .body {
        background: lighten(@rewardColor, 30%);
        border-bottom: 1px solid #d1d1d1;
      }
      .md-field {
        padding-top: 0;
        min-height: 32px;
      }
    }
  }

  .md-checkbox.md-theme-default .md-checkbox-container {
    border-color: rgba(51, 51, 51, 1);
    --md-theme-default-background: #000;
    --md-theme-default-accent: #fff;
  }
  .text-info {
    line-height: 1.2;
    .material-icons {
      padding-right: 10px;
      color: #5988bc;
    }
  }
}
</style>
