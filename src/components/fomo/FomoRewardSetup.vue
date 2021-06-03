<template>
  <div>
    <h1>Reward Setup</h1>
    <div class="displaySetting">
      <div class="md-layout md-gutter" style="flex-grow: 1">
        <div class="md-layout-item md-size-50 rewardsMode">
          <div class="setupMode">
            <div class="head">
              <md-checkbox
                v-model="formData.mode_instant"
                :true-value="1"
                :false-value="0"
                >Give an instant reward?
                <i class="fas fa-question-circle"
                  ><md-tooltip md-direction="right"
                    >Check this, if you'd like to reveal an instant offer /
                    coupon as soon as users complete this action.</md-tooltip
                  ></i
                ></md-checkbox
              >
            </div>
            <div class="body p-20" v-if="formData.mode_instant == 1">
              <div class="radioTabs">
                <md-radio v-model="formData.instant_reward_opt" :value="1"
                  >Coupon</md-radio
                >
                <md-radio v-model="formData.instant_reward_opt" :value="3"
                  >Redirect to link</md-radio
                >
                <md-radio v-model="formData.instant_reward_opt" :value="0"
                  >Image / Text</md-radio
                >
              </div>
              <div>
                <!-- If only Coupon -->
                <div class="coupon" v-if="formData.instant_reward_opt == 1">
                  <div class="light radioTabs">
                    <md-radio v-model="formData.reward_type" :value="1"
                      >Automagic</md-radio
                    >
                    <md-radio v-model="formData.reward_type" :value="0"
                      >Common</md-radio
                    >
                  </div>
                  <div v-if="formData.reward_type == 1">
                    <small
                      class="text-info display-flex align-items-center mt-20"
                    >
                      <span class="material-icons">info</span>
                      <span>
                        We will automatically create coupon codes in your web
                        store.
                      </span>
                    </small>
                    <div>
                      <h6 class="bLabel mt-20">
                        Coupon type
                        <i class="fas fa-question-circle"
                          ><md-tooltip md-direction="right"
                            >Choose from the options provided</md-tooltip
                          ></i
                        >
                      </h6>
                      <div class="cType display-flex flex-direction-column">
                        <md-radio
                          v-model="formData.realtime_coupon_type"
                          :value="1"
                          >Percentage off the order total</md-radio
                        ><md-radio
                          v-model="formData.realtime_coupon_type"
                          :value="2"
                          >Fixed amount off the order total</md-radio
                        ><md-radio
                          v-model="formData.realtime_coupon_type"
                          :value="3"
                          >Free shipping</md-radio
                        >
                      </div>
                    </div>
                    <div v-if="formData.realtime_coupon_type !== 3">
                      <h6 class="bLabel mt-20">
                        Coupon value *
                        <i class="fas fa-question-circle"
                          ><md-tooltip md-direction="right"
                            >Fixed value or percentage amount to take off. Enter
                            value without the currency unit or a percent
                            sign</md-tooltip
                          ></i
                        >
                      </h6>
                      <md-field>
                        <md-input
                          v-model="formData.realtime_coupon_value"
                        ></md-input>
                      </md-field>
                    </div>
                    <div>
                      <h6 class="bLabel mt-20">
                        Minimum spend (optional)
                        <i class="fas fa-question-circle"
                          ><md-tooltip md-direction="right"
                            >The minimum amount a customer must spend to be
                            eligible for this coupon.</md-tooltip
                          ></i
                        >
                      </h6>
                      <md-field>
                        <md-input
                          v-model="formData.realtime_min_order"
                        ></md-input>
                      </md-field>
                    </div>
                  </div>
                  <div v-else>
                    <small
                      class="text-info display-flex align-items-center mt-20"
                    >
                      <span class="material-icons">info</span>
                      <span>
                        Note - This common coupon code will immediately appear
                        when users complete this action.
                      </span>
                    </small>
                    <h6 class="bLabel mt-20">
                      Enter coupon *
                      <i class="fas fa-question-circle"
                        ><md-tooltip md-direction="right"
                          >Enter a single coupon code</md-tooltip
                        ></i
                      >
                    </h6>
                    <md-field>
                      <md-input
                        v-model="formData.instant_reward_cpn"
                      ></md-input>
                    </md-field>
                  </div>
                </div>
                <!-- If only Coupon -->
                <!-- If only Redirect link -->
                <div v-if="formData.instant_reward_opt == 3">
                  <small
                    class="text-info display-flex align-items-center mt-20"
                  >
                    <span class="material-icons">info</span>
                    <span>
                      Redirect users to a desired location when they complete
                      this action.
                    </span>
                  </small>
                  <h6 class="bLabel mt-20">
                    Enter Redirect URL *
                    <i class="fas fa-question-circle"
                      ><md-tooltip md-direction="right"
                        >Enter the URL. Users who complete this action will be
                        redirected to this URL</md-tooltip
                      ></i
                    >
                  </h6>
                  <md-field>
                    <md-input v-model="formData.instant_reward_lnk"></md-input>
                  </md-field>
                </div>
                <!-- If only Redirect link -->
                <!-- If only image/txt -->
                <small
                  v-if="formData.instant_reward_opt == 0"
                  class="text-info display-flex align-items-center mt-20"
                >
                  <span class="material-icons">info</span>
                  <span>
                    Note: If neither a coupon or link is suitable, a
                    description/image will be shown. Provide users with a
                    description and/or image detailing your reward
                  </span>
                </small>
                <!-- If only image/txt -->
                <h6 class="bLabel mt-20">Instructions of redemption</h6>
                <md-field>
                  <md-textarea
                    v-model="formData.instant_reward_text"
                  ></md-textarea>
                </md-field>
                <h6 class="bLabel mt-20">
                  Instant Reward Image *
                  <i class="fas fa-question-circle"
                    ><md-tooltip md-direction="right"
                      >The image which displays your reward will appear
                      immediately when users complete this action. Please make
                      sure your reward is clearly mentioned.</md-tooltip
                    ></i
                  >
                </h6>
                <small class="display-flex">
                  Recommended width is {{ formData.instant_reward.width }} x
                  {{ formData.instant_reward.height }} pixels. (Images must be
                  GIF, JPEG, JPG, PNG and maximum of 2MB Limit).
                </small>
                <ImgUploadPreview :data="formData.instant_reward" />
              </div>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-size-50 pointsMode">
          <div class="setupMode">
            <div class="head">
              <md-checkbox
                v-model="formData.mode_points"
                :true-value="1"
                :false-value="0"
                >Points Mode
                <i class="fas fa-question-circle"
                  ><md-tooltip md-direction="right"
                    >Award Points for this action</md-tooltip
                  ></i
                ></md-checkbox
              >
            </div>
            <div class="body p-20" v-if="formData.mode_points == 1">
              <h6 class="bLabel">
                Enter # Reward Points *
                <i class="fas fa-question-circle"
                  ><md-tooltip md-direction="right"
                    >Enter the # Points you want to reward to users for
                    completing this action</md-tooltip
                  ></i
                >
              </h6>
              <md-field>
                <md-input v-model="formData.worth_entries"></md-input>
              </md-field>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="displaySetting formSubmit">
      <md-button class="md-raised" @click.prevent="close">Cancel</md-button>
      <md-button class="md-raised md-accent" @click.prevent="handleSave"
        >Save</md-button
      >
    </div>
  </div>
</template>
<script>
import ImgUploadPreview from "@/components/ImgUploadPreview.vue";

export default {
  name: "FomoRewardSetup",
  props: ["data", "close", "save"],
  components: { ImgUploadPreview },
  data: function() {
    return {
      formData: { ...this.data },
      errors: {}
    };
  },
  computed: {},
  methods: {
    handleSave: function() {
      this.save(this.formData);
    }
  }
};
</script>
<style lang="less">
.head .md-checkbox.md-theme-default .md-checkbox-container {
  border-color: rgba(255, 255, 255, 0.5);
  --md-theme-default-background: #000;
  --md-theme-default-accent: #fff;
}
</style>
<style lang="less" scoped>
@rewardColor: #f0ad4e;
@pointsColor: #42a2bf;
.bLabel {
  font-size: 1em;
  font-weight: 600;
  color: #000;
  margin: 0;
}
.displaySetting {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
  justify-content: space-between;
}
.setupMode {
  .head {
    padding: 0 20px;
    color: #fff;
    font-weight: bold;
  }
  .body {
    background: lighten(@rewardColor, 30%);
  }
  .md-field {
    padding-top: 0;
    min-height: 32px;
  }
}
.text-info {
  padding: 10px;
}
.cType {
  margin-bottom: 30px;
  --md-theme-default-accent: #000;
  .md-radio {
    margin: 10px 0 0;
  }
}
.rewardsMode {
  .head {
    background: @rewardColor;
  }
  .body {
    background: lighten(@rewardColor, 30%);
  }
  .text-info {
    background: lighten(@rewardColor, 35%);
  }
}
.pointsMode {
  .head {
    background: @pointsColor;
  }
  .body {
    background: lighten(@pointsColor, 30%);
  }
  .text-info {
    background: lighten(@pointsColor, 35%);
  }
}
.radioTabs {
  border-bottom: 2px solid @rewardColor;
  width: 100%;
  clear: both;
  .md-radio::v-deep {
    background: #f3d7b0;
    font-size: 13px;
    padding: 8px 10px;
    margin: 0;
    .md-radio-label {
      padding-left: 8px;
      font-weight: bold;
      flex-grow: 1;
    }
    &.md-checked {
      background: @rewardColor;
      --md-theme-default-accent: #fff;
    }
  }
  &.light {
    border-bottom-width: 0;
    display: flex;
    margin: 5px 0;
    .md-radio {
      flex-grow: 1;
    }
  }
}
.splitDiv {
  width: 48%;
}
.visibleTo {
  display: flex;
  align-items: center;
  h6 {
    width: 40%;
  }
}
span.status-btn {
  padding: 0.2em 1em;
  color: #000;
  border: 1px solid;
  margin: 0 0.5em;
  border-radius: 2em;
  display: inline-flex;
  align-items: center;
  opacity: 0.4;
  cursor: pointer;
  &.active {
    opacity: 1;
  }
}
.text-info {
  line-height: 1.2;
  .material-icons {
    padding-right: 10px;
  }
}
.formSubmit {
  justify-content: flex-end;
  .md-button {
    margin-left: 10px;
  }
}
</style>
