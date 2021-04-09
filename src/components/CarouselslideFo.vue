<template>
  <div>
    <div class="cntrlBlock">
      <ul>
        <li>Daily</li>
        <li>Weekly</li>
        <li>Monthly</li>
        <li>Products</li>
      </ul>
    </div>

    <carousel :per-page="4" :navigationEnabled="true">
      <slide v-for="(reward, index) in rewards" :key="reward.id">
        <div :class="'rewardBlock ' + 'rewardBlock' + index">
          <div class="rewardBlocks">
            <img src="../assets/img/rewardsFo2.png" alt="" />
            <!--<img
                    :src="'../assets/img/rewardsFo' + reward.id +'.png'"
                    alt=""
                  />-->
            <h3>{{ reward.desc }}</h3>
            <a href="#">
              {{ reward.status }}
              <span class="material-icons">arrow_right_alt</span>
            </a>
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "CarouselslideFo",
  components: {
    Carousel,
    Slide
  },

  data: function() {
    return {
      rewards: [
        {
          id: 1,
          desc: "Black Drongo (perched on Sp…",
          status: "Sathasivam"
        },
        {
          id: 2,
          desc: "Black Drongo (perched on Sp…",
          status: "Sathasivam"
        },
        {
          id: 3,
          desc: "Black Drongo (perched on Sp…",
          status: "Sathasivam"
        },
        {
          id: 4,
          desc: "Black Drongo (perched on Sp…",
          status: "Sathasivam"
        },
        {
          id: 5,
          desc: "Black Drongo (perched on Sp…",
          status: "Sathasivam"
        },
        {
          id: 6,
          desc: "Black Drongo (perched on Sp…",
          status: "Sathasivam"
        },
        {
          id: 7,
          desc: "Black Drongo (perched on Sp…",
          status: "Sathasivam"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.ourRewards {
  .rewardBlock {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    position: relative;
    .rewardBlocks {
      display: flex;
      margin: 20px 0 0 2%;
      background-color: #fff;
      align-items: center;
      flex-direction: column;
      text-align: center;
      max-width: 100%;
      img {
        max-width: 100%;
        margin-bottom: 20px;

        & + p {
          padding: 0 20px;
        }
      }
      h3 {
        color: #333;
        font-size: 20px;
        line-height: 16px;
        font-family: "DM Sans", serif;
        margin-top: 0;
      }
      a {
        color: #333;
        font-size: 16px;
        line-height: 16px;
        font-family: "DM Sans", serif;
        display: flex;
        align-items: center;
        &:hover {
          color: #8D6E3E;
        text-decoration: none;
        }
      }
    }
  }
}
</style>

<style lang="less">
.ourRewards {
  .VueCarousel {
    margin: 0 40px;
    .VueCarousel-wrapper {
      margin: 0;
      font-family: "DM Sans", serif;
    }
  }
  .cntrlBlock {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 40px;
    padding: 0 30px;
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      li {
        list-style-type: none;
        margin: 0 2vw;
        padding: 5px 20px;
        cursor: pointer;
        color: #555;
        font-size: 16px;
        font-family: "DM Sans", serif;
        border-radius: 20px;
        &:hover {
          background: #8D6E3E;
          color: #fff;
        }
      }
    }
  }
}
</style>
