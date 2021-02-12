<template>
  <div class="changeTemplateView">
    <div class="fixedHeaderBlock">
      <div class="fixedHeaderBlockInner">
        <div class="linkBackBlock">
          <a class="link-back" @click.prevent="togglePageview">
            <i class="fa fa-long-arrow-left"></i>
          </a>
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

    <!-- Add class="info_block disabled" instead of class="info_block" if toggle btn in disabled mode -->
    <div class="info_block">
        <div class="info_block-spacing">
            <h4 class="font-size-14">Welcome bonus points</h4>
            <p>100 points = $5 <a href="#" class="info-link-blue">Change</a></p>            
        </div>
        <div class="info_block-spacing flex align--centered">
          <div class="form-group">
            <input type="text" id="" class="form-control form-control-sm" value="100" style="width: 60px;min-width: 0;vertical-align: initial;margin: 0 8px;" maxlength="6">
            <span>point(s)</span>
          </div>
        </div>
        <div class="info_block-spacing highAlert"> 
          <label class="switch margin-bottom-0" for="toggle_button">
            <i></i>
            <input type="checkbox" id="toggle_button" checked v-model="checkedValue">
          </label>
          <i v-if="isActive">Enabled</i>
          <i v-if="! isActive">Disabled</i>
          <div class="popBox">
              <i class="fa fa-long-arrow-left"></i>
              Enable welcome bonus point (Reward users when sign up)
          </div>
        </div>
        <div class="info_block-spacing text-right">
            <a class="btn btn-success btn-space" id="save_review_btn">Save</a>
        </div>
    </div>
    
    <div class="container">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-75"><h1>Forgot email password</h1></div>
        <div class="md-layout-item md-size-25 dispMidRight">
          <md-button class="md-raised btn-custom-default">
            <i class="fas fa-plus"></i> Create a blank email
          </md-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "SelectTemplates",
    props: ["data", "close", "save"],
    mixins: ["renderTemplate"],
    data: function () {
      return {
        isChecked: false,
        currentState: false
      };
    },

    computed: {
      isActive() {
          return this.currentState;
      },        

      checkedValue: {
        get() {
            return this.currentState
        },
        set(newValue) {
            this.currentState = newValue;
        }
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
        min-width: auto!important;
        height: 14px;
        width: 14px !important;
        font-weight: bold;
        color: #007aff;
      }
    }
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

    &.disabled {
      background: #ebecec;
    }

    .displayNone {
      display: none;
    }

    .info_block-spacing {
      padding: 10px 20px;

      h4, p {
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
      margin-top: 10px;
      z-index: 1;
      width: 250px;
      line-height: 13px;
      font-size: 11px;
      display: flex;
  }
  .popBox i {
    padding-right: 10px;
  }
  .highAlert {
    position: relative;
  }

  .changeTemplateView {
    margin: 7em 0;

    section {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .dispMidRight {
      justify-content: flex-end;
      display: flex;
      align-items: center;
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

<style lang="less">
  .md-icon {
    font-size: 18px !important;
  }
</style>