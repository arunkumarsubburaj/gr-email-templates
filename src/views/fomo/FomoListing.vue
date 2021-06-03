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
        <div v-if="loading">Loading....</div>
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
          </div>
          <div class="fomoList" v-if="listData">
            <md-tabs class="fomo-tabs" md-alignment="fixed">
              <md-tab id="tab-home" md-label="Active Prompts (5)">
                <div
                  class="table-responsive tableList"
                  v-if="activeFomo.length"
                >
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
                      <tr v-for="data in activeFomo" :key="data.id">
                        <td class="font-size-mid">
                          {{ data.attributes.name }}
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
                          <label
                            class="switch"
                            :for="data.id"
                            @click="
                              e => updateStatus(data.id, data.attributes.status)
                            "
                          >
                            <input
                              type="checkbox"
                              name="mainSwitch"
                              :checked="data.attributes.status == 1"
                            />
                            <i></i>
                          </label>
                        </td>
                        <td class="align-center">
                          <router-link :to="`/view/fomo/config/${data.id}`">
                            <md-icon>edit</md-icon>
                          </router-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else>No active FOMOs available</div>
              </md-tab>
              <md-tab id="tab-pages" md-label="PausedPrompts(3)">
                <div
                  class="table-responsive tableList"
                  v-if="inactiveFomo.length"
                >
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
                      <tr v-for="data in inactiveFomo" :key="data.id">
                        <td class="font-size-mid">
                          {{ data.attributes.name }}
                        </td>
                        <td class="font-size-small">
                          {{ data.type }}
                        </td>
                        <td>
                          <label
                            class="switch"
                            :for="data.id"
                            @click="
                              e => updateStatus(data.id, data.attributes.status)
                            "
                          >
                            <input
                              type="checkbox"
                              name="mainSwitch"
                              :checked="data.attributes.status === 1"
                            />
                            <i></i>
                          </label>
                        </td>
                        <td class="align-center">
                          <router-link :to="`/view/fomo/config/${data.id}`">
                            <md-icon>edit</md-icon>
                          </router-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else>No paused FOMOs available</div></md-tab
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
              v-for="template in templates"
              :key="template.id"
            >
              <md-icon class="fomo_icon">
                <span>V</span>
              </md-icon>
              <div class="fomo_details">
                <h3>{{ template.attributes.name }}</h3>
              </div>
              <md-button
                v-if="!template.attributes.disabled"
                :md-ripple="false"
                class="md-dense btn"
                >Add</md-button
              >
            </div>
          </div>
          <!-- <div class="titleBlock">
            <h2>Upcoming templates</h2>
          </div>
          <div class="newFomoList">
            <div class="upcomingFomoList"></div>
            <div
              class="new_list"
              v-for="template in uTemplates"
              :key="template.fomoIcon"
            >
              <md-icon class="fomo_icon">
                {{ template.fomoIcon }}
                <span v-if="template.fomoNotification">{{
                  template.fomoNotification
                }}</span>
              </md-icon>
              <div class="fomo_details">
                <h3>{{ template.fomoHead }}</h3>
              </div>
              <md-button :md-ripple="false" class="md-dense btn">Add</md-button>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Axios from "axios";
//import Loader from "@/components/Loader.vue";

export default {
  name: "FomoListing",
  mixins: ["createFormData"],
  data: function() {
    return {
      listData: null,
      templates: [],
      loading: true,
      errored: false
    };
  },
  computed: {
    activeFomo: function() {
      return this.listData.filter(({ attributes }) => attributes.status == 1);
    },
    inactiveFomo: function() {
      return this.listData.filter(({ attributes }) => attributes.status == 0);
    }
  },
  methods: {
    fetchSiteFomo: function() {
      Axios.get(
        "https://logesh.devam.pro/gr/fomo?id_shop=1902&admin_email=jayakumar@appsmav.com"
      )
        .then(({ data }) => {
          this.listData = data.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },

    fetchAllFomo: function() {
      Axios.get(
        "https://logesh.devam.pro/gr/fomo/all?id_shop=1902&admin_email=jayakumar@appsmav.com"
      )
        .then(({ data }) => {
          console.log(data);
          this.templates = data.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    updateStatus: function(id, status) {
      const params = {
        id: id,
        status: status == 0 ? 1 : 0
      };
      Axios.post(
        "https://logesh.devam.pro/gr/fomo/updateStatus?id_shop=1902&admin_email=jayakumar@appsmav.com",
        this.createFormData(params)
      )
        .then(({ data }) => {
          if (data.data.status === "success") {
            this.listData = this.listData.map(item =>
              item.id === id
                ? {
                    ...item,
                    attributes: { ...item.attributes, status: params.status }
                  }
                : item
            );
          } else {
            this.errored = true;
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));

      // Change status using ID & !status
    }
  },
  mounted: function() {
    this.fetchSiteFomo();
    this.fetchAllFomo();
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
  max-width: 400px;
  min-height: 100vh;
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
  margin-top: -38px;
  padding: 0 10%;
  .md-content {
    .md-tab {
      padding: 0;

      table {
        width: calc(100% - 1px);
        background-color: #fff;
        td {
          background-color: #fff;
        }
      }
    }
  }
}

.newFomoList {
  position: relative;

  .upcomingFomoList {
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 9;
    opacity: 0.7;
    left: 0;
    top: 0;
  }
}
.fomo-tabs.md-tabs {
  .md-tab-nav-button {
    background: #474747;
    border-left: 1px solid #777;
    flex-grow: 1;
    font-size: 13px;
    color: #9e9e9e !important;
    height: 38px;
    max-width: 100% !important;
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
}
</style>
