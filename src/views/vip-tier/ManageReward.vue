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
        <span class="icon-next-arrow" @click="gotoManageTier"></span>
        <h2>Edit Rewards</h2>
      </hgroup>
      <div class="amvip--tabs">
        <div class="amvip--tabHeader">
          <div class="amvip--tabTitle active">One Time Reward</div>
          <div class="amvip--tabTitle">On Going Reward</div>
        </div>
        <div class="amvip--tabContent">
          <div class="amvip--rewardRadio">
            <div class="amvip--customRadio">
              <input type="radio" name="oneTimeReward" id="rewardCoupons" />
              <label for="rewardCoupons"><span>Coupons</span></label>
            </div>
            <div class="amvip--customRadio">
              <input type="radio" name="oneTimeReward" id="rewardPoints" />
              <label for="rewardPoints"><span>Points</span></label>
            </div>
            <div class="amvip--customRadio">
              <input type="radio" name="oneTimeReward" id="rewardExperience" />
              <label for="rewardExperience"
                ><span>Perks & Experience</span></label
              >
            </div>
          </div>
          <div class="amvip--twolColumnRow">
            <div class="amvip--formRow">
              <label>Title<span class="amvip--mandatory">*</span></label>
              <input type="text" class="amvip--textbox textBoxMedium" />
            </div>
            <div class="amvip--formRow">
              <label>Description</label>
              <input type="text" class="amvip--textbox textBoxLarge" />
            </div>
          </div>
          <div class="amvip--twolColumnRow">
            <div class="amvip--formRow">
              <label>Award a Coupon</label>
              <select name="" id="">
                <option value="Percentage Off">Percentage Off</option>
                <option value="Percentage Off">Percentage Off</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="amvip-actionFooter">
      <button class="amvip--btnSec" @click="gotoManageTier">Cancel</button>
      <button class="amvip--btnPri">Save</button>
    </footer>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_header");
@import url("./../../assets/vip-tier/less/_edit-reward");
</style>
<script>
export default {
  name: "EditReward",
  components: {},
  methods: {
    gotoManageTier() {
      this.$router.push("edit-tier");
    }
  }
};
</script>
