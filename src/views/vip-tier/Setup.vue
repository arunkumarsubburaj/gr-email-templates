<template>
  <div class="amvip--landingGrey">
    <div class="circles">
      <div class="circle1"></div>
      <div class="circle2"></div>
    </div>
    <aside class="amvip--landingBrand">
      <div>
        <span class="icon-crown"></span>
        <h2>VIP</h2>
        <h3>Tiers</h3>
        <small>Beta</small>
      </div>
    </aside>
    <section class="amvip-twoColContent">
      <section>
        <h2>Setup VIP Tier Program</h2>
        <div class="amvip--formRow">
          <label>Title<span class="amvip--mandatory">*</span></label>
          <input type="text" class="amvip--textbox textBoxLarge" />
        </div>
        <div class="amvip--formRow">
          <label>Description</label>
          <input type="text" class="amvip--textbox textBoxLarge" />
        </div>
        <div class="amvip--formRow">
          <label>Select Date to begin the program</label>
          <div class="amvip--dateRow">
            <div class="dateWrap">
              <span>11 / 12 / 2020</span>
              <div class="icon-calendar"></div>
            </div>
            <div class="amvip--info">
              <span class="icon-notification"></span>
              <span
                >Date cannot be older than program installed date
                (05/06/2019)</span
              >
            </div>
          </div>
        </div>
        <div class="amvip--radioRow">
          <div class="formLabel">What should define your Tiers</div>
          <div>
            <div class="amvip--customRadio">
              <input type="radio" name="tierRewardType" id="purchase" />
              <label for="purchase"><span>Purchase</span></label>
            </div>
            <div class="amvip--customRadio">
              <input type="radio" name="tierRewardType" id="points" />
              <label for="points"><span>Points</span></label>
            </div>
          </div>
        </div>
        <div class="amvip--radioRow btmBorder">
          <div class="formLabel">Time to achieve a VIP Tier</div>
          <div>
            <div class="amvip--customRadio">
              <input type="radio" name="tierTimeline" id="lifetime" />
              <label for="lifetime"><span>Lifetime</span></label>
              <small
                >Once a member achieves a tier, they will keep their status
                forever.</small
              >
            </div>
            <div class="amvip--customRadio">
              <input type="radio" name="tierTimeline" id="calendarYear" />
              <label for="calendarYear"><span>One Calendar Year</span></label>
              <small
                >A member qualifies for the calendar year (1st Jan - 31st
                Dec)</small
              >
            </div>
          </div>
        </div>
        <br />
        <br />
        <footer class="amvip-actionFooter">
          <button class="amvip--btnPri" @click="gotoManageTier">Save</button>
        </footer>
      </section>
    </section>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_home");
@import url("./../../assets/vip-tier/less/_setup");
</style>
<script>
export default {
  name: "Setup",
  components: {},
  methods: {
    gotoManageTier() {
      this.$router.push("manage-tier");
    }
  }
};
</script>
