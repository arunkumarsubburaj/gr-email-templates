<template>
  <div class="home">
    <div class="emailheader">
      <div class="container">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100 emailListingHead">
            <h2>Email</h2>
            <p>Some text to explain about the email templates</p>
            <ul>
              <li>
                <h4>147,789</h4>
                <small>Mails Opened</small>
              </li>
              <li>
                <h4>8,789</h4>
                <small>New subscribers</small>
              </li>
              <li>
                <h4>154</h4>
                <small>Unsubscribed</small>
              </li>
            </ul>
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
              <!-- <p>{{ mail.type }}</p> -->
            </div>
          </div>
          <div>12,789</div>
          <div>12,789</div>
          <div>
            <label
              class="switch"
              title="Update status"
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
              <i title="Edit" class="fal fa-edit"></i>
            </router-link>
            <a href="#" @click.prevent="(e) => sendTestEmail(mail.id_email)">
              <i title="Send Test Email" class="far fa-paper-plane"></i>
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
                <!-- <p>{{ mail.type }}</p> -->
              </div>
            </div>
            <div>12,789</div>
            <div>12,789</div>
            <div>
              <label
                class="switch"
                title="Update status"
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
                <i title="Edit" class="fal fa-edit"></i>
              </router-link>
              <a href="#" @click.prevent="(e) => sendTestEmail(mail.id_email)">
                <i title="Send Test Email" class="far fa-paper-plane"></i>
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
    <Loader :status="loader" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Loader from "@/components/Loader.vue";
import Axios from "axios";

export default {
  name: "EmailListing",
  data: function () {
    return {
      bol: 1,
      listData: [],
      emailMessage: false,
      emailResponse: null,
      loader: false,
    };
  },
  components: { Loader },
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
      this.loader = true;
      const params = {
        is_enabled: status ? 0 : 1,
        id_email: id,
      };
      const formData = new FormData();
      for (var key in params) {
        formData.append(key, params[key]);
      }
      Axios.post(
        `${Config.callback_url}/services/email/updateEmailStatus`,
        formData
      ).then(({ data, status }) => {
        this.loader = false;
        if (status == 200) {
          this.emailResponse = `<i class="fas fa-check-circle"></i> ${data.msg}`;
          this.listData = this.listData.map((item) =>
            item.id_email == id
              ? { ...item, is_enabled: params.is_enabled }
              : item
          );
        } else
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`;
        this.emailMessage = true;
      });
    },
    sendTestEmail: function (id) {
      this.loader = true;
      Axios.post(
        `${Config.callback_url}/services/email/sendTestEmail`,
        this.createFormData({ id_email: id })
      ).then(({ data, status }) => {
        this.loader = false;
        if (status == 200) {
          this.emailResponse = `<i class="fas fa-check-circle"></i> An email has been sent to ${data.mail_to}`;
        } else
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> There was an error sending mail to ${data.mail_to}`;
        this.emailMessage = true;
      });
    },
  },
  mounted: function () {
    this.loader = true;
    Axios.get(`${Config.callback_url}/services/email/getEmailTemplates`).then(
      ({ data }) => {
        this.listData = data.data;
        this.loader = false;
      }
    );
  },
};
</script>

<style lang="less" scoped>
.emailheader {
  background: url(https://s3.us-east-1.amazonaws.com/devam.pro/gr/master/upload/img/395/95/4395_logo_1613395827.jpg) no-repeat;
  background-size: cover;
}
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
</style>