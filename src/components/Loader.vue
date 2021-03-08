<template>
  <transition name="loader">
    <div v-if="status" class="loaderWrapper">
      <div class="loader">
        <p>Loading</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Loader",
  props: ["status"]
};
</script>
<style lang="less" scoped>
.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.5s;
}
.loader-enter,
.loader-leave-to {
  opacity: 0;
}
.loaderWrapper {
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 1.2em;
  color: #000;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.loader {
  position: relative;
  padding-top: 4.5em;
  min-width: 50%;
  text-align: center;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: calc(50% - 2em);
    top: 0;
    width: 4em;
    height: 4em;
    border-radius: 50%;
    background-color: currentColor;
    opacity: 0.6;
    position: absolute;
    top: 0;
    animation: bounce 2s infinite ease-in-out;
  }
  &:after {
    animation-delay: -1s;
  }
  p {
    color: currentColor;
    margin: 0;
    text-transform: uppercase;
  }
}

@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }

  50% {
    -webkit-transform: scale(1);
  }
}
</style>
