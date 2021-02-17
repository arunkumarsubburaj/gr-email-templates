<template>
  <div class="home">
    <div class="fomoContainer">
      <div class="fomo_block" v-if="errored">
        <div class="warning">
          We're sorry, we're not able to retrieve this information at the
          moment, please try back later
        </div>
      </div>
      <div class="fomo_block" v-else>
        <div v-if="loading">Loading...</div>
        <div class="active_fomo">
          <div class="fomoHeader">
            <h2>Fomo Prompts</h2>
            <p>Some text explains about this FOMO prompts can be here.</p>
            <!--<div class="statusBlock">
              <div v-for="status in statuses" :key="status.count">
                <h3>{{ status.count }}</h3>
                <p>{{ status.attr }}</p>
              </div>
            </div>-->
            {{ info }}
          </div>
          <div class="fomoList">
            <md-tabs md-alignment="fixed">
              <md-tab id="tab-home" :md-label="tab1 + notification1">
                <div class="table-responsive tableList">
                  <table class="table table-striped snap-top">
                    <thead>
                      <tr>
                        <th>FOMO Name</th>
                        <th>Category</th>
                        <!--<th>Clicks</th>
                        <th>Visible to</th>-->
                        <th class="align-center">Status</th>
                        <th class="align-center">Action</th>
                      </tr>
                    </thead>
                    <tbody class="sort-item">
                      <tr v-for="data in info" :key="data.id_fomo">
                        <td class="font-size-mid" v-text="data.description">
                          {{ data.title }}
                          {{ data.description }}
                        </td>
                        <td class="font-size-small">
                          {{ data.type }}
                        </td>
                        <!--<td class="font-size-mid" v-text="data.clicks">
                          {{ data.clicks }}
                        </td>
                        <td>
                          <div class="icon_block">
                            <md-icon class="fomo_icon visible-green"
                              >person</md-icon
                            >
                            <md-icon class="fomo_icon visible-pink"
                              >person</md-icon
                            >
                            <md-icon class="fomo_icon visible-orange"
                              >person</md-icon
                            >
                          </div>
                        </td>-->
                        <td>
                          <label class="switch">
                            <input type="checkbox" name="mainSwitch" checked />
                            <i></i>
                          </label>
                        </td>
                        <td class="align-center">
                          <md-icon>edit</md-icon>
                        </td>
                      </tr>
                      <tr v-if="activeList && activeList.length == 0">
                        <td colspan="6">No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </md-tab>
              <md-tab id="tab-pages" :md-label="tab2 + notification2"
                >{{ tab2 }} {{ notification2 }}</md-tab
              >
              <md-tab id="tab-posts" :md-label="tab3 + notification3"
                >{{ tab3 }} {{ notification3 }}</md-tab
              >
            </md-tabs>
          </div>
        </div>
        <div class="create_fomo">
          <div class="titleBlock">
            <h2>Create New</h2>
            <a href="#" class="btn_link btn_link-small">View all templates</a>
          </div>
          <div class="newFomoList">
            <div
              class="new_list"
              v-for="record in records"
              :key="record.fomoIcon"
            >
              <md-icon class="fomo_icon">
                {{ record.fomoIcon }}
                <span v-if="record.fomoNotification">{{
                  record.fomoNotification
                }}</span>
              </md-icon>
              <div class="fomo_details">
                <h3>{{ record.fomoHead }}</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn">Add</md-button>
            </div>
            <!-- Setup -->
            <div class="new_list">
              <md-icon class="fomo_icon">payment</md-icon>
              <div class="fomo_details">
                <h3>Pay with points</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn btn-setup"
                >Setup</md-button
              >
            </div>
            <!-- Create new -->
            <div class="new_list create-new">
              <md-icon class="fomo_icon">design_services</md-icon>
              <div class="fomo_details">
                <h3>Create design</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn btn-setup"
                >Create</md-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Axios from "axios";

export default {
  name: "FomoListing",
  data: function() {
    return {
      bol: 1,
      listData: [],
      info: null,
      loading: true,
      errored: false,
      emailMessage: false,
      emailResponse: null,

      statuses: [
        { count: "147,789", attr: "Active clicks" },
        { count: "7,986", attr: "New subscribers" },
        { count: "154", attr: "New Referrales" },
        { count: "8,965", attr: "Coupons used" }
      ],
      tab1: "Active Prompts",
      notification1: " (5)",
      tab2: "Paused Prompts",
      notification2: " (3)",
      tab3: "Drafts",
      notification3: " (10)",
      datasActive: [
        {
          id_email: 6,
          fomoName: "Welcome Bonus",
          category: "Bonus Point",
          clicks: "12,789",
          visibleGreen: "icon-Users",
          visiblePink: "icon-Users",
          visibleOrange: "icon-Users",
          action: "icon-lineedit",
          is_enabled: 1,
          show_disable: 1
        },
        {
          id_email: 2,
          fomoName: "You get 5. Your friend get(s) 50.",
          category: "Referral",
          clicks: "12,789",
          visibleGreen: "icon-Users",
          visiblePink: "icon-Users",
          visibleOrange: "icon-Users",
          action: "icon-lineedit",
          is_enabled: 1,
          show_disable: 1
        },
        {
          id_email: 3,
          fomoName: "Custom FOMO",
          category: "Custom",
          clicks: "12,789",
          visibleGreen: "icon-Users",
          visiblePink: "icon-Users",
          visibleOrange: "icon-Users",
          action: "icon-lineedit",
          is_enabled: 1,
          show_disable: 1
        },
        {
          id_email: 4,
          fomoName: "Gust User FOMO",
          category: "Pay with Points",
          clicks: "12,789",
          visibleGreen: "icon-Users",
          visiblePink: "icon-Users",
          visibleOrange: "icon-Users",
          action: "icon-lineedit",
          is_enabled: 1,
          show_disable: 1
        },
        {
          id_email: 5,
          fomoName: "Subscribe to our newsletter",
          category: "Newsletter",
          clicks: "12,789",
          visibleGreen: "icon-Users",
          visiblePink: "icon-Users",
          visibleOrange: "icon-Users",
          action: "icon-lineedit",
          is_enabled: 1,
          show_disable: 0
        }
      ],
      records: [
        {
          fomoIcon: "settings",
          fomoHead: "Signup Bonus",
          fomoNotification: "3"
        },
        {
          fomoIcon: "mail_outline",
          fomoHead: "Newsletter",
          fomoNotification: ""
        },
        {
          fomoIcon: "bookmark",
          fomoHead: "New Product Release",
          fomoNotification: ""
        },
        { fomoIcon: "timer", fomoHead: "Timer FOMO", fomoNotification: "" },
        { fomoIcon: "sell", fomoHead: "Next Rewards", fomoNotification: "7" },
        { fomoIcon: "redeem", fomoHead: "Bonus Rewards", fomoNotification: "" },
        {
          fomoIcon: "card_giftcard",
          fomoHead: "Celebrate Events",
          fomoNotification: ""
        },
        {
          fomoIcon: "radio_button_checked",
          fomoHead: "Pay with points",
          fomoNotification: ""
        },
        {
          fomoIcon: "supervisor_account",
          fomoHead: "Referral Program",
          fomoNotification: ""
        }
      ]
    };
  },
  mixins: ["createFormData"],
  computed: {
    activeList: function() {
      return this.listData.filter(({ is_enabled }) => is_enabled == 1);
    },
    inactiveList: function() {
      return this.listData.filter(({ is_enabled }) => is_enabled == 0);
    }
  },
  methods: {},
  mounted: function() {
    Axios.get("https://jai.devam.pro/gr/admin/fomo/getFomo/1")
      .then(response => (this.info = response))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

<style lang="less" scoped>
/* Fomo */
.fomoContainer {
  background: #f9f9f9;

  h2 {
    font-size: 36px;
    letter-spacing: -0.94px;
    line-height: 41px;
    color: #333;
    margin: 30px 0 10px;
  }

  p {
    font-size: 13px;
    color: #202020;
    line-height: 16px;
    margin: 0;
  }
}

.fomo_block {
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  .error,
  .warning {
    text-align: center;
    width: 100%;
    border: 1px solid;
    margin: 100px 0px;
    padding: 15px 10px 15px 50px;
  }

  .error {
    color: #9f6000;
    background-color: #feefb3;
  }

  .warning {
    color: #d8000c;
    background-color: #ffbaba;
  }
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

/* Create FOMO */
.create_fomo {
  background: white;
  flex: 1;

  .create-new .fomo_icon {
    color: #333;
    background: none;
    border: 1px dashed #979797;
  }
}

@media only screen and (max-width: 989px) {
  .active_fomo,
  .create_fomo {
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

  div {
    padding: 0 30px;
    flex-grow: 1;
    border-left: 1px solid #bbb;

    &:first-child {
      padding-left: 0;
      border-left: 0;
    }

    h3 {
      color: #333;
      margin: 0;
      font-size: 26px;
      line-height: 31px;
    }

    p {
      font-size: 12px;
      color: #333;
      line-height: 15px;
    }
  }
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
      top: 0;
    }
  }
}

/* tableList table */
.tableList {
  thead tr th {
    background: #fff;
    font-weight: 500;
    border-bottom: 1px solid #eee;
    font-size: 12px;
    line-height: 15px;
    color: #999;
    padding: 10px;
    text-align: left;
  }

  tr:nth-child(odd) > td {
    background-color: #f9f9f9;
  }

  tbody tr td {
    border-bottom: 1px solid #eee;
    vertical-align: middle;
    padding: 10px;

    &:first-child {
      border-left: 1px solid #eee;
    }
    &:last-child {
      border-right: 1px solid #eee;
    }
  }

  .icon_block {
    display: flex;
    align-items: center;

    .fomo_icon {
      width: 25px;
      height: 25px;
      padding: 6px;
      box-sizing: border-box;
      margin: 1px;
      border-radius: 50%;

      &.visible-green {
        border: 1px solid #adda86;
        color: #adda86;
      }

      &.visible-pink {
        border: 1px solid #ffbaba;
        color: #ffbaba;
      }

      &.visible-orange {
        border: 1px solid #ffca74;
        color: #ffca74;
      }
    }
  }

  .font-size-mid {
    font-size: 12px;
    color: #202020;
  }

  .font-size-small {
    font-size: 10px;
    color: #999;
  }

  .table.table-striped {
    border-collapse: collapse;
  }
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

  .new_list {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    padding: 10px 0;

    .fomo_details {
      width: 100%;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
    }

    h3 {
      font-size: 12px;
      margin: 0;
      font-weight: normal;
      color: #555;
    }

    .btn {
      border: 1px solid #d5d5d5;
      padding: 0;
      color: #202020;
      font-size: 12px;
      font-weight: 600;

      &.btn-setup {
        background: #f0f0f0;
        border: 1px solid #f0f0f0;
      }
    }
  }

  .fomo_icon {
    border-radius: 50%;
    width: 48px;
    background: #e2f3ff;
    color: #5988bc;
    position: relative;
    height: 35px;
    padding: 10px;

    span {
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
  }
}
</style>

<style lang="less">
.md-icon {
  font-size: 18px !important;
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
      color: #9e9e9e !important;
      height: 38px;

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
      top: 0;
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
