<template>
  <div class="changeTemplateView">
    <div class="fixedHeaderBlock">
      <div class="fixedHeaderBlockInner">
        <div class="linkBackBlock">
          <router-link :to="'../../../view/fomo/listing/'" class="link-back">
            <i class="fa fa-long-arrow-left"></i>
          </router-link>
          <div class="title">
            <md-icon class="icon margin-right-10">bookmark_outline</md-icon>
            <span>Signup bonus Fomo</span>
          </div>
        </div>
        <div class="header_block-status">
          visible only to:
          <span class="status-btn">
            All visitors
          </span>
          <span class="status-btn status-btn-active dis-flex-noJustify">
            <md-icon class="icon-checkmark">done</md-icon>
            <span>Logged out</span>
          </span>
          <span class="status-btn">
            Logged in
          </span>
          <span class="status-btn status-btn-active dis-flex-noJustify">
            <md-icon class="icon-checkmark">done</md-icon>
            <span>Guest</span>
          </span>
        </div>
      </div>
    </div>

    <div class="info_block" v-bind:class="[{ disabled: !isActive }]">
      <div class="info_block-spacing">
        <h4 class="font-size-14">Welcome bonus points</h4>
        <p v-if="isActive">
          100 points = $5 <a href="#" class="info-link-blue">Change</a>
        </p>
      </div>
      <div class="info_block-spacing">
        <div class="form-group">
          <input
            type="text"
            id=""
            class="form-control form-control-sm"
            value="100"
            style="width: 60px;min-width: 0;vertical-align: initial;margin: 0 8px;"
            maxlength="6"
            :disabled="!isActive"
          />
          <span>point(s)</span>
        </div>
      </div>
      <div class="info_block-spacing highAlert">
        <label class="switch margin-bottom-0" for="toggle_button">
          <input
            type="checkbox"
            name="mainSwitch"
            id="toggle_button"
            :checked="isActive"
            @click="changeDisabled()"
          />
          <i></i>
        </label>
        <span class="enabled" v-if="isActive">Enabled</span>
        <span v-if="!isActive">Disabled</span>
        <div v-if="!isActive" class="popBox">
          <i class="fa fa-long-arrow-left"></i>
          Enable welcome bonus point (Reward users when sign up)
        </div>
      </div>
      <md-button
        v-if="isActive"
        @click.prevent="handleSave"
        class="md-raised md-accent"
        >Save</md-button
      >
    </div>

    <div class="fomo_inner_block">
      <div class="header_block">
        <h2>Select template</h2>
      </div>
      <div class="choose_template_block">
        <div
          class="template"
          v-bind:class="[{ disabled: !isActive }]"
          v-for="template in templates"
          :key="template.id"
        >
          <div class="template-overlay"></div>
          <p class="template-overlay-msg">
            Enable welcome bonus points to use this template
          </p>
          <div class="template-inner">
            <div :class="'template-inner-' + template.id">
              <div :class="'template-inner-' + template.id + '-inner'">
                <md-icon class="btn-close" v-if="template.btnClose !== ''">{{
                  template.btnClose
                }}</md-icon>
                <a
                  v-if="template.linkClose !== ''"
                  href="#"
                  class="link-close"
                  >{{ template.linkClose }}</a
                >
                <p v-if="template.subTitle !== ''">{{ template.subTitle }}</p>
                <h3 v-if="template.title !== ''">{{ template.title }}</h3>
                <p v-if="template.desc !== ''">{{ template.desc }}</p>
                <a v-if="template.btnSignup !== ''" href="#" class="btn">{{
                  template.btnSignup
                }}</a>
                <div v-if="template.count !== ''" class="pts rotate">
                  {{ template.count }}
                  <p>{{ template.countDesc }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="template-info">
            <p>Welcome Bonus Point</p>
            <a href="#" class="btn btn-edit">Select & Edit</a>
          </div>
        </div>
      </div>

      <p class="upcomingTemplate">
        Keep an eye for the upcoming templates... We will roll out soon!
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectTemplates",
  props: ["data", "close", "save"],
  mixins: ["renderTemplate"],
  data: function() {
    return {
      isChecked: false,
      isActive: false,

      templates: [
        {
          id: "1",
          subTitle: "",
          title:
            "Sign up now and explore exclusive deals for this festive seasons",
          desc: "",
          btnSignup: "SIGN UP NOW",
          count: "",
          countDesc: "",
          btnClose: "close",
          linkClose: ""
        },
        {
          id: "2",
          subTitle: "Hi FRIEND,",
          title: "Sign up now to get welcome points!",
          desc: "",
          btnSignup: "",
          count: "100",
          countDesc: "welcome points",
          btnClose: "",
          linkClose: "Close"
        },
        {
          id: "3",
          subTitle: "Hi FRIEND,",
          title: "Sign up now to get exicting offers!",
          desc: "",
          btnSignup: "Sign up",
          count: "",
          countDesc: "",
          btnClose: "close",
          linkClose: ""
        },
        {
          id: "4",
          subTitle: "",
          title: "HEY FRIEND!",
          desc:
            "Sign up now and explore exiciting deals during this festive seasons",
          btnSignup: "Sign up now",
          count: "",
          countDesc: "",
          btnClose: "",
          linkClose: "Close"
        },
        {
          id: "5",
          subTitle: "",
          title: "New to [[website_Name]]?",
          desc:
            "Sign up now and explore exclusive deals for this festive seasons",
          btnSignup: "Sign up now",
          count: "",
          countDesc: "",
          btnClose: "close",
          linkClose: ""
        },
        {
          id: "6",
          subTitle: "",
          title: "CONGRATULATIONS!",
          desc: "Sign up and explore exiciting deals + Coupon",
          btnSignup: "GRCOUPON",
          count: "",
          countDesc: "",
          btnClose: "close",
          linkClose: ""
        }
      ]
    };
  },

  methods: {
    changeDisabled() {
      this.isActive = !this.isActive;
    }
  }
};
</script>
<style lang="less" scoped>
.fixedHeaderBlock .fixedHeaderBlockInner {
  justify-content: space-between;
  width: 100%;

  .linkBackBlock {
    display: flex;
    align-items: center;
  }

  .title {
    border-right: 1px solid #eaeaea;

    .icon {
      height: 35px;
    }
  }
}

.header_block-status {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.info_block {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fef9ec;
  border-bottom: 1px solid #ebecec;
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  color: #333;
  margin: 0 0 20px;
  padding: 15px 0;

  &.disabled {
    background: #ebecec;
  }

  .displayNone {
    display: none;
  }

  .info_block-spacing {
    padding: 0 20px;

    .form-group {
      margin: 10px 0;
    }

    h4,
    p {
      margin: 0;
    }

    .btn-space {
      padding: 8px 25px;
    }
  }

  .icon-info {
    margin-right: 10px;
  }

  .info-link-blue {
    color: #007aff !important;
    margin-left: 10px;
  }
}

/* PopBox */
.popBox {
  position: absolute;
  background: #326ae0;
  color: #fff;
  padding: 20px;
  border-radius: 0 20px 20px 20px;
  top: 45px;
  z-index: 1;
  width: 250px;
  line-height: 13px;
  font-size: 11px;
  display: flex;

  i {
    padding-right: 10px;
  }
}
.highAlert {
  position: relative;
  display: flex;
  align-items: center;

  span {
    font-size: 12px;
    margin-left: 10px;
    color: #d12e2e;

    &.enabled {
      color: #1bcc69;
    }
  }
}

.md-raised.md-accent {
  border: 0;
  font-weight: bold;
  color: #fff !important;
}

.changeTemplateView {
  margin: 4em 0;
  overflow: hidden;
}

.templateBox {
  width: 48%;
  display: flex;
  flex-direction: column;
  margin: 25px 0;
  .boxView {
    flex-grow: 1;
    background-color: #ddefef;
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
/* Choosed template */

.fomo_inner_block {
  margin: 0 50px;
}
.header_block {
  display: flex;
  margin-top: 50px;
  margin-bottom: 20px;
}
.header_block h2 {
  font-size: 20px;
  color: #333;
  line-height: 23px;
}

/* Choose template */
.choose_template_block {
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 0 -10px;

  .template {
    flex: 1 1 33.33%;
    max-width: calc(33.33% - 10px);
    margin: 0px 0px 10px 10px;
    position: relative;
    margin-bottom: 20px;

    &.disabled .template-overlay {
      position: absolute;
      background: #fff;
      display: flex;
      width: 100%;
      height: 100%;
      opacity: 0.5;
      z-index: 9;
    }

    .template-overlay-msg {
      display: none;
    }

    &.disabled .template-overlay-msg {
      display: block;
      background: #ffe5bd;
      color: #dd3636;
      font-size: 11px;
      position: absolute;
      line-height: 13px;
      z-index: 99;
      padding: 10px;
      font-weight: bold;
      text-align: center;
      width: 100%;
      border: 1px solid #e3d1b4;
      border-bottom: 0;
      margin: 0;
    }

    .template-inner {
      background: #262321;
      min-height: 300px;
      position: relative;
      overflow: hidden;
      letter-spacing: normal;

      .btn-close {
        color: #474747;
        border-radius: 50%;
        background: #fff;
        font-size: 0;
        padding: 5px;
        position: absolute;
        top: -8px;
        right: -8px;

        &:hover,
        &:focus {
          text-decoration: none;
        }
      }

      .link-close {
        color: #eee;
        font-size: 12px;
        padding: 5px;
        text-decoration: underline;
        position: absolute;
        right: calc(50% - 20px);
        bottom: -40px;
      }
    }
  }
}
.choose_template_block .template .template-inner .btn,
.preview_block-template .btn {
  transition: 0.18s;
  animation: shake 1.4s linear infinite both;
}
.choose_template_block .template .template-inner .btn:hover,
.preview_block-template .btn:hover {
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  animation: none;
}
.choose_template_block .template {
  .template-info {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    align-items: center;

    p {
      margin: 0;
      color: #333;
      font-size: 14px;
    }

    .btn-edit {
      border: 1px solid #007aff;
      padding: 5px 15px;
      color: #007aff;

      &:hover {
        background: #eee;
        border: 1px solid #ccc;
        color: #333;
      }
    }

    &.disabled .template-info .btn-edit {
      border: 1px solid #ccc;
      color: #ccc;
    }
  }
}

.fadein {
  opacity: 0;
  -moz-transition: opacity 1.5s;
  -webkit-transition: opacity 1.5s;
  -o-transition: opacity 1.5s;
  transition: opacity 1.5s;
}

body.loaded .fadein {
  opacity: 1;
}

.upcomingTemplate {
  font-size: 12px;
  color: #ccc;
  margin: 40px 0;
  text-align: center;
}
</style>

<style lang="less">
.md-icon {
  font-size: 18px !important;
}

.status-btn {
  border-radius: 20px;
  margin: 5px 10px;
  padding: 3px 10px 3px 10px;
  display: flex;
  align-items: center;
  font-size: 9px;
  line-height: 17px;
  text-transform: uppercase;
  border: 1px solid #ccc;

  &.status-btn-active {
    border: 1px solid #007aff;
    color: #007aff;
  }

  .icon-checkmark {
    border: 1px solid #007aff;
    border-radius: 50%;
    padding: 3px;
    font-size: 7px;
    margin-right: 5px;
    margin-left: -5px;

    &.md-icon {
      font-size: 8px !important;
      min-width: auto;
      height: 14px;
      width: 14px;
      font-weight: bold;
      color: #007aff;
    }
  }
}

.text-info {
  margin: 5px 0;
  align-items: flex-start;
  display: flex;

  &.small {
    font-size: 12px;
    margin-top: 4px;
    color: #4099c5;
  }

  .material-icons {
    margin-right: 10px;
  }
}

.note.small {
  margin: 4px 0;
  opacity: 0.6;
  font-size: 85%;
}

/* Template 1 */
.template-inner-1 {
  background: #ffad00;
  bottom: 40px;
  padding: 25px 25px;
  width: 65%;
  border-radius: 0 0 65px 0;
  position: absolute;
  transition: transform 3s;

  h3 {
    margin: 0 0 10px 0;
    font-size: 12px;
    color: #333;
    line-height: 19px;
    letter-spacing: normal;
  }

  .btn {
    color: #fff;
    background: #a41111;
    border-radius: 20px;
    font-size: 12px;
    padding: 10px 20px;
    border: 1px solid crimson;
    box-shadow: none;
    line-height: 15px;
  }
}

/* Template 2 */
.template-inner-2 {
  background: #ffad00;
  padding: 45px 25px;
  width: 210px;
  height: 210px;
  bottom: 40px;
  position: absolute;
  text-align: center;
  border-radius: 50% 50% 50% 0;
  left: 30px;

  p {
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
    line-height: 16px;
  }

  h3 {
    margin: 0 0 30px 0;
    font-size: 19px;
    line-height: 17px;
    color: #fff;
    text-transform: uppercase;
    font-weight: normal;
    letter-spacing: normal;
  }

  .btn {
    color: #333;
    background: #fff;
    border-radius: 20px;
    font-size: 12px;
    padding: 10px 20px;
    border: 1px solid #fff;
    box-shadow: none;
  }

  .link-close {
    bottom: -30px !important;
  }

  .pts {
    height: 100px;
    border-radius: 50%;
    border: 10px solid #f3e374;
    font-size: 32px;
    color: #e1990a;
    bottom: -20px;
    padding: 10px;
    font-weight: bold;
    line-height: 38px;
    left: -15px;
    text-align: center;
    width: 100px;
    background: #fff;
    position: absolute;

    p {
      font-size: 10px;
      color: #e1990a;
      line-height: 9px;
      margin-top: 0;
    }
  }

  &:hover .pts {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    background: #f3e374;
    border-radius: 40% 40% 40% 0;
    color: #fff;

    p {
      color: #fff;
    }
  }
}

/* Template 3 */
.template-inner-3 {
  background: #15c39a;
  bottom: 60px;
  padding: 25px 25px 10px;
  width: 150px;
  position: absolute;
  text-align: center;
  left: 30px;

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0%;
    width: 0;
    height: 0;
    border-top: solid 30px #15c39a;
    border-left: solid 75px transparent;
    border-right: solid 75px transparent;
  }

  p {
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
    margin-top: 0;
  }

  h3 {
    margin: 0 0 20px 0;
    font-size: 15px;
    line-height: 14px;
    color: #fff;
    text-transform: uppercase;
    font-weight: normal;
    letter-spacing: normal;
  }

  .btn {
    color: #333;
    background: #fff;
    border-radius: 20px;
    font-size: 14px;
    padding: 10px 25px;
    border: 1px solid #fff;
    box-shadow: none;
    display: inline-block;
  }
}

/* Template 4 */
.template-inner-4 {
  background-image: linear-gradient(
    -35deg,
    rgba(255, 75, 116, 1) 0%,
    rgba(121, 52, 64, 1) 80%,
    rgba(121, 52, 64, 1) 100%
  );
  bottom: 40px;
  width: 220px;
  position: absolute;
  border-radius: 50%;
  height: 220px;
  text-align: center;
  transition: transform 3s;
  padding: 10px;
  left: 30px;
  box-shadow: 0 25px 30px #662b33;

  .template-inner-4-inner {
    background: rgb(255, 75, 116);
    background-image: linear-gradient(
      -35deg,
      rgba(255, 75, 116, 0) 0%,
      rgba(75, 42, 138, 1) 55%,
      rgba(75, 42, 138, 1) 100%
    );
    padding: 35px 10px;
    width: 200px;
    border-radius: 50%;
    height: 200px;
    text-align: center;
    transition: transform 3s;
  }

  p {
    font-size: 14px;
    line-height: 14px;
    color: #9f7dd0;
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 15px;
    line-height: 21px;
    color: #fff;
    font-weight: normal;
    letter-spacing: normal;
  }

  .btn {
    color: #fff;
    background: #28ae4c;
    border-radius: 20px;
    font-size: 14px;
    padding: 10px 25px;
    box-shadow: none;
  }
}

/* Template 5 */
.template-inner-5 {
  background: #8e1a1a url(../../assets/fomo/bg_template-5.png) no-repeat 0 0;
  background-size: cover;
  bottom: 40px;
  padding: 25px;
  width: 200px;
  position: absolute;
  border-radius: 20px;
  text-align: left;
  transition: transform 3s;
  left: 30px;

  p {
    font-size: 14px;
    line-height: 17px;
    color: #fff;
    font-weight: normal;
  }

  h3 {
    margin: 0 0 20px 0;
    font-size: 15px;
    line-height: 21px;
    color: #fff;
    text-transform: uppercase;
    font-weight: normal;
    letter-spacing: normal;
  }

  .btn {
    color: #a41111;
    background: #fee374;
    border-radius: 20px;
    font-size: 14px;
    padding: 10px 25px;
    box-shadow: none;
  }

  .btn-close {
    top: 7px !important;
    right: 7px !important;
  }
}

/* Template 6 */
.template-inner-6 {
  background: url(../../assets/fomo/bg_template-6.png) no-repeat 0 0;
  width: 375px;
  height: 228px;
  text-align: center;
  top: 40px;
  position: relative;
  transition: transform 3s;
  background-size: contain;

  p {
    font-size: 14px;
    line-height: 17px;
    color: #fff;
    margin: 0 0 10px 0;
  }

  h3 {
    margin: 10px 0;
    font-size: 15px;
    line-height: 21px;
    color: #fff;
    font-weight: normal;
    letter-spacing: normal;
  }

  .btn {
    background: #f3e374 url(../../assets/fomo/bg_scratch.png) no-repeat center
      center;
    background-size: auto;
    color: #fff;
    border-radius: 4px;
    padding: 20px 50px;
    font-size: 18px;
    box-shadow: none;
    letter-spacing: 1px;
    line-height: 16px;
    font-weight: normal;
  }
}

.preview_block-template .template-inner-6 {
  width: 393px;
  top: 125px;
  left: 40px;

  .btn {
    background-size: cover;
  }
}

.template-inner-6-inner {
  text-align: center;
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 25px;
  width: calc(100% - 35px);
  top: 15px;
  justify-content: center;
  left: 23px;
}
.template-inner-6-inner.column_reverse {
  flex-direction: column-reverse;
}
.template-inner-6-inner.row_reverse {
  flex-direction: row-reverse;
  min-height: 196px;
}
.template-inner-6-inner.column {
  flex-direction: column;
}
.template-inner-6-inner.row {
  flex-direction: row;
  min-height: 196px;
  margin: 0;
}
.template-inner-6-inner.row .split,
.template-inner-6-inner.row_reverse .split {
  margin: 10px;
}
.template-inner-6-inner.row .btn,
.template-inner-6-inner.row_reverse .btn {
  padding: 10px 25px;
}
.choose_template_block .template .template-inner-6 .btn-close {
  top: -7px;
  right: -7px;
}
</style>
