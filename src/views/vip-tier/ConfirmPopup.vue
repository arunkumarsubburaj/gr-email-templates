<template>
  <div class="amvip--dialog" v-if="showPopup">
    <div class="amvip--dialogBody">
      <h2>Confirm Activation</h2>
      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore sequi
          reprehenderit exercitationem culpa fugit optio architecto magni
          temporibus aut perferendis?
        </p>
      </section>
      <footer class="amvip-actionFooter">
        <button class="amvip--btnSec" @click="cancelClick">Cancel</button>
        <button class="amvip--btnPri" @click="confirmClick">Confirm</button>
      </footer>
    </div>
  </div>
</template>
<style lang="less"></style>

<script>
export default {
  name: "ConfirmPopup",
  event: ["confirmed", "canceled"],
  props: ["showPopup"],
  data: function() {
    return {};
  },
  methods: {
    confirmClick() {
      this.$emit("confirmed");
    },
    cancelClick() {
      this.$emit("canceled");
    }
  }
};
</script>
