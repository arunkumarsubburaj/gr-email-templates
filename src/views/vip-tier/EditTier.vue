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
        <h2>Edit Tier</h2>
      </hgroup>
      <section class="amvip--editTierRow">
        <div class="amvip--editTierContent">
          <div class="amvip--formRow">
            <label>Title<span class="amvip--mandatory">*</span></label>
            <input type="text" class="amvip--textbox textBoxMedium" />
          </div>
          <div class="amvip--formRow">
            <label>Description</label>
            <input type="text" class="amvip--textbox textBoxLarge" />
          </div>
          <div class="amvip--formRow multiCol">
            <label>Background Color</label>
            <div class="amvip--colorInfo">
              <span></span>
              <strong class="amvip--textbox">#f5f5f5</strong>
            </div>
          </div>
          <div class="amvip--formRow multiCol">
            <label>Points Needed</label>
            <input type="text" class="amvip--textbox" value="100" />
          </div>
          <div class="amvip--formRow multiCol">
            <label>Tier Icon</label>
            <div class="amvip--tierIcon">
              <span class="amvip--iconPreview"
                ><img src="images/tier-icon.png" alt=""
              /></span>
              <span class="icon-amedit"></span>
            </div>
          </div>
          <div class="amvip--formRow multiCol">
            <label>Rewards</label>
            <div class="amvip--btnCommon" @click="gotoManageReward">
              <span class="icon-plus"></span>
              <span>Add Reward</span>
            </div>
          </div>
        </div>
        <div class="amvip--rewardsCol">
          <h3>Added Rewards</h3>
          <div class="amvip-rewardItem">
            <img src="images/tier-icon.png" alt="" />
            <span>10% Coupon</span>
            <div class="amvip--rewardItemActions">
              <span class="icon-amedit" @click="gotoManageReward"></span>
              <span class="icon-amdelete"></span>
            </div>
            <span class="amvip--rewardItemType">One Time</span>
          </div>
          <div class="amvip-rewardItem">
            <img src="images/tier-icon.png" alt="" />
            <span>10% Coupon</span>
            <div class="amvip--rewardItemActions">
              <span class="icon-amedit" @click="gotoManageReward"></span>
              <span class="icon-amdelete"></span>
            </div>
            <span class="amvip--rewardItemType onGoing">On Going</span>
          </div>
          <div class="amvip-rewardItem">
            <img src="images/tier-icon.png" alt="" />
            <span
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
              facere?</span
            >
            <div class="amvip--rewardItemActions">
              <span class="icon-amedit" @click="gotoManageReward"></span>
              <span class="icon-amdelete"></span>
            </div>
            <span class="amvip--rewardItemType onGoing">On Going</span>
          </div>
        </div>
      </section>
    </div>
    <footer class="amvip-actionFooter">
      <button class="amvip--btnSec" @click="gotoManageTier">Cancel</button>
      <button class="amvip--btnPri">Save</button>
    </footer>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_edit-tier");
</style>
<script>
export default {
  name: "EditTier",
  components: {},
  methods: {
    gotoManageTier() {
      this.$router.push("manage-tier");
    },
    gotoManageReward() {
      this.$router.push("manage-reward");
    }
  }
};
</script>
