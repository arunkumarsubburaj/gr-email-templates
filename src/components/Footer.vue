<template>
  <footer>
    <span>
      Certified with
      <img
        src="../assets/img/heart.png"
        alt="Email footer"
        width="8"
        height="7"
        style="display: inline-block;"
      />
      by
      <a href="https://appsmav.com/" target="_blank">AppsMav</a>
    </span>
    <p>. Installed on Shopify</p>
  </footer>
</template>
<script>
export default {
  name: "Footer"
};
</script>
<style lang="less" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 50px 0 25px;

  &:before {
    height: 1px;
    display: block;
    width: 50%;
    border-top: 1px solid #ccc;
    content: "";
    position: absolute;
    margin-top: 10px;
  }
  span {
    background: #fafafa;
    z-index: 1;
    padding: 0 20px;
    font-size: 11px;
    color: #aaa;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      margin: 0 5px;
    }

    a {
      color: #000;
      text-decoration: underline;
    }
  }
  p {
    font-size: 12px;
  }
}
</style>
