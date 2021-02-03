<template>
  <md-menu md-direction="bottom-end" :mdCloseOnClick="true">
    <a class="dLink" md-menu-trigger>Insert Dynamic Variable</a>
    <md-menu-content class="dLinkMenu">
      <md-menu-item
        v-for="item in data"
        :key="item"
        @click="_ => click(name, item)"
        >{{ item }}</md-menu-item
      >
    </md-menu-content>
  </md-menu>
</template>
<script>
export default {
  name: "CustomVariables",
  props: ["data", "click", "name"]
};
</script>
<style lang="less" scoped>
.dLink {
  font-size: 0.8em;
  color: #5594de !important;
  font-weight: 400;
  text-decoration: underline;
  cursor: pointer;
}
</style>
