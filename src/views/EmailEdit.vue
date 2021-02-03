<template>
  <div class="email" v-if="eData">
    <div class="container">
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
                @ready="e => editorReady(e, name)"
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
    CustomVariables,
  },
  data: function () {
    return {
      id: this.$route.params.emailId,
      eData: null,
      allData: null,
      dVars: null,
      editor: ClassicEditor,
      ckEditor: {}
    };
  },
  computed: {
    templateOutput: function () {
      return this.eData ?
        this.eData.email_template.replace(/\[\[(.*?)\]]/g, (full, property) =>
          this.eData.json_fields[property]
            ? this.eData.json_fields[property].value
            : property
        ) : null
    },
  },
  methods: {
    editorReady: function(e, name) {
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
        this.eData.json_fields[name].value = value.slice(0, index) + item + value.slice(index);
      }
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
        active_id_theme: 7
      };
      Object.keys(json_fields).map(
        (key) => (params.settings[key] = json_fields[key].value)
      );
      Axios.post(
        "https://gr-v1.devam.pro/services/email/saveEmailTemplate",
        createFormData(params)
      ).then((res) => {
        console.log(res);
      });
    },
  },
  mounted: function () {
    Axios.get(
      `https://gr-v1.devam.pro/services/email/getEmailTemplate/${this.id}`
    ).then(({ data }) => {
      const { active_id_theme, dynamic_variables, themes } = data.data;
      this.dVars = dynamic_variables.split(",");
      this.allData = themes;
      this.eData = themes.find(({ id_theme }) => id_theme == 7); // 7 hard code instead the value should be active_id_theme
    });
  },
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
