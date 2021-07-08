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
        <h2>Add Tier</h2>
      </hgroup>
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
        <label>Tier Icon</label>
        <div class="amvip--tierIcon">
          <span class="amvip--iconPreview"></span>
          <span class="amvip--btnCommon"
            ><span class="icon-upload"></span> Upload
            <input class="amvip-btnBrowse" type="file" name="" id=""
          /></span>
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
@import url("./../../assets/vip-tier/less/_add-tier");
</style>
<script>
export default {
  name: "AddTier",
  components: {},
  methods: {
    gotoManageTier() {
      this.$router.push("manage-tier");
    }
  }
};
</script>
