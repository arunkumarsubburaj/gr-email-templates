<template>
  <div class="embedStyle">
    <div class="fixedTopNav">
      <div class="level1">
        <span class="material-icons" @click="$router.push('../embed/landing')"
          >arrow_back</span
        >
        <span>Select embed style</span>
      </div>
      <div class="level2">
        <ul>
          <li v-on:click="myTab1" :class="{ active: isTab1 }">
            Individual Landing Pages
          </li>
          <li v-on:click="myTab2" :class="{ active: isTab2 }">Snippets</li>
        </ul>
      </div>
    </div>
    <!--<img src="../../assets/img/template1.png" alt="" />
    <img src="../../assets/img/template2.png" alt="" />
    <img src="../../assets/img/template3.png" alt="" />
    <img src="../../assets/img/template4.png" alt="" />
    <img src="../../assets/img/template5.png" alt="" />
    <img src="../../assets/img/template6.png" alt="" />-->
    <div v-if="isTab1" class="selectTemplateBlock">
      <h1>Select Template</h1>
      <section class="md-layout-item">
        <div
          class="templateBox"
          v-for="(template, index) in templates"
          :key="template.id"
        >
          <div class="boxView">
            <img :src="'../../img/template' + template.id + '.png'" alt="" />
          </div>
          <div class="boxFooter">
            <div>
              <!-- <h4>{{ template.tpl_name }}</h4> -->
              <small>Template {{ index + 1 }}</small>
            </div>
            <md-button class="md-raised btn-custom-default">
              Select & Edit
            </md-button>
          </div>
        </div>
      </section>
      <p class="upcomingTemplate">
        Keep an eye for the upcoming templates… We will roll out soon!
      </p>
    </div>
    <div v-if="isTab2" class="snipBlock">
      <h1>Select Template</h1>

      <vsa-list initActive>
        <!-- Here you can use v-for to loop through items  -->
        <vsa-item>
          <vsa-heading>
            Participate Actions
            <md-button class="md-raised btn-custom-default">
              Copy Embed Code
            </md-button>
          </vsa-heading>

          <vsa-content>
            <div class="partiAction">
              <div :class="'partiActions ' + 'partiActions' + index" v-for="(action, index) in actions" :key="action.id">
                <div class="imgDiv">
                  <span class="material-icons">
                    {{action.imgDiv}}
                  </span>
                </div>
                <div class="pointDiv">
                  <span class="material-icons">
                    card_giftcard
                  </span>
                  <div>
                    <span class="material-icons">
                      stars
                    </span>
                    <span>100</span>
                  </div>
                </div>
                <p>{{action.desc}}</p>
              </div>
            </div>
          </vsa-content>
        </vsa-item>
        <vsa-item>
          <vsa-heading>
            This is the heading
            <md-button class="md-raised btn-custom-default">
              Copy Embed Code
            </md-button>
          </vsa-heading>

          <vsa-content>
            This is the content
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";

export default {
  name: "EmailListing",
  components: {
    Footer
  },
  data: function() {
    return {
      isTab1: true,
      isTab2: false,
      testingCode: "1234",
      message:
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/wd-deKqm3AU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      templates: [
        { id: 1, name: "Template1", img: "template1.png" },
        { id: 2, name: "Template2", img: "template2.png" },
        { id: 3, name: "Template3", img: "template3.png" },
        { id: 4, name: "Template4", img: "template4.png" },
        { id: 5, name: "Template5", img: "template5.png" },
        { id: 6, name: "Template6", img: "template6.png" }
      ],
      actions: [
        { id: 1, imgDiv: "engineering", desc: "Visit our Facebook page and consider liking it" },
        { id: 2, imgDiv: "fact_check", desc: "Visit our Facebook page and consider liking it" },
        { id: 3, imgDiv: "facebook", desc: "Visit our Facebook page and consider liking it" },
        { id: 4, imgDiv: "public", desc: "Visit our Facebook page and consider liking it" }
      ]
    };
  },
  mixins: ["createFormData"],
  methods: {
    myTab1: function() {
      this.isTab1 = true;
      this.isTab2 = false;
    },
    myTab2: function() {
      this.isTab2 = true;
      this.isTab1 = false;
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.embedStyle {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  .fixedTopNav {
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 9;

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

    .level2 {
      display: flex;
      align-items: center;
      background: #333;
      justify-content: center;
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
          color: #777;
          font-size: 14px;
          font-weight: bold;
          display: inline-flex;
          padding: 10px 30px;
          cursor: pointer;
          &:hover {
            color: #d1d1d1;
          }
          &.active {
            color: #fff;
            position: relative;
            &:after {
              content: "";
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-bottom: 6px solid #fff;
              position: absolute;
              bottom: 0;
              left: 50%;
            }
          }
        }
      }
    }
  }

  .selectTemplateBlock,
  .snipBlock {
    padding: 120px 55px 55px 55px;

    section {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .templateBox {
        flex: 0 31%;
        margin-top: 2%;
        margin-right: 2%;
        @media only screen and (max-width: 989px) {
          flex: 0 48%;
        }
        @media only screen and (max-width: 599px) {
          flex: 0 100%;
        }
        .boxView img {
          border: 5px solid #000;
        }
        .boxFooter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0 0;
        }
      }
    }

    .upcomingTemplate {
      font-size: 12px;
      color: #c1b4b4;
      margin: 40px 0;
      text-align: center;
    }

    .partiAction {
      display: flex;
      flex-wrap: wrap;
      padding: 5px;
      margin: 20px 30px 30px 20px;
      position: relative;
      .partiActions {
        display: flex;
        padding: 20px;
        width: 150px;
        margin: 20px 0 0 2%;
        background-color: #fff;
        border: 1px solid #e8e8e8;
        flex-grow: 1;
        border-radius: 4px;
        align-items: center;
        flex-direction: column;
        text-align: center;
        .imgDiv {
          border-radius: 50%;
          border: 1px solid #fde6bb;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          .material-icons {
            font-size: 50px;
            color: #df8550;
            box-sizing: border-box;
            margin: 0;
          }
        }
        .pointDiv {
          display: flex;
          margin: 20px 0 0;
          span.material-icons {
            margin-right: 4px;
            border: 1px solid #8f75be;
            border-radius: 50%;
            color: #8f75be;
            font-size: 18px;
            padding: 6px;
          }
          div {
            background: #8f75be;
            border-radius: 25px;
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            padding: 4px 10px 4px 4px;
              span.material-icons {
                color: #fff;
                margin-right: 4px;
                font-size: 24px;
                padding: 0;
              }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.selectTemplateBlock,
  .snipBlock {
    .vsa-list {
      --vsa-max-width: 100%;
      --vsa-border-width: 0px;
      --vsa-highlight-color: rgba(190, 190, 190, 1);
      .vsa-item__trigger {
        flex-direction: row-reverse;
        justify-content: flex-end;
        border-top: 1px solid #d1d1d1 !important;
        &:focus,
        &:hover {
          outline: none;
          background-color: #f8f8f8;
          color: var(--vsa-text-color);
          .vsa-item__trigger__icon--is-default {
            &:before,
            &:after {
              background-color: var(--vsa-text-color);
            }
          }
        }
        .vsa-item__trigger__icon {
          margin-left: 0;
          margin-right: 20px;
        }
        .vsa-item__trigger__content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
      }
      .vsa-item__content {
        margin: 0;
        padding: var(--vsa-content-padding);
        background: rgb(239,239,239);
        background: linear-gradient(180deg, rgba(239,239,239,1) 0%, rgba(251,251,251,1) 100%);
      }
    }
  }
</style>