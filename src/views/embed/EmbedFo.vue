// eslint-disable-next-line /* eslint-disable */

<template>
  <div class="embedFo">
    <header>
      <button
        :class="{ open: showMobileMenu }"
        @click="showMobileMenu = !showMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      LOGO
    </header>
    <nav v-if="showMobileMenu">
      <ul>
        <li>Our Rewards</li>
        <li>Winners</li>
        <li>Referral</li>
        <li>Earn Rewards</li>
      </ul>
    </nav>
    <nav class="desktopMenu" v-if="!showMobileMenu">
      <ul>
        <li>Our Rewards</li>
        <li>Winners</li>
        <li>Referral</li>
        <li>Earn Rewards</li>
      </ul>
    </nav>
    <div class="heroBanner">
      <div class="heroTxt">
        <div>
          <small>Welcome to the</small>
          <h1>Loyalty Program</h1>
        </div>
        <p>
          Some text here to explain how to earn more rewards plus second line.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailFo",
  components: {},
  data: function() {
    return {
      showMobileMenu: false
    };
  },
  mixins: [""],
  computed: {},
  methods: {},
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.embedFo {
  margin: 0 auto;
  max-width: 1600px;
  background: #fff;
  font-family: "Montserrat", serif;
  header {
    background: #8d6e3e;
    font-size: 32px;
    padding: 20px 50px;
    color: #fff;
    font-weight: bold;
    line-height: 24px;
    margin-top: 25px;
    font-family: "DM Sans", serif;
    position: relative;
    button {
      display: none;
    }

    @media only screen and (max-width: 599px) {
      padding: 20px 10px;
      display: flex;
      justify-content: center;
      margin-top: 5px;
      button {
        width: 25px;
        height: 22px;
        position: absolute;
        cursor: pointer;
        display: block;
        background: transparent;
        left: 10px;
        border: 0;
        top: 21px;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.5s ease-in-out;
        -moz-transition: 0.5s ease-in-out;
        -o-transition: 0.5s ease-in-out;
        transition: 0.5s ease-in-out;
        span {
          display: block;
          position: absolute;
          height: 4px;
          width: 50%;
          background: #ffffff;
          opacity: 1;
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
          -webkit-transition: 0.25s ease-in-out;
          -moz-transition: 0.25s ease-in-out;
          -o-transition: 0.25s ease-in-out;
          transition: 0.25s ease-in-out;
        }

        span:nth-child(even) {
          left: 50%;
          border-radius: 0 9px 9px 0;
        }

        span:nth-child(odd) {
          left: 0px;
          border-radius: 9px 0 0 9px;
        }

        span:nth-child(1),
        span:nth-child(2) {
          top: 0px;
        }

        span:nth-child(3),
        span:nth-child(4) {
          top: 10px;
        }

        span:nth-child(5),
        span:nth-child(6) {
          top: 20px;
        }

        &.open span:nth-child(1),
        &.open span:nth-child(6) {
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }

        &.open span:nth-child(2),
        &.open span:nth-child(5) {
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }

        &.open span:nth-child(1) {
          left: 0px;
          top: 5px;
        }

        &.open span:nth-child(2) {
          left: calc(50% - 4px);
          top: 5px;
        }

        &.open span:nth-child(3) {
          left: -50%;
          opacity: 0;
        }

        &.open span:nth-child(4) {
          left: 100%;
          opacity: 0;
        }

        &.open span:nth-child(5) {
          left: 0px;
          top: 13px;
        }

        &.open span:nth-child(6) {
          left: calc(50% - 4px);
          top: 13px;
        }
      }
    }
  }
  nav {
    background: #005964;
    font-size: 14px;
    color: #fff;
    line-height: 17px;
    font-family: "Montserrat", serif;
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      li {
        list-style-type: none;
        margin: 0 2vw;
        padding: 10px;
        cursor: pointer;
        &:hover,
        &.active {
          background: rgba(51, 121, 132, 0.4);
        }
      }
    }

    @media only screen and (max-width: 599px) {
      &.desktopMenu {
        display: none;
      }
      ul {
        flex-direction: column;
        li {
          margin: 0;
        }
      }
    }
  }
  .heroBanner {
    /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
      url("../../assets/img/hero_banner.png");

    /* Set a specific height */
    height: 500px;

    /* Position and center the image to scale nicely on all screens */
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }

  /* Place text in the middle of the image */
  .heroTxt {
    position: absolute;
    bottom: 15%;
    right: 0;
    padding: 30px;
    color: white;
    background: rgba(0, 89, 100, 0.8);
    display: flex;
    width: 50%;
    font-family: "DM Sans", serif;
    div:first-child {
      border-right: 1px solid rgba(255, 255, 255, 0.8);
      margin-right: 20px;
      padding-right: 20px;
    }
    small {
      font-size: 22px;
      font-weight: bold;
      line-height: 33px;
    }
    h1 {
      font-size: 70px;
      font-weight: bold;
      line-height: 60px;
      margin: 10px 0;
    }
    p {
      font-size: 19px;
    }

    @media only screen and (max-width: 989px) {
      width: auto;
      flex-direction: column;
      div:first-child {
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.8);
        margin-bottom: 20px;
        padding-bottom: 20px;
        margin-right: 0;
        padding-right: 0;
      }
    }
  }
}
</style>
