<template>
  <div class="home">
    <div class="fomoContainer">
      <div class="fomo_block">
          <div class="active_fomo">
            <div class="fomoHeader">
              <h2>Fomo Prompts</h2>
              <p>Some text explains about this FOMO prompts can be here.</p>
              <div class="statusBlock">
                  <div v-for="status in statuses" :key="status.count">
                      <h3>{{status.count}}</h3>
                      <p>{{status.attr}}</p>
                  </div>
              </div>
            </div>
            <div class="fomoList">
              <md-tabs md-alignment="fixed">
                <md-tab id="tab-home" :md-label="tab1 + notification1">                  
                  <div class="table-responsive tableList">
                      <table class="table table-striped snap-top">
                          <thead>
                              <tr>
                                  <th style="width: 25%;">FOMO Name</th>
                                  <th>Category</th>
                                  <th>Clicks</th>
                                  <th>Visible to</th>
                                  <th class="align-center">Status</th>
                                  <th class="align-center">Action</th>
                              </tr>
                          </thead>
                          <tbody class="sort-item">                                
                              <tr v-for="data in datasPaused" :key="data.fomoName">
                                  <td class="font-size-mid" v-text="data.fomoName">
                                      {{data.fomoName}}
                                  </td>
                                  <td class="font-size-small" v-text="data.category">
                                      {{data.category}}
                                  </td>
                                  <td class="font-size-mid" v-text="data.clicks">
                                      {{data.clicks}}
                                  </td>
                                  <td>
                                      <div class="icon_block">
                                          <div class="fomo_icon visible-green" v-bind:class="data.visibleGreen"></div>
                                          <div class="fomo_icon visible-pink" v-bind:class="data.visiblePink"></div>
                                          <div class="fomo_icon visible-orange" v-bind:class="data.visibleOrange"></div>
                                      </div>
                                  </td>
                                  <td>
                                      <label class="toggle-checkbox">
                                          <input type="checkbox" onchange="" checked>
                                          <span class="togglebox"><span></span></span>
                                      </label>
                                  </td>
                                  <td class="align-center">
                                      <div v-bind:class="data.action"></div>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                </md-tab>
                <md-tab id="tab-pages" :md-label="tab2 + notification2">{{tab2}} {{notification2}}</md-tab>
                <md-tab id="tab-posts" :md-label="tab3 + notification3">{{tab3}} {{notification3}}</md-tab>
              </md-tabs>
            </div>
          </div>
          <div class="create_fomo">            
            <div class="titleBlock">
                <h2>Create New</h2>
                <a href="#" class="btn_link btn_link-small">View all templates</a>
            </div>
            <div class="newFomoList">
                <div class="new_list" v-for="record in records" :key="record.fomoIcon">
                    <md-icon class="fomo_icon">
                      {{record.fomoIcon}}
                      <span v-if="record.fomoNotification">{{record.fomoNotification}}</span>
                    </md-icon>
                    <div class="fomo_details">
                        <h3>{{record.fomoHead}}</h3>
                    </div>
                    <md-button :md-ripple="false" class="md-dense btn">Add</md-button>
                </div>
                <!-- Setup -->
                <div class="new_list">
                    <md-icon class="fomo_icon">payment</md-icon>
                    <div class="fomo_details">
                        <h3>Pay with points</h3>
                    </div>
                    <md-button :md-ripple="false" class="md-dense btn btn-setup">Setup</md-button>
                </div>
                <!-- Create new -->
                <div class="new_list create-new">
                    <md-icon class="fomo_icon">design_services</md-icon>
                    <div class="fomo_details">
                        <h3>Create design</h3>
                    </div>
                    <md-button :md-ripple="false" class="md-dense btn btn-setup">Create</md-button>
                </div>
            </div>
          </div>
      </div>
    </div>


    
    <div class="emailListingContainer container">
      <ul class="emailList">
        <li class="head">
          <div class="name">Email Name</div>
          <div>Sent to</div>
          <div>Opened</div>
          <div>Status</div>
          <div>Action</div>
        </li>
        <li v-for="(mail, key) in activeList" :key="key">
          <div class="name">
            <i class="fal fa-envelope"></i>
            <div>
              <h5>{{ mail.title }}</h5>
              <p>{{ mail.type }}</p>
            </div>
          </div>
          <div>12,789</div>
          <div>12,789</div>
          <div>
            <label
              class="switch"
              @click.prevent="changeEmailStatus(mail.id_email, mail.is_enabled)"
              :for="mail.id_email"
              v-if="mail.id_email !== 2"
            >
              <input
                type="checkbox"
                name="mainSwitch"
                :checked="mail.is_enabled == 1"
                :id="mail.id_email"
              />
              <i></i>
            </label>
          </div>
          <div class="actions">
            <router-link :to="'/view/email/templates/' + mail.id_email">
              <i class="fal fa-edit"></i>
            </router-link>
            <a href="#" @click.prevent="(e) => sendTestEmail(mail.id_email)">
              <i class="far fa-paper-plane"></i>
            </a>
          </div>
        </li>
        <li v-if="activeList && activeList.length == 0">
          <div>No data</div>
        </li>
      </ul>
      <div v-if="inactiveList.length > 0" class="otherEmail">
        <h2>Activate these email</h2>
        <ul class="emailList">
          <li class="head">
            <div class="name">Email Name</div>
            <div>Sent to</div>
            <div>Opened</div>
            <div>Status</div>
            <div>Action</div>
          </li>
          <li v-for="(mail, key) in inactiveList" :key="key">
            <div class="name">
              <i class="fal fa-envelope"></i>
              <div>
                <h5>{{ mail.title }}</h5>
                <p>{{ mail.type }}</p>
              </div>
            </div>
            <div>12,789</div>
            <div>12,789</div>
            <div>
              <label
                class="switch"
                @click.prevent="
                  changeEmailStatus(mail.id_email, mail.is_enabled)
                "
                :for="mail.id_email"
                v-if="mail.id_email !== 2"
              >
                <input
                  type="checkbox"
                  name="mainSwitch"
                  :checked="mail.is_enabled == 1"
                  :id="mail.id_email"
                />
                <i></i>
              </label>
            </div>
            <div class="actions">
              <router-link :to="'/view/email/templates/' + mail.id_email">
                <i class="fal fa-edit"></i>
              </router-link>
              <a href="#" @click.prevent="(e) => sendTestEmail(mail.id_email)">
                <i class="far fa-paper-plane"></i>
              </a>
            </div>
          </li>
        </ul>
      </div>
      <md-snackbar
        class="msgSnack"
        md-position="center"
        :md-duration="4000"
        :md-active.sync="emailMessage"
      >
        <span v-html="emailResponse"></span>
      </md-snackbar>
    </div>
  </div>
</template>
    

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Axios from "axios";

export default {
  name: "EmailListing",
  data: function () {
    return {
      bol: 1,
      listData: [],
      emailMessage: false,
      emailResponse: null,

      statuses: [
        {count:'147,789', attr:'Active clicks'},
        {count:'7,986', attr:'New subscribers'},
        {count:'154', attr:'New Referrales'},
        {count:'8,965', attr:'Coupons used'}
      ], 
      tab1:'Active Prompts', notification1:' (5)',
      tab2:'Paused Prompts', notification2:' (3)',
      tab3:'Drafts', notification3:' (10)',
      datasActive: [
          {fomoName:'Welcome Bonus', category:'Bonus Point', clicks:'12,789', visibleGreen:'icon-Users', visiblePink:'icon-Users', visibleOrange:'icon-Users', action:'icon-lineedit'},
          {fomoName:'You get 5. Your friend get(s) 50.', category:'Referral', clicks:'12,789', visibleGreen:'icon-Users', visiblePink:'icon-Users', visibleOrange:'icon-Users', action:'icon-lineedit'},
          {fomoName:'Custom FOMO', category:'Custom', clicks:'12,789', visibleGreen:'icon-Users', visiblePink:'icon-Users', visibleOrange:'icon-Users', action:'icon-lineedit'},
          {fomoName:'Gust User FOMO', category:'Pay with Points', clicks:'12,789', visibleGreen:'icon-Users', visiblePink:'icon-Users', visibleOrange:'icon-Users', action:'icon-lineedit'},
          {fomoName:'Subscribe to our newsletter', category:'Newsletter', clicks:'12,789', visibleGreen:'icon-Users', visiblePink:'icon-Users', visibleOrange:'icon-Users', action:'icon-lineedit'}
      ],
      datasPaused: [
          {fomoName:'Gust User FOMO', category:'Pay with Points', clicks:'12,789', visibleGreen:'icon-Users', visiblePink:'icon-Users', visibleOrange:'icon-Users', action:'icon-lineedit'},
          {fomoName:'Subscribe to our newsletter', category:'Newsletter', clicks:'12,789', visibleGreen:'icon-Users', visiblePink:'icon-Users', visibleOrange:'icon-Users', action:'icon-lineedit'},
          {fomoName:'Welcome Bonus', category:'Bonus Point', clicks:'12,789', visibleGreen:'icon-Users', visiblePink:'icon-Users', visibleOrange:'icon-Users', action:'icon-lineedit'},
          {fomoName:'You get 5. Your friend get(s) 50.', category:'Referral', clicks:'12,789', visibleGreen:'icon-Users', visiblePink:'icon-Users', visibleOrange:'icon-Users', action:'icon-lineedit'}
      ],
      datasDrafts: [
          {fomoName:'You get 5. Your friend get(s) 50.', category:'Referral', clicks:'12,789', visibleGreen:'icon-Users', visiblePink:'icon-Users', visibleOrange:'icon-Users', action:'icon-lineedit'},
          {fomoName:'Welcome Bonus', category:'Bonus Point', clicks:'12,789', visibleGreen:'icon-Users', visiblePink:'icon-Users', visibleOrange:'icon-Users', action:'icon-lineedit'}
      ],
      records: [
        {fomoIcon:'settings', fomoHead:'Signup Bonus', fomoNotification:'3'},
        {fomoIcon:'mail_outline', fomoHead:'Newsletter', fomoNotification:''},
        {fomoIcon:'bookmark', fomoHead:'New Product Release', fomoNotification:''},
        {fomoIcon:'timer', fomoHead:'Timer FOMO', fomoNotification:''},
        {fomoIcon:'sell', fomoHead:'Next Rewards', fomoNotification:'7'},
        {fomoIcon:'redeem', fomoHead:'Bonus Rewards', fomoNotification:''},
        {fomoIcon:'card_giftcard', fomoHead:'Celebrate Events', fomoNotification:''},
        {fomoIcon:'radio_button_checked', fomoHead:'Pay with points', fomoNotification:''},
        {fomoIcon:'supervisor_account', fomoHead:'Referral Program', fomoNotification:''}
      ]
    };
  },
  mixins: ["createFormData"],
  computed: {
    activeList: function () {
      return this.listData.filter(({ is_enabled }) => is_enabled == 1);
    },
    inactiveList: function () {
      return this.listData.filter(({ is_enabled }) => is_enabled == 0);
    },
  },
  methods: {
    changeEmailStatus: function (id, status) {
      const params = {
        is_enabled: status ? 0 : 1,
        id_email: id,
      };
      const formData = new FormData();
      for (var key in params) {
        formData.append(key, params[key]);
      }
      Axios.post(
        "https://gr-v1.devam.pro/services/email/updateEmailStatus",
        formData
      ).then(({ data, status }) => {
        if (status == 200) {
          this.emailResponse = `<i class="fas fa-check-circle"></i> ${data.msg}`;
          this.listData = this.listData.map((item) =>
            item.id_email == id ? { ...item, is_enabled: status ? 0 : 1 } : item
          );
        } else
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`;
        this.emailMessage = true;
      });
    },
    sendTestEmail: function (id) {
      Axios.post(
        "https://gr-v1.devam.pro/services/email/sendTestEmail",
        this.createFormData({ id_email: id })
      ).then(({ data, status }) => {
        if (status == 200) {
          this.emailResponse = `<i class="fas fa-check-circle"></i> ${data.msg}`;
        } else
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`;
        this.emailMessage = true;
      });
    },
  },
  mounted: function () {
    Axios.get("https://gr-v1.devam.pro/services/email/getEmailTemplates").then(
      ({ data }) => (this.listData = data.data)
    );
  },
};
</script>

<style lang="less" scoped>
/* Fomo */
.fomoContainer {
    background: #f9f9f9;
}
.fomoContainer h2 {
    font-size: 36px;
    letter-spacing: -0.94px;
    line-height: 41px;
    color: #333;
    margin: 30px 0 10px;
}
.fomoContainer p {
    font-size: 13px;
    color: #202020;
    line-height: 16px;
    margin: 0;
}
.fomo_block {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
@media only screen and (max-width: 989px) {
	.fomo_block {
		flex-direction: column;
	}
}

/* Active FOMO */
.emailListing {
  padding-bottom: 5em;
}
.emailListingHead {
  color: #fff;
  padding: 5em 0 5em;

  h2 {
    font-size: 3.6em;
    font-weight: 100;
    margin: 0;
    line-height: normal;
  }

  h4 {
    font-size: 2em;
    font-weight: 100;
    margin: 0;
    line-height: normal;
  }

  p {
    font-size: 13px;
    line-height: 16px;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 2.5em 0;
  }

  li:not(:first-child) {
    border-left: 1px solid #546882;
    padding-left: 3em;
    margin-left: 3em;
  }
}
.activateEmail {
  margin: 2em 0 1.5em;
}
.emailNav {
  display: flex;
  background: #333333;
  margin-top: -56px;
  li {
    flex-grow: 1;
    flex-shrink: 0;
    &:not(:last-child) {
      border-right: 1px solid #ccc;
    }

    a {
      color: #9a9a9a;
    }

    &.active {
      background: #fff;
      pointer-events: none;
      a {
        border: none;
        color: #007aff;
      }
    }
  }
}

.emailListingContainer {
  margin-top: -52px;
}

.otherEmail {
  overflow: hidden;
}

.emailList {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #fff;
  border: 1px solid #e2e2e2;
  margin-bottom: 50px;

  .noData {
    padding: 50px 0;
    text-align: center;
    justify-content: center;
    font-size: 1.2em;
  }

  p,
  h5 {
    margin: 0;
    font-size: 12px;
  }

  h5 {
    font-weight: 500;
    line-height: normal;
    margin-bottom: 0.3em;
  }

  li {
    display: flex;
    padding: 0 40px;

    &.head {
      background: #e4f3f9;
      border-bottom: 1px solid #e2e2e2;

      div {
        font-weight: bold;
      }
    }
  }
}

.emailList li > div {
  flex-grow: 1;
  padding: 15px 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.emailList li:not(.head) {
  color: #000;
}

.emailList li:not(.head):not(:last-child) > div {
  border-bottom: 1px solid #e2e2e2;
}

.emailList li > div.name {
  width: 60%;
  line-height: 1;
  align-items: center;
}

.emailList li > div:not(.name) {
  text-align: center;
  width: 10%;
}

.emailList .actions a {
  font-size: 1.5em;
  color: rgba(34, 43, 69, 0.5);
  line-height: 1;

  &:first-child {
    margin-right: 10px;
  }
}

.emailList .fa-envelope {
  font-size: 1.7em;
  width: 2em;
  height: 2em;
  border: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 15px;

  &:before {
    color: #bdbdbd;
  }
}

.emailListingContainer h3 {
  font-size: 2em;
  font-weight: 400;
  margin: 3em 0 1.5em;
}


  /* Create FOMO */
  .create_fomo {
    background: white;
    flex: 1;
  }
  @media only screen and (max-width: 989px) {
    .active_fomo, .create_fomo {
      width: 96%;
        margin: 2%;
    }
  }
  .titleBlock {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 50px;
      border-bottom: 1px solid #e7e7e7;
  }
  .fomoContainer .titleBlock h2 {
      font-size: 20px;
      letter-spacing: -0.52px;
      line-height: 23px;
      color: #333;
      margin: 0;
  }
  
  .active_fomo {
    flex: 2;
  }
  .fomoHeader {
    background: url(../../assets/fomo-header-bg.png) no-repeat scroll 0 center;
    background-size: cover;
    padding: 50px 10% 72px;
  }
  .statusBlock {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 30px;
  }
  .statusBlock div {
      padding: 0 30px;
      flex-grow: 1;
      border-left: 1px solid #bbb;
  }
  .statusBlock div:first-child {
      padding-left: 0;
      border-left: 0;
  }
  .statusBlock div h3 {
      color: #333;
      margin: 0;
      font-size: 26px;
      line-height: 31px;
  }
  .statusBlock div p {
      font-size: 12px;
      color: #333;
      line-height: 15px;
  }

  
  .fomoList {
    margin-top: -68px;
      padding: 0 10%;

    .md-tabs {
      margin-top: 30px;

      .md-button {
        background: #474747;
        border-left: 1px solid #777;
        font-size: 13px;
        color: #9e9e9e;
        padding: 10px 20px;
        line-height: 16px;

        &:first-child {
            border-left: none;
        }

        &.md-active {
          background: #fff;
          color: #007aff;
          font-weight: 500;
          font-size: 14px;    
        }
      }

      .md-tabs.md-theme-default .md-tabs-indicator {
        background-color: #fff;
        background-color: var(--md-theme-default-primary-on-background, #007aff);
        top:0;
      }
    }
  }

  /* tableList table */
  .tableList thead tr th {
    background: #fff;
    font-weight: 500;
    border-bottom: 1px solid #eee;
    font-size: 12px;
    line-height: 15px;
    color: #999;
    padding: 10px;
    text-align: left;

  }
  .tableList tbody tr td:first-child {
    border-left: 1px solid #eee;
  }
  .tableList tbody tr td:last-child {
    border-right: 1px solid #eee;
  }
  .tableList tr:nth-child(odd)>td {
    background-color: #f9f9f9;
  }
  .tableList tbody tr td {
    border-bottom: 1px solid #eee;
    vertical-align: middle;
    padding: 10px;
  }
  .tableList .icon_block {
      display: flex;
      align-items: center;
  }
  .tableList .icon_block .fomo_icon {
      width: 25px;
      height: 25px;
      padding: 6px;
      box-sizing: border-box;
      margin: 1px;
      border-radius: 50%;
  }
  .tableList .fomo_icon.visible-green {
      border: 1px solid #adda86;
      color: #adda86;
  }
  .tableList .fomo_icon.visible-pink {
      border: 1px solid #ffbaba;
      color: #ffbaba;
  }
  .tableList .fomo_icon.visible-orange {
      border: 1px solid #ffca74;
      color: #ffca74;
  }
  .tableList .font-size-mid {
    font-size: 12px;
      color: #202020;
  }
  .tableList .font-size-small {
      font-size: 10px;
      color: #999;
  }
  .tableList .table.table-striped {
    border-collapse: collapse;
  }

  .btn_link {
    color: #333;
      text-decoration: underline;
      line-height: 15px;
  }
  .btn_link:hover {
    text-decoration: none;
  }
  .btn_link-small {
    font-size: 12px;
  }
  .newFomoList {
      padding: 20px 50px;
  }
  .newFomoList .new_list {
    display: flex;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
  }
  .newFomoList .fomo_icon {
      border-radius: 50%;
      width: 48px;
      background: #e2f3ff;
      color: #5988bc;
      position: relative;
      height: 35px;
      padding: 10px;
  }
  .newFomoList .fomo_icon span {
      background: #007aff;
      border-radius: 50%;
      padding: 3px 5px;
      font-size: 9px;
      color: #fff;
      position: absolute;
      top: 0;
      right: -5px;
      font-family: sans-serif;
      line-height: 8px;
  }
  .newFomoList .new_list .fomo_details {
    width: 100%;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
  }
  .newFomoList .new_list h3 {
    font-size: 12px;
      margin: 0;
      font-weight: normal;
      color: #555;
  }
  .newFomoList .new_list .btn {
    border: 1px solid #d5d5d5;
    padding: 0;
    color: #202020;
    font-size: 12px;
    font-weight: 600;
  }
  .newFomoList .new_list .btn.btn-setup {
      background: #f0f0f0;
      border: 1px solid #f0f0f0;
  }
  .create_fomo .create-new .fomo_icon  {
    color: #333;
    background: none;
    border: 1px dashed #979797;
  }
</style>

<style lang="less">  
  .fomoList {
    margin-top: -68px;
      padding: 0 10%;

    .md-tabs {
      margin-top: 30px;

      .md-button {
        background: #474747;
        border-left: 1px solid #777;
        font-size: 13px;
        color: #9e9e9e !important;
        height:38px;

        &:first-child {
            border-left: none;
        }

        &.md-active {
          background: #fff;
          color: #007aff !important;
          font-weight: 500;
          font-size: 14px;    
        }
      }

      &.md-theme-default .md-tabs-indicator {
        background-color: #fff;
        background-color: var(--md-theme-default-primary-on-background, #007aff);
        top:0;
      }

      .md-content {
        .md-tab {
          padding: 0;

          table {
            width: calc(100% - 1px);
          }
        }
      }
    }
  }
</style>