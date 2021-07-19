<template>
  <div class="amvip--landingGrey">
    <div class="circles">
      <div class="circle1"></div>
      <div class="circle2"></div>
    </div>
    <aside class="amvip--landingBrand">
      <div>
        <span class="icon-crown"></span>
        <h2>VIP</h2>
        <h3>Tiers</h3>
        <small>Beta</small>
      </div>
    </aside>
    <section class="amvip-accordContent">
      <section>
        <span class="icon-next-arrow goBack" @click="goBack"> </span>
        <h2>Benefits of <br />VIP Tiers</h2>
        <!-- <div class="amvip--accordionItem">
          <input type="checkbox" id="accorRewards" checked />
          <label class="amvip--accordionTitle" for="accorRewards">
            <span>Rewards</span>
            <i></i>
          </label>
          <div class="amvip--accordionBody">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
              numquam sed architecto sunt. Quam, excepturi.
            </p>
            <div class="amvip--rewardTabs">
              <div class="amvip--rewardTabHeader">
                <label for="onceOffRewards" class="active"
                  >Once-off rewards</label
                >
                <label for="ongoingRewards">Ongoing rewards</label>
                <label for="otherRewards">Other rewards</label>
              </div>
              <div class="amvip--rewardTabContent">
                <input
                  type="radio"
                  name="accordTabReward"
                  id="onceOffRewards"
                  checked
                />
                <section class="amvip--rewardTabItem">
                  <ul class="amvip--bulletList">
                    <li>Get XX Points</li>
                    <li>Get Instant coupon</li>
                    <li>
                      Get non financial reward<small
                        >e.g. personal invite to new stock viewing</small
                      >
                    </li>
                  </ul>
                </section>

                <input
                  type="radio"
                  name="accordTabReward"
                  id="ongoingRewards"
                />
                <section class="amvip--rewardTabItem">
                  <ul class="amvip--bulletList">
                    <li>Get XX Points</li>
                    <li>Get Instant coupon</li>
                  </ul>
                </section>

                <input type="radio" name="accordTabReward" id="otherRewards" />
                <section class="amvip--rewardTabItem">
                  <ul class="amvip--bulletList">
                    <li>Get Instant coupon</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div class="amvip--accordionItem">
          <input type="checkbox" id="accordAdminDashboard" />
          <label class="amvip--accordionTitle" for="accordAdminDashboard">
            <span>Admin Dashboard</span>
            <i></i>
          </label>
          <div class="amvip--accordionBody">
            <p>
              Admin Dashboard Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Mollitia, nam?
            </p>
          </div>
        </div>

        <div class="amvip--accordionItem">
          <input type="checkbox" id="accordAnalytics" />
          <label class="amvip--accordionTitle" for="accordAnalytics">
            <span>Analytics</span>
            <i></i>
          </label>
          <div class="amvip--accordionBody">
            <p>
              Analytics Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Mollitia, nam?
            </p>
          </div>
        </div> -->
        <md-list :md-expand-single="true" id="introExpansionList">
          <md-list-item md-expand :md-expanded="true">
            <span class="md-list-item-text">Rewards</span>
            <div
              class="amvip--accordionBody list-content-wrapper"
              slot="md-expand"
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                numquam sed architecto sunt. Quam, excepturi.
              </p>
              <!-- <div class="amvip--rewardTabs">
                <div class="amvip--rewardTabHeader">
                  <label for="onceOffRewards" class="active"
                    >Once-off rewards</label
                  >
                  <label for="ongoingRewards">Ongoing rewards</label>
                  <label for="otherRewards">Other rewards</label>
                </div>
                <div class="amvip--rewardTabContent">
                  <input
                    type="radio"
                    name="accordTabReward"
                    id="onceOffRewards"
                    checked
                  />
                  <section class="amvip--rewardTabItem">
                    <ul class="amvip--bulletList">
                      <li>Get XX Points</li>
                      <li>Get Instant coupon</li>
                      <li>
                        Get non financial reward<small
                          >e.g. personal invite to new stock viewing</small
                        >
                      </li>
                    </ul>
                  </section>

                  <input
                    type="radio"
                    name="accordTabReward"
                    id="ongoingRewards"
                  />
                  <section class="amvip--rewardTabItem">
                    <ul class="amvip--bulletList">
                      <li>Get XX Points</li>
                      <li>Get Instant coupon</li>
                    </ul>
                  </section>

                  <input
                    type="radio"
                    name="accordTabReward"
                    id="otherRewards"
                  />
                  <section class="amvip--rewardTabItem">
                    <ul class="amvip--bulletList">
                      <li>Get Instant coupon</li>
                    </ul>
                  </section>
                </div>
              </div> -->
              <md-tabs
                class="md-transparent"
                md-alignment="centered"
                id="vipIntro-tabContainer"
              >
                <md-tab id="tab-home" md-label="Once-off rewards">
                  <section class="amvip--rewardTabItem">
                    <ul class="amvip--bulletList">
                      <li>Get XX Points</li>
                      <li>Get Instant coupon</li>
                      <li>
                        Get non financial reward<small
                          >e.g. personal invite to new stock viewing</small
                        >
                      </li>
                    </ul>
                  </section>
                </md-tab>
                <md-tab id="tab-pages" md-label="Ongoing rewards">
                  <section class="amvip--rewardTabItem">
                    <ul class="amvip--bulletList">
                      <li>Get XX Points</li>
                      <li>Get Instant coupon</li>
                    </ul>
                  </section>
                </md-tab>
                <md-tab id="tab-posts" md-label="Other rewards">
                  <section class="amvip--rewardTabItem">
                    <ul class="amvip--bulletList">
                      <li>Get Instant coupon</li>
                    </ul>
                  </section>
                </md-tab>
              </md-tabs>
            </div>
          </md-list-item>

          <md-list-item md-expand>
            <span class="md-list-item-text">Admin Dashboard</span>
            <div
              class="amvip--accordionBody list-content-wrapper"
              slot="md-expand"
            >
              <p>
                Admin Dashboard Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Mollitia, nam?
              </p>
            </div>
          </md-list-item>

          <md-list-item md-expand>
            <span class="md-list-item-text">Analytics</span>
            <div
              class="amvip--accordionBody list-content-wrapper"
              slot="md-expand"
            >
              <p>
                Analytics Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Mollitia, nam?
              </p>
            </div>
          </md-list-item>
        </md-list>
      </section>
    </section>
  </div>
</template>
<style lang="less">
@import url("./../../assets/vip-tier/less/_home.less");
#introExpansionList {
  background: transparent;
  border: none;
  .md-list-item-container {
    border: none;
  }
}
#vipIntro-tabContainer {
  .md-tab {
    white-space: normal;
  }
  .md-tabs-navigation {
    > .md-button {
      white-space: normal;
    }
  }
}
</style>
<script>
export default {
  name: "Intro",
  components: {},
  methods: {
    goBack() {
      this.$router.push("home");
    },
  },
};
</script>
