<template>
  <div class="amvip--wrapper">
    <!-- <header class="amvip--header">
      <div class="amvip--headerLogo">
        <span class="icon-crown"></span>
        <div>
          <h2>VIP</h2>
          <h3>Tiers</h3>
          <small>Beta</small>
        </div>
      </div>
    </header> -->
    <div class="amvip--container">
      <hgroup class="amvip--pageHeader">
        <h2>Manage Tiers</h2>
        <div class="amvip--inlineFlex">
          <button class="amvip--btnCommon" @click="gotoAddTier">
            <span class="icon-plus"></span> <span>Add Tier</span>
          </button>
          <div class="amvip--statusToggle">
            <span>Your Promotion is currently Inactive</span>
            <input
              type="checkbox"
              name=""
              id="statusToggle"
              @change="togglePromotion"
            />
            <label for="statusToggle" class="amvip--customToggle"></label>
          </div>
        </div>
      </hgroup>

      <section class="amvip--tierWrap">
        <div class="amvip--tierCol amvip--bronze">
          <div>
            <header>
              <div class="amvip--cardImg">
                <img
                  src="./../../assets/vip-tier/images/tier-icon.png"
                  alt=""
                />
                <span class="icon-amedit" @click="showIconPopup"></span>
              </div>
              <h3>Bronze</h3>
              <div class="amvip--cardAction">
                <span class="icon-amedit" @click="gotoEditTier"></span>
                <span class="icon-amdelete"></span>
              </div>
            </header>
            <div class="amvip--tierDetails">
              <h4>Eligibility</h4>
              <ul class="amvip--bulletList">
                <li>Earn 500 Points</li>
              </ul>
              <h4>Benefits</h4>
              <ul class="amvip--bulletList">
                <li>2x points ongoing basis</li>
                <li>50% coupon one time</li>
                <li>Lorem lipsum dolor sit</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="amvip--tierCol amvip--silver">
          <div>
            <header>
              <div class="amvip--cardImg">
                <img
                  src="./../../assets/vip-tier/images/tier-icon.png"
                  alt=""
                />
                <span class="icon-amedit" @click="showIconPopup"></span>
              </div>
              <h3>Silver</h3>
              <div class="amvip--cardAction">
                <span class="icon-amedit" @click="gotoEditTier"></span>
                <span class="icon-amdelete"></span>
              </div>
            </header>
            <div class="amvip--tierDetails">
              <h4>Eligibility</h4>
              <ul class="amvip--bulletList">
                <li>Earn 500 Points</li>
              </ul>
              <h4>Benefits</h4>
              <ul class="amvip--bulletList">
                <li>2x points ongoing basis</li>
                <li>50% coupon one time</li>
                <li>Lorem lipsum dolor sit</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="amvip--tierCol amvip--gold">
          <div>
            <header>
              <div class="amvip--cardImg">
                <img
                  src="./../../assets/vip-tier/images/tier-icon.png"
                  alt=""
                />
                <span class="icon-amedit" @click="showIconPopup"></span>
              </div>
              <h3>Gold</h3>
              <div class="amvip--cardAction">
                <span class="icon-amedit" @click="gotoEditTier"></span>
                <span class="icon-amdelete"></span>
              </div>
            </header>
            <div class="amvip--tierDetails">
              <h4>Eligibility</h4>
              <ul class="amvip--bulletList">
                <li>Earn 500 Points</li>
              </ul>
              <h4>Benefits</h4>
              <ul class="amvip--bulletList">
                <li>2x points ongoing basis</li>
                <li>50% coupon one time</li>
                <li>Lorem lipsum dolor sit</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="amvip--tierCol amvip--platinum">
          <div>
            <header>
              <div class="amvip--cardImg">
                <img
                  src="./../../assets/vip-tier/images/tier-icon.png"
                  alt=""
                />
                <span class="icon-amedit" @click="showIconPopup"></span>
              </div>
              <h3>Platinum</h3>
              <div class="amvip--cardAction">
                <span class="icon-amedit" @click="gotoEditTier"></span>
                <span class="icon-amdelete"></span>
              </div>
            </header>
            <div class="amvip--tierDetails">
              <h4>Eligibility</h4>
              <ul class="amvip--bulletList">
                <li>Earn 500 Points</li>
              </ul>
              <h4>Benefits</h4>
              <ul class="amvip--bulletList">
                <li>2x points ongoing basis</li>
                <li>50% coupon one time</li>
                <li>Lorem lipsum dolor sit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
    <IconPopup
      :showPopup="enableIcon"
      v-on:close-btn-click="hideIconPopup"
    ></IconPopup>
    <ConfirmPopup
      :showPopup="showConfirmPopup"
      v-on:confirmed="confirmClicked"
      v-on:canceled="cancelClicked"
    ></ConfirmPopup>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_home");
@import url("./../../assets/vip-tier/less/_tier");
</style>
<script>
import IconPopup from "./IconPopup";
import ConfirmPopup from "./ConfirmPopup";
export default {
  name: "ManageTier",
  components: {
    IconPopup,
    ConfirmPopup
  },
  data: function() {
    return {
      enableIcon: false,
      showConfirmPopup: false
    };
  },
  methods: {
    gotoEditTier() {
      this.$router.push("edit-tier");
    },
    gotoAddTier() {
      this.$router.push("add-tier");
    },
    showIconPopup() {
      this.enableIcon = true;
    },
    hideIconPopup() {
      this.enableIcon = false;
    },
    togglePromotion() {
      this.showConfirmPopup = true;
    },
    confirmClicked() {
      this.showConfirmPopup = false;
    },
    cancelClicked() {
      const checkboxEle = document.getElementById("statusToggle");
      checkboxEle.checked = !checkboxEle.checked;
      this.showConfirmPopup = false;
    }
  }
};
</script>
