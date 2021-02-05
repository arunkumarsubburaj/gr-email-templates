<template>
  <div v-if="eData">
    <div class="email" v-if="editPageView">
      <div class="fixedHeaderBlock">
        <div class="fixedHeaderBlockInner">
          <a class="link-back" onclick="">
            <i class="fa fa-long-arrow-left"></i>
          </a>
          <div class="title">
            <div class="icon far fa-envelope margin-right-10"></div>
            <span>Welcome Email</span>
          </div>
        </div>
        <div>
          <md-button class="md-raised" @click.prevent="sendTestEmail">Sent Test Email</md-button>
          <md-button @click.prevent="handleSave" class="md-raised md-accent"
            >Save</md-button
          >
        </div>
      </div>

      <div class="container">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-35">
            <vsa-list>
              <!-- Here you can use v-for to loop through items  -->
              <vsa-item v-for="(item, name, key) in eData.json_fields" :key="key">
                <vsa-heading>{{ item.label }}</vsa-heading>
                <vsa-icon>
                  <span class="open"><i class="fas fa-pencil-alt"></i></span>
                  <span class="close"><i class="fas fa-times"></i></span>
                </vsa-icon>

                <vsa-content>
                  <div v-if="item.type == 'text'">
                    <h3>{{ item.label }}</h3>
                    <input type="text" :ref="name" v-model="item.value" />
                    <CustomVariables
                      v-if="item.show_dynamic_variables"
                      :data="dVars"
                      :name="name"
                      :click="appendVarToKey"
                    />
                  </div>
                  <div v-if="item.type == 'textarea'">
                    <h3>
                      {{ item.label }}
                      <CustomVariables
                        v-if="item.show_dynamic_variables"
                        :data="dVars"
                        :name="name"
                        :click="appendVarToKey"
                      />
                    </h3>
                    <ckeditor
                      :editor="editor"
                      v-model="item.value"
                      @ready="(e) => editorReady(e, name)"
                    ></ckeditor>
                  </div>
                  <div v-if="item.type == 'file'">
                    <h3>{{ item.label }}</h3>
                    <input
                      type="file"
                      @change="(e) => handleFileChange(e, name)"
                    />
                  </div>
                  <div v-if="item.type == 'color'">
                    <h3>{{ item.label }}</h3>
                    <ColorPicker
                      :color="item.value"
                      v-on:input="(e) => (item.value = e)"
                    ></ColorPicker>
                  </div>
                </vsa-content>
              </vsa-item>
            </vsa-list>
            <div class="changeTemplate">
              <span>Would you like to change</span>
              <md-button @click.prevent="togglePageview" class="md-raised md-accent"
                >Change Template</md-button
              >
            </div>
          </div>

          <div class="md-layout-item md-size-65">
            <div class="previewBlock">
              <div class="subjectEditor">
                <span>Subject:</span>
                <input type="text" v-model="eData.subject" />
              </div>
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

  <!--
    <div class="container" v-if="editPageView">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-40">
          <div v-for="(item, name, key) in eData.json_fields" :key="key">
            <div v-if="item.type == 'text'">
              <h3>{{ item.label }}</h3>
              <input type="text" :ref="name" v-model="item.value" />
              <CustomVariables
                v-if="item.show_dynamic_variables"
                :data="dVars"
                :name="name"
                :click="appendVarToKey"
              />
            </div>
            <div v-if="item.type == 'textarea'">
              <h3>
                {{ item.label }}
                <CustomVariables
                  v-if="item.show_dynamic_variables"
                  :data="dVars"
                  :name="name"
                  :click="appendVarToKey"
                />
              </h3>
              <ckeditor
                :editor="editor"
                v-model="item.value"
                @ready="(e) => editorReady(e, name)"
              ></ckeditor>
            </div>
            <div v-if="item.type == 'file'">
              <h3>{{ item.label }}</h3>
              <input type="file" @change="(e) => handleFileChange(e, name)" />
            </div>
            <div v-if="item.type == 'color'">
              <h3>{{ item.label }}</h3>
              <ColorPicker
                :color="item.value"
                v-on:input="(e) => (item.value = e)"
              ></ColorPicker>
            </div>
          </div>
          <md-list :md-expand-single="true">
            <md-list-item md-expand>
              <div class="md-list-item-text">Header Text</div>
              <md-icon class="md-primary">edit</md-icon>
              <md-list slot="md-expand"
                ><div class="editorContent">
                  Header Text content comes here
                </div></md-list
              >
            </md-list-item>
            <md-list-item md-expand>
              <div class="md-list-item-text">Sub Block Text</div>
              <md-icon class="md-primary">edit</md-icon>
              <md-list slot="md-expand"
                ><div class="editorContent">
                  Sub Block Text content comes here
                </div></md-list
              >
            </md-list-item>
          </md-list>
        </div>
        <div class="md-layout-item md-size-60">
          <div class="previewBlock">
            <div class="subjectEditor">
              <span>Subject:</span>
              <div>
                <input type="text" v-model="eData.subject" />
              </div>
            </div>
            <div class="emailTemplate md-elevation-5">
              <div v-html="templateOutput"></div>
            </div>
          </div>
        </div>
        <md-snackbar
          class="testSnack"
          md-position="center"
          :md-duration="400000"
          :md-active.sync="emailMessage"
        >
          <span v-html="emailResponse"></span>
        </md-snackbar>
      </div>
    </div>
    <div v-else>
      <EmailTemplates :data="allData" :active="activeThemeId" :close="togglePageview" :save="handleChooseTemplate" />
    </div>
          -->
</template>
<script>
import Axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ColorPicker from "../components/ColorPicker.vue";
import CustomVariables from "../components/CustomVariables.vue";
import EmailTemplates from "./EmailTemplates.vue";
import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent,
  VsaIcon,
} from "vue-simple-accordion";
import "vue-simple-accordion/dist/vue-simple-accordion.css";

export default {
  name: "EmailEdit",
  components: {
    ColorPicker,
    CustomVariables,
    EmailTemplates,
  },
  mixins: ["createFormData", "renderTemplate"],
  data: function () {
    return {
      editPageView: false,
      id: this.$route.params.emailId,
      eData: null,
      allData: null,
      activeThemeId: null,
      dVars: null,
      editor: ClassicEditor,
      ckEditor: {},
      emailMessage: false,
      emailResponse: null,
      VsaList,
      VsaItem,
      VsaHeading,
      VsaContent,
      VsaIcon,
    };
  },
  computed: {
    templateOutput: function () {
      return this.eData ? this.renderTemplate(this.eData) : null;
    },
  },
  methods: {
    setEdata: function(id) {
      this.eData = this.allData.find(({ id_theme }) => id_theme == id)
    },
    togglePageview: function () {
      this.editPageView = !this.editPageView;
    },
    editorReady: function (e, name) {
      this.ckEditor[name] = e;
    },
    handleFileChange: function (e, name) {
      const file = e.target.files[0];
      this.eData.json_fields[name].value = URL.createObjectURL(file);
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
        this.eData.json_fields[name].value =
          value.slice(0, index) + item + value.slice(index);
      }
    },
    handleChooseTemplate: function (id) {
      this.setEdata(id);
      this.togglePageview();
    },
    handleSave: function () {
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
          if(status == 200) {
            this.emailResponse = `<i class="fas fa-check-circle"></i> ${data.msg}`
            this.fetchTemplateData();
          } else this.emailResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`
          this.emailMessage = true;
        })
        .catch(() => {
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> Something went wrong`;
          this.emailMessage = true;
        });
    },    
    sendTestEmail: function () {
      Axios.post(
        "https://gr-v1.devam.pro/services/email/sendTestEmail",
        this.createFormData({ id_email: this.id })
      ).then(({ data, status }) => {
        if (status == 200) {
          this.emailResponse = `<i class="fas fa-check-circle"></i> ${data.msg}`;
        } else
          this.emailResponse = `<i class="fas fa-exclamation-circle"></i> ${data.msg}`;
        this.emailMessage = true;
      });
    },
    fetchTemplateData: function() {
      Axios.get(
        `https://gr-v1.devam.pro/services/email/getEmailTemplate/${this.id}`
      ).then(({ data }) => {
        const { active_id_theme, dynamic_variables, themes } = data.data;
        this.dVars = dynamic_variables.split(",");
        this.allData = themes;
        this.activeThemeId = active_id_theme;
        this.setEdata(active_id_theme)
      });
    }
  },
  mounted: function () {
    this.fetchTemplateData();
  },
};
</script>
<style lang="less" scoped>
.fixedHeaderBlock {
  background: #fff;
  flex: 1;
  position: fixed;
  top: 0;
  display: flex;
  z-index: 9999;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);

  .fixedHeaderBlockInner {
    display: flex;
    align-items: center;

    a.link-back {
      color: #333;
      padding: 10px 25px;
      font-size: 16px;
      margin: 0;
    }

    .title {
      border-left: 1px solid #eaeaea;
      display: flex;
      align-items: center;
      color: #333;
      padding: 12px 20px;

      .icon {
        padding: 10px;
        border-radius: 50%;
        width: 35px;
        background: #e2f3ff;
        color: #5988bc;
        position: relative;
        margin-right: 10px;
      }
    }
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
  span {
    color: #007AFF;
    flex-grow: 1;
    font-size: 0.9em;
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
    background: #5bb74d;
    font-weight: bold;
    color: #fff !important;
  }
}

.email {
  margin: 7em 0;

  .md-list {
    padding: 0;
  }
  .editorContent {
    padding: 20px;
  }

  .previewBlock {
    background: #fff;
    border: 1px solid #e8e8e8;

    .subjectEditor {
      border-bottom: 1px solid #e8e8e8;
      margin-bottom: 20px;
      padding: 20px;
      display: flex;

      span {
        color: #007aff;
        font-size: 16px;
        line-height: 18px;
        font-weight: 600;
        padding-right: 15px;
      }
      input[type="text"] {
        border: 0;
        color: #484848;
        font-size: 15px;
        line-height: 18px;
        width: 100%;
      }
    }
  }
}
.emailTemplate {
  width: 100%;
  min-height: 600px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>

<style lang="less">
.vsa-list {
  border: 1px solid #e8e8e8;
  --vsa-highlight-color: #d2d2d2;

  &--is-active .vsa-item__heading,
  .vsa-item:not(:last-of-type) {
    border-bottom: 1px solid #e8e8e8;
  }

  .vsa-item__trigger__content {
    font-weight: 600;
    font-size: 1.7rem;
    font-size: 14px;
    color: #757575;
  }
}

.vsa-item {
  &--is-active {
    .vsa-item__trigger__icon {
      .open {
        display: none;
      }

      .close {
        display: block;
      }
    }
  }
  &__trigger__icon {
    .open {
      display: block;
    }

    .close {
      display: none;
    }
  }
}
</style>
