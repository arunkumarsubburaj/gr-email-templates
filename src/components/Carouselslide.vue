<template>
  <div>
    <div class="cntrlBlock">
      <md-button-group>
        <md-button class="md-raised active">All</md-button>
        <md-button class="md-raised">Daily</md-button>
        <md-button class="md-raised">Weekly</md-button>
        <md-button class="md-raised">Monthly</md-button>
        <md-button class="md-raised">Grand</md-button>
      </md-button-group>
      <a href="#">You have earned 395 points</a>
    </div>
    <div class="forMobile" v-for="(reward, index) in rewards" :key="reward.id">
      <div :class="'rewardBlock ' + 'rewardBlock' + index">
        <div class="rewardBlocks">
          <img src="../assets/img/rewards1.png" alt="" />
          <!--<img
                  :src="'../assets/img/rewards' + reward.id +'.png'"
                  alt=""
                />-->
          <p>{{ reward.desc }}</p>
          <div class="pointDiv">
            <div class="eligiblePts">
              <span>Eligible</span>
              <span>145</span>
            </div>
            <span class="requiredPts">95</span>
            <!-- redeem class needs to add dynamically -->
            <p class="redeem">{{ reward.status }}</p>
          </div>
        </div>
      </div>
    </div>

    <carousel :per-page="3" :navigationEnabled="true">
      <slide v-for="(reward, index) in rewards" :key="reward.id">
        <div :class="'rewardBlock ' + 'rewardBlock' + index">
          <div class="rewardBlocks">
            <img src="../assets/img/rewards1.png" alt="" />
            <!--<img
                    :src="'../assets/img/rewards' + reward.id +'.png'"
                    alt=""
                  />-->
            <p>{{ reward.desc }}</p>
            <div class="pointDiv">
              <div class="eligiblePts">
                <span>Eligible</span>
                <span>145</span>
              </div>
              <span class="requiredPts">95</span>
              <!-- redeem class needs to add dynamically -->
              <p class="redeem">{{ reward.status }}</p>
            </div>
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "Carouselslide",
  components: {
    Carousel,
    Slide
  },

  data: function() {
    return {
      rewards: [
        {
          id: 1,
          desc: "Reward prize details can be set in here",
          status: "Redeem Now"
        },
        {
          id: 2,
          desc: "Reward prize details can be set in here",
          status: "Points required"
        },
        {
          id: 3,
          desc: "Reward prize details can be set in here",
          status: "Points required"
        },
        {
          id: 4,
          desc: "Reward prize details can be set in here",
          status: "Points required"
        },
        {
          id: 5,
          desc: "Reward prize details can be set in here",
          status: "Redeem Now"
        },
        {
          id: 6,
          desc: "Reward prize details can be set in here",
          status: "Points required"
        },
        {
          id: 7,
          desc: "Reward prize details can be set in here",
          status: "Redeem Now"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.rewardBlock {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  position: relative;
  .rewardBlocks {
    display: flex;
    padding: 10px;
    margin: 20px 0 0 2%;
    background-color: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    align-items: center;
    flex-direction: column;
    text-align: center;
    max-width: 310px;
    img {
      max-width: 100%;
      margin-bottom: 20px;

      & + p {
        padding: 0 20px;
      }
    }
    .pointDiv {
      .eligiblePts {
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;

        span:first-child {
          color: #2da815;
          padding: 1px 6px;
          background: #e0fbcd;
        }
        span:last-child {
          color: #d84133;
          text-decoration: line-through;
        }
      }
      .requiredPts {
        color: #ff6a6a;
        font-size: 20px;
        font-weight: 600;
        line-height: 16px;
        background: #fff4e0;
        padding: 0 10px;
      }
      p {
        color: #8f8f8f;
        font-size: 12px;
        font-weight: 300;
        line-height: 16px;

        &.redeem {
          color: #007aff;
        }
      }
    }
  }
}
</style>

<style lang="less">
.forMobile {
  display: none;
}
.VueCarousel {
  margin: 0 40px;
  .VueCarousel-wrapper {
    margin: 0 20px;
  }
}
.cntrlBlock {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 40px;
  padding: 0 30px;

  a {
    color: #1f6bff !important;
    text-decoration: underline !important;
  }

  md-button-group {
    .md-button.md-theme-default.md-raised {
      border: 1px solid #dfdfdf;
      border-left: none;
      border-radius: 0;
      font-size: 12px;
      font-weight: 500;
      line-height: 15px;
      min-width: auto;

      &:first-child {
        border-left: 1px solid #dfdfdf;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      &.active {
        background: #8f75be;
        color: #fff;
        border-color: #8f75be;
      }
    }
  }
}

.embedEdit .previewBlock {
  .mobileActive {
    .cardBlock .item {
      .cntrlBlock {
        flex-direction: column;
        margin: 10px;
        a {
          margin: 20px 0;
        }
      }
    }
    .rewardBlock {
      margin: 10px 10px 0;
      padding: 0;
      .rewardBlocks {
        margin: 0;
        max-width: initial;
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
    .VueCarousel {
      display: none;
    }
    .forMobile {
      display: block;
    }
  }
}
</style>
