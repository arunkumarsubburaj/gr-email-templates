<template>
  <div>
    <div v-if="eData">
      <div class="email" v-if="editPageView">
        <div class="fixedHeaderBlock">
          <div class="fixedHeaderBlockInner">
            <a class="link-back" @click.prevent="togglePageview">
              <i class="fa fa-long-arrow-left"></i>
            </a>
            <div class="title">
              <div class="icon far fa-envelope margin-right-10"></div>
              <span>Welcome Email</span>
            </div>
          </div>
          <div>
            <md-button class="md-raised" @click.prevent="sendTestEmail"
              >Sent Test Email</md-button
            >
            <md-button @click.prevent="handleSave" class="md-raised md-accent"
              >Save</md-button
            >
          </div>
        </div>
        <div class="upgradeBlock">
          <p>
            Would you like to upgrade to our premium services? Have your own
            branding
          </p>
          <md-button @click.prevent="" class="md-raised btnUpgrade"
            >Upgrade now</md-button
          >
          <md-button @click.prevent="" class="md-raised btnNotnow"
            >Not now</md-button
          >
        </div>

        <div class="container">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-35">
              <md-list :md-expand-single="true">
                <md-list-item md-expand>
                  <span class="md-list-item-text">Subject</span>

                  <div slot="md-expand">
                    <div class="subjectEditor">
                      <span>Subject for your email:</span>
                      <input type="text" v-model="eData.subject" />
                    </div>
                  </div>
                </md-list-item>

                <md-list-item
                  md-expand
                  v-for="(item, name, key) in eData.json_fields"
                  :key="key"
                >
                  <span class="md-list-item-text">{{ item.label }}</span>

                  <div slot="md-expand">
                    <div v-if="item.type == 'text'">
                      <div class="subTitle">
                        <h3>{{ item.label }}</h3>
                        <CustomVariables
                          v-if="item.show_dynamic_variables"
                          :data="dVars"
                          :name="name"
                          :click="appendVarToKey"
                        />
                      </div>
                      <input
                        class="form-control"
                        type="text"
                        :ref="name"
                        v-model="item.value"
                      />
                    </div>
                    <div v-if="item.type == 'textarea'">
                      <div class="subTitle">
                        <h3>{{ item.label }}</h3>
                        <CustomVariables
                          v-if="item.show_dynamic_variables"
                          :data="dVars"
                          :name="name"
                          :click="appendVarToKey"
                        />
                      </div>
                      <ckeditor
                        :editor="editor"
                        v-model="item.value"
                        @ready="(e) => editorReady(e, name)"
                      ></ckeditor>
                    </div>
                    <div v-if="item.type == 'file'">
                      <div class="subTitle">
                        <h3>{{ item.label }}</h3>
                      </div>
                      <div class="uploadWrap">
                        <label
                          class="md-button md-raised md-accent md-theme-default"
                          :for="name"
                        >
                          <i class="fal fa-upload"></i>
                          <span v-if="item.value.length > 0"
                            >Replace Image</span
                          >
                          <span v-else>Add Image</span>
                          <input
                            :id="name"
                            type="file"
                            accept="image/*"
                            @change="(e) => handleFileChange(e, name)"
                          />
                        </label>
                        <img
                          v-if="item.value.length > 0"
                          :src="item.value"
                          alt=""
                        />
                      </div>
                    </div>
                    <div v-if="item.type == 'color'">
                      <div class="subTitle">
                        <h3>{{ item.label }}</h3>
                      </div>
                      <ColorPicker
                        :color="item.value"
                        v-on:input="(e) => (item.value = e)"
                      ></ColorPicker>
                    </div>
                  </div>
                </md-list-item>
              </md-list>
              <div class="changeTemplate">
                <h3>Would you like to change</h3>
                <md-button
                  @click.prevent="togglePageview"
                  class="md-raised md-accent"
                  >Change Template</md-button
                >
              </div>
            </div>

            <div class="md-layout-item md-size-65">
              <div class="previewBlock">
                <div class="emailTemplate">
                  <div v-html="templateOutput"></div>
                </div>
              </div>
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
      </div>

      <div v-else>
        <EmailTemplates
          :data="allData"
          :close="togglePageview"
          :save="handleChooseTemplate"
        />
      </div>
    </div>
    <Loader :status="loader" />
  </div>
</template>
<script>
import Axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ColorPicker from "../components/ColorPicker.vue";
import CustomVariables from "../components/CustomVariables.vue";
import EmailTemplates from "./EmailTemplates.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "EmailEdit",
  components: {
    ColorPicker,
    CustomVariables,
    EmailTemplates,
    Loader,
  },
  mixins: ["createFormData", "renderTemplate"],
  data: function () {
    return {
      editPageView: true,
      id: this.$route.params.emailId,
      eData: null,
      allData: null,
      activeThemeId: null,
      dVars: null,
      editor: ClassicEditor,
      ckEditor: {},
      emailMessage: false,
      emailResponse: null,
      loader: false,
    };
  },
  computed: {
    templateOutput: function () {
      return this.eData ? this.renderTemplate(this.eData) : null;
    },
  },
  methods: {
    setEdata: function (id) {
      this.eData = this.allData.find(({ id_theme }) => id_theme == id);
    },
    togglePageview: function () {
      this.editPageView = !this.editPageView;
    },
    editorReady: function (e, name) {
      this.ckEditor[name] = e;
    },
    handleFileChange: function (e, name) {
      const file = e.target.files[0];
      this.loader = true;
      let formData = new FormData();
      formData.append("Filedata", file);
      formData.append("suffix", "header_image");
      formData.append("id_template", 1);

      Axios.post("https://gr-v1.devam.pro/S3Uploader/emailTemplate", formData)
        .then(({ data }) => {
          this.loader = false;
          if (!data.error) {
            this.eData.json_fields[name].value =
              "https://cdn.devam.pro/gr/master/" + data.img_name;
          } else {
            this.emailResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`;
            this.emailMessage = true;
          }
        })
        .catch(({ data }) => {
          this.loader = false;
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`;
          this.emailMessage = true;
        });
    },
    appendVarToKey: function (name, item) {
      const { type, value } = this.eData.json_fields[name];
      if (type == "textarea") {
        this.ckEditor[name].model.change((writer) => {
          writer.insertText(
            item,
            this.ckEditor[name].model.document.selection.getFirstPosition()
          );
        });
      } else {
        const index = this.$refs[name][0].selectionStart;
        const text = value.slice(0, index) + item + value.slice(index);
        this.eData.json_fields[name].value = text;
        this.$refs[name][0].value = text;
      }
    },
    handleChooseTemplate: function (id) {
      this.setEdata(id);
      this.togglePageview();
    },
    handleSave: function () {
      this.loader = true;
      const { id_theme, tpl_name, subject, status, json_fields } = this.eData;
      const params = {
        id_email: this.id,
        subject: subject,
        id_theme: id_theme,
        type: tpl_name,
        is_enabled: status,
        settings: {},
      };
      Object.keys(json_fields).map(
        (key) => (params.settings[key] = json_fields[key].value)
      );
      Axios.post(
        "https://gr-v1.devam.pro/services/email/saveEmailTemplate",
        this.createFormData(params)
      )
        .then(({ data, status }) => {
          this.loader = false;
          if (status == 200) {
            this.emailResponse = `<i class="fas fa-check-circle"></i> ${data.msg}`;
            this.fetchTemplateData();
          } else
            this.emailResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`;
          this.emailMessage = true;
        })
        .catch(() => {
          this.loader = false;
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> Something went wrong`;
          this.emailMessage = true;
        });
    },
    sendTestEmail: function () {
      this.loader = true;
      Axios.post(
        "https://gr-v1.devam.pro/services/email/sendTestEmail",
        this.createFormData({ id_email: this.id })
      ).then(({ data, status }) => {
        this.loader = false;
        if (status == 200) {
          this.emailResponse = `<i class="fas fa-check-circle"></i> ${data.msg}`;
        } else
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`;
        this.emailMessage = true;
      });
    },
    fetchTemplateData: function () {
      this.loader = true;
      Axios.get(
        `https://gr-v1.devam.pro/services/email/getEmailTemplate/${this.id}`
      ).then(({ data }) => {
        const { active_id_theme, dynamic_variables, themes } = data.data;
        this.dVars = dynamic_variables.split(",");
        this.allData = themes;
        this.activeThemeId = active_id_theme;
        this.setEdata(active_id_theme);
        this.loader = false;
      });
    },
  },
  mounted: function () {
    this.fetchTemplateData();
  },
};
</script>
<style lang="less" scoped>
.upgradeBlock {
  background: #ed941f;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  p {
    font-size: 13px;
    color: #fff;
  }

  button.btnUpgrade {
    margin: 0 10px 0 20px;
  }

  .btnNotnow {
    border: 1px solid #fff;
    color: #fff !important;
    background: transparent !important;
  }
}

.changeTemplate {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e8e8e8;
  margin: 20px 0;
  padding: 10px;
  flex-direction: column;

  h3 {
    color: #007aff;
    margin-top: 0;
  }
}

.md-raised {
  border: 1px solid #d5d5d5;
  color: #202020;
  border-radius: 5px;
  box-shadow: none !important;
  text-transform: capitalize;

  &.md-accent {
    border: 0;
    font-weight: bold;
    color: #fff !important;
  }
}

.email {
  margin: 4.3em 0 7em 0;

  .md-list {
    padding: 0;
  }
  .editorContent {
    padding: 20px;
  }

  .subTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      color: #007aff;
      font-size: 14px;
    }
  }

  input.form-control {
    padding: 5px;
    border: 1px solid #d2d2d2;
    font-size: 14px;
    width: 100%;
  }

  .previewBlock {
    background: #fff;
    border: 1px solid #e8e8e8;
  }
}
.subjectEditor {
  span {
    display: block;
    color: #007aff;
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
    padding-bottom: 10px;
  }
  input[type="text"] {
    border: 1px solid #dcdcdc;
    color: #484848;
    font-size: 15px;
    line-height: 18px;
    width: 100%;
    padding: 10px;
  }
}
.emailTemplate {
  width: 100%;
  min-height: 600px;
  background-color: #ddefef;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

  & > div {
    background: #fff;
  }
}
.subHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 600;
    font-size: 1.7rem;
    font-size: 14px;
    color: #757575;
  }
}
.uploadWrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  img {
    max-width: 50%;
    margin: 20px auto 0;
  }
}
</style>

<style lang="less">
:root {
  --md-theme-default-accent: #5bb74d !important;
}
.md-button {
  text-transform: capitalize;
  padding: 0 10px;
  border-radius: 4px;
  box-shadow: none !important;
  margin: 0;

  i {
    margin-right: 10px;
  }
}

.btn-custom-default {
  border: 1px solid #005dff;
  color: #005dff !important;
  background: transparent !important;
}
.btn-custom-active {
  color: #fff !important;
}
.md-list {
  border: 1px solid #e8e8e8;
  --vsa-highlight-color: #d2d2d2;

  &--is-active .vsa-item__heading,
  .md-list-item:not(:last-of-type) {
    border-bottom: 1px solid #e8e8e8;
  }

  .md-list-item-text {
    font-weight: 600;
    font-size: 1.7rem;
    font-size: 14px;
    color: #757575;
  }
  .md-list-item-expand.md-active .md-list-expand {
    padding: 10px;
  }
}
</style>
