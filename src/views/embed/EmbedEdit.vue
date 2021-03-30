// eslint-disable-next-line
/* eslint-disable */

<template>
  <div class="embedEdit">
    <div class="fixedTopNav">
      <div class="level1">
        <span class="material-icons" @click="$router.push('../embed/landing')"
          >arrow_back</span
        >
        <span>Embed Campaign</span>
      </div>
      <div class="topCta">
        <md-button class="md-raised" @click.prevent="sendTestEmail"
          >Sent Test Email</md-button
        >
        <md-button @click.prevent="handleSave" class="md-raised md-accent"
          >Save</md-button
        >
      </div>
    </div>

    <div class="editWrap">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-30">
          <md-list :md-expand-single="true">
            <md-list-item md-expand md-expanded>
              <span class="md-list-item-text">Subject</span>

              <div slot="md-expand">
                <div class="subjectEditor">
                  <span>Subject for your email:</span>
                </div>
              </div>
            </md-list-item>
          </md-list>
        </div>

        <div class="md-layout-item md-size-70">
          <div class="previewBlock">
            <div class="ctaBlock">
              <div class="views">
                <span class="material-icons active">laptop</span>
                <span class="material-icons mobile">ad_units</span>
              </div>
              <md-button class="md-raised btn-custom-default">
                Preview
              </md-button>
            </div>
            <div class="info">Announcements: Earn Points every time you shop. One dollar = five points.</div>            
            <div class="">
              <img src="../../assets/img/template_header.png" alt="" />
            </div>
            <div class="cardBlock">
              <div class="item">
                <CelebrateEvents />
              </div>
              <div class="item">
                <ParticipateActions />
              </div>
              <div class="item">
                <Newsletter />
              </div>
              <div class="item">
                <ReferNearn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loader :status="loader" />

    <Footer />
  </div>
</template>

<script>
//import Axios from "axios";
import Loader from "@/components/Loader.vue";
import Footer from "../../components/Footer.vue";
import ParticipateActions from "../../components/ParticipateActions.vue";
import Newsletter from "../../components/Newsletter.vue";
import ReferNearn from "../../components/ReferNearn.vue";
import CelebrateEvents from "../../components/CelebrateEvents.vue";
//import Carouselslide from "../../components/Carouselslide.vue";

export default {
  name: "EmailEdit",
  components: {
    //ColorPicker,
    //CustomVariables,
    Loader,
    //quillEditor,
    Footer,
    ParticipateActions,
    Newsletter,
    ReferNearn,
    CelebrateEvents,
    //Carouselslide
  },
  mixins: ["createFormData", "renderTemplate"],
  data: function() {
    return {
      loader: false,
    };
  },
  computed: {
  },
  methods: {
  },
  mounted: function() {
  }
};
</script>

<style lang="less" scoped>
.embedEdit {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  .fixedTopNav {
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 9;
    display: flex;
    justify-content: space-between;

    .level1 {
      display: flex;
      align-items: center;
      font-weight: bold;
      span:first-child {
        border-right: 1px solid #d1d1d1;
        text-align: center;
        margin-right: 20px;
        padding: 10px 15px;
        cursor: pointer;
      }
    }

    .topCta {
      margin: 4px 10px;
    }
  }

  .editWrap {
    margin-top: 60px;
    width: 100%;
    padding: 0 20px;
  }

  .subjectEditor {
    span {
      display: block;
      color: #007aff;
      font-size: 14px;
      line-height: 18px;
      font-weight: 600;
      padding-bottom: 10px;
    }
    input[type="text"] {
      border: 1px solid #dcdcdc;
      color: #484848;
      font-size: 15px;
      line-height: 18px;
      width: 100%;
      padding: 10px;
    }
  }

  margin: 0 0 7em 0;
  
  .color-picker .color-picker-container {
    position: relative;
    right: 30px;
    top: 8px;
    padding: 0px;
    margin: 0;
    z-index: 12;
    vertical-align: baseline;
    background: none;
    border: none;
    display: inline;
    .vc-chrome {
      position: relative;
      right: -30px;
      top: -8px;
    }
  }

  .md-list {
    padding: 0;
  }
  .editorContent {
    padding: 20px;
  }

  .subTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      color: #007aff;
      font-size: 14px;
    }
  }

  input.form-control {
    padding: 5px;
    border: 1px solid #d2d2d2;
    font-size: 14px;
    width: 100%;
  }

  .previewBlock {
    background: #fff;
    border: 1px solid #e8e8e8;

    .ctaBlock {
      border-bottom: 1px solid #e8e8e8;
      padding: 10px;
      display: flex;
      justify-content: space-between;

      .views {
        background: #dfdfdf;
        border-radius: 4px;
        overflow: hidden;

        .material-icons {
          padding: 10px 20px;
          font-size: 16px;
          color: #6d6d6d;
          cursor: pointer;
          &:hover {
            background: #d1d1d1;
          }
        }

        .mobile {
          -ms-transform: rotate(180deg); /* IE 9 */
          transform: rotate(180deg); /* Standard syntax */
        }

        .active {
          background: #333333;
          color: #fff;
        }
      }
    }

    .info {
      background: #cfeff5;
      color: #505eac;
      padding: 5px 10px;
      font-size: 12px;
      text-align: center;
    }
    .cardBlock {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;

        .celebrateEvents,
        .newsLetter {
          width: calc(100% - 20px);
          margin: 20px 0 0 20px;
        }

        .referNearn {
          width: calc(100% - 40px);
          margin: 20px 20px 0 20px;
        }

        .partiAction {
          margin: 0 20px 20px 10px;
          padding: 0;
        }
      }
    }
  }
}
</style>
<style lang="less">
:root {
  --md-theme-default-accent: #5bb74d !important;
  --md-theme-default-text-primary-on-accent: #ffffff !important;
}
.md-button.md-theme-default.md-raised:not([disabled]) {
  border: 1px solid #d1d1d1;
}
.md-button:first-child {
  margin: 0 15px 0 0;
}
</style>
