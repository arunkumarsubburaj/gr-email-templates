<template>
  <div class="changeTemplateView">
    <div class="fixedHeaderBlock">
      <div class="fixedHeaderBlockInner">
        <a class="link-back" @click.prevent="handleBack">
          <i class="fa fa-long-arrow-left"></i>
        </a>
        <div class="title">
          <div class="icon far fa-bookmark margin-right-10"></div>
          <span>{{title}}</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-75"><h1>{{title}}</h1></div>
        <div class="md-layout-item md-size-25 dispMidRight">
          <!-- AN ENHANCEMENT TO BE WORKD ON NEXT PHASE -->
          <!-- <md-button class="md-raised btn-custom-default">
            <i class="fas fa-plus"></i> Create a blank email
          </md-button> -->
        </div>
        <section class="md-layout-item">
          <div
            class="templateBox"
            v-for="(template, index) in data"
            :key="template.id_theme"
          >
            <div class="boxView">
              <img :src="getImg(template.id_theme)" alt="">
            </div>
            <div class="boxFooter">
              <div>
                <!-- <h4>{{ template.tpl_name }}</h4> -->
                <small>Template {{index + 1}}</small>
              </div>
              <md-button
                class="md-raised md-accent btn-custom-active"
                v-if="template.status == 1"
                @click="e => save(template.id_theme)"
              >
                <i class="far fa-check-circle"></i>
                activated
              </md-button>
              <md-button class="md-raised btn-custom-default" v-else @click="e => save(template.id_theme)">
                Preview & Edit
              </md-button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "EmailTemplates",
    props: ["data", "close", "save", "fromEditPage", "title"],
    methods: {
      getImg: function(id) { return `${Config.callback_url}/public/assets/img/email_assets/email_template_${id}.png`},
      handleBack: function() {
        if(this.fromEditPage) {
          this.close()
        } else window.history.back();
      }
    }
  };
</script>
<style lang="less" scoped>

.changeTemplateView {
  margin: 7em 0;

  section {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
  }
  .dispMidRight {
    justify-content: flex-end;
    display: flex;
    align-items: center;
  }
}
.templateBox {
  width: 48%;
  display: flex;
  flex-direction: column;
  margin: 25px 0;
  .boxView {
    flex-grow: 1;
    display: flex;
    background-color: #DDEFEF;
    img {
      width: 50%;
      margin: auto;
      display: block;
    }
  }
  .boxFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 0;
    h4 {
      margin: 0;
    }
  }
}
</style>