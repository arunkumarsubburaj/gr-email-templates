<template>
  <div class="email" v-if="eData">
    <div class="container">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-40">
          <div v-for="(item, name, key) in eData.json_fields" :key="key">
            <div v-if="item.type == 'textbox'">
              <h3>{{ item.label }}</h3>
              <input type="text" v-model="item.value" />
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
                :id="name"
              ></ckeditor>
            </div>
            <div v-if="item.type == 'file'">
              <h3>{{ item.label }}</h3>
              <input type="file" @change="e => handleFileChange(e, name)" />
            </div>
            <div v-if="item.type == 'color'">
              <h3>{{ item.label }}</h3>
              <ColorPicker
                :color="item.value"
                v-on:input="e => (item.value = e)"
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
          <nav>
            <md-button
              @click.prevent="handleSave"
              class="md-dense md-raised md-accent"
              >Save</md-button
            >
          </nav>
        </div>
        <div class="md-layout-item md-size-60">
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
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ColorPicker from "../components/ColorPicker.vue";
import CustomVariables from "../components/CustomVariables.vue";
import { createFormData } from "@/assets/helper.js";

export default {
  name: "EmailEdit",
  components: {
    ColorPicker,
    CustomVariables
  },
  data: function() {
    return {
      temp: `<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="550">
          <tr>
              <td bgcolor="[[header_background_color]]" align="center" style="padding: 30px 0;">
                <img src="[[header_image]]" alt="Email header" width="322" height="181" style="display: block;" />
                <h1 style="color: #ffffff;font-family: Arial, sans-serif; font-weight:bold;font-size: 20px;line-height: 24px;padding: 20px 0 0;margin: 0;">
                  [[content]]
              </td>
          </tr>
            <tr>
                <td style="text-align: center;padding: 0 75px 0;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                        <tr>
                          <td align="left" width="113" style="padding: 20px 0;border-bottom: 1px solid #d8d8d8;">
                              <img src="./images/campaign_1.png" alt="Email footer" width="113" height="113" style="display: inline-block;" />
                          </td>
                          <td style="padding: 30px 40px 30px 40px;text-align: left;border-bottom: 1px solid #d8d8d8;">
                            <h2 style="color: #000000;font-family: Arial, sans-serif;font-weight: bold;font-size: 16px;line-height: 19px;">Get more points</h2>
                            <p style="margin: 0;color: #000000;font-family: Arial, sans-serif;font-size: 14px;line-height: 17px;">
                              Have you completed all the actions to earn the maximum rewards?
                              </p>
                              <a href="#" style="margin: 15px 0;color: #ffffff;background:#000;font-family: Arial, sans-serif;font-size: 14px;line-height: 17px;display: inline-block;padding: 15px 40px;border-radius: 4px;text-decoration: none;">Participate Now</a>
                          </td>
                    </tr>
                    <tr>
                      <td align="left" style="padding: 20px 0;border-bottom: 1px solid #d8d8d8;">
                          <img src="./images/campaign_2.png" alt="Email footer" width="113" height="113" style="display: inline-block;" />
                      </td>
                      <td style="padding: 30px 40px 30px 40px;text-align: left;border-bottom: 1px solid #d8d8d8;">
                        <h2 style="color: #000000;font-family: Arial, sans-serif;font-weight: bold;font-size: 16px;line-height: 19px;">Chance for rewards</h2>
                        <p style="margin: 0;color: #000000;font-family: Arial, sans-serif;font-size: 14px;line-height: 17px;">
                          Keep participating in our [[Campaign Name]] promotion for chances at more rewards!
                          </p>
                      </td>
                </tr>
                <tr>
                    <td colspan="2" style="color: #000000;font-family: Arial, sans-serif;font-size: 14px;line-height: 17px;padding: 20px 0;text-align: center;">
                        <p style="margin: 0;">More promotions may be on the way! Keep an eye out to win more rewards.</p>
                    </td>
                </tr>
          <tr>
              <td colspan="2" style="color: #555;font-family: Arial, sans-serif;font-size: 12px;line-height: 15px;padding: 20px 0 40px 0;text-align: center;">
                  <p style="margin: 0;">Regards,  [[Company Name]]</p>
              </td>
          </tr>
                </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" style="color: #777777;font-family: Arial, sans-serif; font-weight:bold;font-size: 10px;line-height: 12px;padding: 10px 0;text-align: center;">
                    <p style="margin: 0;">GRATISFACTION <span style="margin: 0 5px;background: #585c8a;border-radius: 50%;width: 3px;height: 3px;display: inline-block;"></span> Made with <img src="./images/heart.png" alt="Email footer" width="8" height="7" style="display: inline-block;" /> Apps Mav</p>
                </td>
            </tr>
        </table>

      </td>
    </tr>
  </table>`,
      id: this.$route.params.emailId,
      eData: null,
      allData: null,
      dVars: null,
      editor: ClassicEditor
    };
  },
  computed: {
    templateOutput: function() {
      if (this.eData) {
        return this.temp.replace(/\[\[(.*?)\]]/g, (full, property) =>
          this.eData.json_fields[property]
            ? this.eData.json_fields[property].value
            : property
        );
      } else {
        return this.eData;
      }
    }
  },
  methods: {
    handleFileChange: function(e, name) {
      const file = e.target.files[0];
      this.eData.json_fields[name].value = URL.createObjectURL(file);
    },
    appendVarToKey: function(name) {
      const { type } = this.eData.json_fields[name];
      if (type == "textarea") {
        console.log(this.editor.model);
        this.editor.model.change(writer => {
          writer.insertText(
            "Plain text",
            this.editor.model.document.selection.getFirstPosition()
          );
        });
      }
    },
    handleSave: function() {
      const { id_theme, tpl_name, subject, status, json_fields } = this.eData;
      const params = {
        id_email: this.id,
        subject: subject,
        id_theme: id_theme,
        type: tpl_name,
        is_enabled: status,
        settings: {}
      };
      Object.keys(json_fields).map(
        key => (params.settings[key] = json_fields[key].value)
      );
      Axios.post(
        "https://gr-v1.devam.pro/services/email/saveEmailTemplate",
        createFormData(params)
      ).then(res => {
        console.log(res);
      });
    }
  },
  mounted: function() {
    Axios.get(
      `https://gr-v1.devam.pro/services/email/getEmailTemplate/${this.id}`
    ).then(({ data }) => {
      const { active_id_theme, dynamic_variables, themes } = data.data;
      this.dVars = dynamic_variables.split(",");
      this.allData = themes;
      this.eData = themes.find(({ id_theme }) => id_theme == active_id_theme);
    });
  }
};
</script>
<style lang="less" scoped>
.email {
  margin: 3em 0;
  .md-list {
    padding: 0;
  }
  .editorContent {
    padding: 20px;
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
</style>
