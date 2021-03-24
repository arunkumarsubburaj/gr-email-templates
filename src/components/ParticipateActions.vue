<template>
  <div class="partiAction">
    <div
      :class="'partiActions ' + 'partiActions' + index"
      v-for="(action, index) in actions"
      :key="action.id"
    >
      <div class="imgDiv">
        <span class="material-icons">
          {{ action.imgDiv }}
        </span>
      </div>
      <div class="pointDiv">
        <span class="material-icons">
          card_giftcard
        </span>
        <div>
          <span class="material-icons">
            stars
          </span>
          <span>100</span>
        </div>
      </div>
      <p>{{ action.desc }}</p>
    </div>
  </div>
</template>
<script>

export default {
  name: "ParticipateActions",
  components: {
  },
  
  data: function() {
    return {
      actions: [
        {
          id: 1,
          imgDiv: "engineering",
          desc: "Visit our Facebook page and consider liking it"
        },
        {
          id: 2,
          imgDiv: "fact_check",
          desc: "Visit our Facebook page and consider liking it"
        },
        {
          id: 3,
          imgDiv: "facebook",
          desc: "Visit our Facebook page and consider liking it"
        },
        {
          id: 4,
          imgDiv: "public",
          desc: "Visit our Facebook page and consider liking it"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
  .partiAction {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    margin: 20px 30px 30px 20px;
    position: relative;
    .partiActions {
      display: flex;
      padding: 20px;
      width: 150px;
      margin: 20px 0 0 2%;
      background-color: #fff;
      border: 1px solid #e8e8e8;
      flex-grow: 1;
      border-radius: 4px;
      align-items: center;
      flex-direction: column;
      text-align: center;
      .imgDiv {
        border-radius: 50%;
        border: 1px solid #fde6bb;
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 35px;
        .material-icons {
          font-size: 50px;
          color: #df8550;
          box-sizing: border-box;
          margin: 0;
        }
      }
      .pointDiv {
        display: flex;
        margin: 20px 0 0;
        span.material-icons {
          margin-right: 4px;
          border: 1px solid #8f75be;
          border-radius: 50%;
          color: #8f75be;
          font-size: 18px;
          padding: 6px;
        }
        div {
          background: #8f75be;
          border-radius: 25px;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          padding: 4px 10px 4px 4px;
          span.material-icons {
            color: #fff;
            margin-right: 4px;
            font-size: 24px;
            padding: 0;
          }
        }
      }
    }
  }
</style>

<style lang="less">
</style>
