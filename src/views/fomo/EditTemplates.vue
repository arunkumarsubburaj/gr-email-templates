<template>
  <div v-if="fomoData">
    <div class="fixedHeaderBlock">
      <div class="fixedHeaderBlockInner">
        <div class="linkBackBlock">
          <a class="link-back" @click.prevent="handleBack">
            <i class="fa fa-long-arrow-left"></i>
          </a>
          <div class="title">
            <md-icon class="icon">bookmark_outline</md-icon>
            <span>{{ fomoData.name }}</span>
          </div>
        </div>
        <div>
          <!-- <md-button class="md-raised" @click="handleBack"
            >Discard</md-button
          > -->
          <md-button
            class="md-raised md-accent"
            :disabled="Object.keys(hasError).length > 0"
            @click.prevent="handleSave"
            >Save</md-button
          >
        </div>
      </div>
    </div>

    <div class="editTemplate">
      <div class="settingsBlock">
        <md-tabs class="fomo-tabs" @md-changed="setActiveTab">
          <md-tab
            v-for="(item, key) in fomoData.settings"
            :key="key"
            :id="item.type"
            :md-label="item.label"
          >
            <div v-if="item.attributes">
              <div
                class="item-types"
                v-for="(control, name, index) in item.attributes"
                :key="index"
              >
                <div v-if="control.type == 'text'">
                  <div class="subTitle">
                    <h3>{{ control.label }}</h3>
                    <CustomVariables
                      v-if="control.show_dynamic_variables"
                      :data="dVars"
                      :name="name"
                      :index="key"
                      :click="appendVarToKey"
                    />
                  </div>
                  <input
                    class="form-control"
                    type="text"
                    maxlength="200"
                    :ref="`${key}-${name}`"
                    v-model="control.value"
                    @keyup="checkforError(control, name)"
                  />
                  <small v-if="hasError[name]" class="fieldError">
                    This field cannot be empty
                  </small>
                </div>
                <div v-if="control.type == 'textarea'">
                  <div class="subTitle">
                    <h3>{{ control.label }}</h3>
                    <CustomVariables
                      v-if="control.show_dynamic_variables"
                      :data="dVars"
                      :name="name"
                      :index="key"
                      :click="appendVarToKey"
                    />
                  </div>
                  <quillEditor
                    v-model="control.value"
                    :options="eOptions"
                    @focus="onEditorFocus($event, name)"
                    @change="onEditorChange($event, control, name)"
                    :ref="`${key}-${name}`"
                  ></quillEditor>
                  <small v-if="hasError[name]" class="fieldError">
                    This field cannot be empty
                  </small>
                </div>
                <div v-if="control.type == 'file'">
                  <div class="subTitle">
                    <h3>
                      {{ control.label }}
                      <i class="fas fa-question-circle"
                        ><md-tooltip md-direction="right"
                          >Supported file formats: JPEG, PNG</md-tooltip
                        ></i
                      >
                    </h3>
                  </div>
                  <ImgUploadPreview
                    :id="`${key}-${name}`"
                    :handleFileChange="e => handleImgChange(e)"
                    :data="control"
                  />
                </div>
                <div v-if="control.type == 'color'" class="colorPick">
                  <div class="subTitle">
                    <h3>{{ control.label }}</h3>
                  </div>
                  <ColorPicker
                    :color="control.value"
                    v-on:input="e => (control.value = e)"
                  ></ColorPicker>
                </div>
              </div>
            </div>
          </md-tab>
        </md-tabs>
      </div>
      <div class="preview_block">
        <div class="preview_block-title">
          <h2>Fomo Preview</h2>
          <div class="previewBlockBtn">
            <md-button
              class="md-raised btn-default"
              v-on:click="embedCode = !embedCode"
              >Embed</md-button
            >
          </div>
        </div>
        <div class="preview_block-template">
          <am-fomo :preview="dataForPreview"></am-fomo>
        </div>
        <div class="embed_visible" v-if="embedCode">
          <div class="title">
            <h3>Embed FOMO</h3>
            <md-button class="md-raised btn-default" @click="doCopy"
              >Copy</md-button
            >
          </div>
          <textarea
            class="iframe-block"
            id="copiedText"
            v-model="message"
          ></textarea>
          <div class="link-block">
            <a href="#" class="">API Reference</a>
            <a href="#" class="">Developer Sample</a>
          </div>
          <p>
            By embedding our program on your site, you are agreeing to our API
            Terms of Service.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Vue from "vue";
import Axios from "axios";
import ColorPicker from "@/components/ColorPicker.vue";
import CustomVariables from "@/components/CustomVariables.vue";
import ImgUploadPreview from "@/components/ImgUploadPreview.vue";
import Quill from "quill";
import { quillEditor } from "vue-quill-editor"; // require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

window.Vue = Vue;
require("@/lit/am-fomo.js");

var Parchment = Quill.import("parchment");
var Delta = Quill.import("delta");
let Break = Quill.import("blots/break");
let Embed = Quill.import("blots/embed");
var Block = Quill.import("blots/block");
Block.tagName = "DIV";
Quill.register(Block, true);
function lineBreakMatcher() {
  var newDelta = new Delta();
  newDelta.insert({ break: "" });
  return newDelta;
}
var options = {
  modules: {
    clipboard: {
      matchers: [["BR", lineBreakMatcher]]
    },
    keyboard: {
      bindings: {
        handleEnter: {
          key: 13,
          handler: function(range, context) {
            if (range.length > 0) {
              this.quill.scroll.deleteAt(range.index, range.length); // So we do not trigger text-change
            }
            let lineFormats = Object.keys(context.format).reduce(function(
              lineFormats,
              format
            ) {
              if (
                Parchment.query(format, Parchment.Scope.BLOCK) &&
                !Array.isArray(context.format[format])
              ) {
                lineFormats[format] = context.format[format];
              }
              return lineFormats;
            },
            {});
            var previousChar = this.quill.getText(range.index - 1, 1);
            // Earlier scroll.deleteAt might have messed up our selection,
            // so insertText's built in selection preservation is not reliable
            this.quill.insertText(
              range.index,
              "\n",
              lineFormats,
              Quill.sources.USER
            );
            if (previousChar == "" || previousChar == "\n") {
              this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
            } else {
              this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
            }
            this.quill.selection.scrollIntoView();
            Object.keys(context.format).forEach(name => {
              if (lineFormats[name] != null) return;
              if (Array.isArray(context.format[name])) return;
              if (name === "link") return;
              this.quill.format(name, context.format[name], Quill.sources.USER);
            });
          }
        },
        linebreak: {
          key: 13,
          shiftKey: true,
          handler: function(range) {
            var nextChar = this.quill.getText(range.index + 1, 1);
            this.quill.insertEmbed(range.index, "break", true, "user");
            if (nextChar.length == 0) {
              // second line break inserts only at the end of parent element
              this.quill.insertEmbed(range.index, "break", true, "user");
            }
            this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
          }
        }
      }
    },
    toolbar: [
      [
        { indent: "-1" },
        { indent: "+1" },
        { list: "ordered" },
        { list: "bullet" },
        { align: [] },
        { direction: "rtl" },
        { size: ["small", false, "large", "huge"] },
        { header: [1, 2, 3, 4, 5, 6, false] }
      ],
      [
        { color: [] },
        { background: [] },
        "bold",
        "italic",
        "underline",
        "strike",
        "link"
      ]
    ]
  }
};

Break.prototype.insertInto = function(parent, ref) {
  Embed.prototype.insertInto.call(this, parent, ref);
};
Break.prototype.length = function() {
  return 1;
};
Break.prototype.value = function() {
  return "\n";
};

export default {
  name: "EditTemplate",
  components: {
    ColorPicker,
    ImgUploadPreview,
    quillEditor,
    CustomVariables
  },
  mixins: ["createFormData", "renderTemplate", "getImgUrl"],
  data: function() {
    return {
      id: this.$route.params.fomoId,
      tempId: this.$route.params.templateId,
      embedCode: false,
      message: "Some dummy text",
      fomoData: null,
      fomoType: null,
      activeTab: null,
      quillEditor: {},
      eOptions: options,
      dVars: null,
      hasError: {}
    };
  },

  computed: {
    dataForPreview() {
      let dd = {
        type: this.fomoType,
        id_template: this.tempId,
        show_screen: this.activeTab,
        template: {
          settings: {}
        }
      };
      this.fomoData.settings.forEach(data =>
        Object.keys(data.attributes).forEach(
          key => (dd.template.settings[key] = data.attributes[key].value)
        )
      );
      return JSON.stringify(dd);
    }
  },
  methods: {
    setActiveTab: function(e) {
      this.activeTab = e;
    },
    doCopy: function() {
      this.$copyText(this.message).then(
        function(e) {
          alert("Copied");
          console.log(e);
        },
        function(e) {
          alert("Can not copy");
          console.log(e);
        }
      );
    },
    handleBack: function() {
      this.$router.go(-1);
    },
    handleImgChange: function(e) {
      console.log(e, "event");
    },
    onEditorFocus: function(quill, name) {
      this.quillEditor[name] = quill.selection.savedRange.index;
    },
    onEditorChange: function({ quill }, data, name) {
      this.checkforError(data, name);
      const limit = 3000;
      if (quill.getLength() > limit) {
        quill.deleteText(limit, quill.getLength());
      }
    },
    checkforError: function(data, name) {
      if (Boolean(data.required) && data.value.trim() == "") {
        this.hasError = { ...this.hasError, [name]: true };
      } else {
        delete this.hasError[name];
      }
    },
    appendVarToKey: function(id, name, item) {
      const comp = this.$refs[`${id}-${name}`][0];
      if (comp.classList?.contains("form-control")) {
        const index = comp.selectionStart;
        const text =
          comp.value.slice(0, index) + item + comp.value.slice(index);
        comp.value = text;
        const dataRef = this.fomoData.settings.find(
          item => item.type == this.activeTab
        );
        if (dataRef) dataRef.attributes[name].value = text;
      } else {
        const position = this.quillEditor[name] || 0;
        comp.quill.insertText(position, item);
      }
    },
    fetchFomoData: function() {
      Axios.get(
        `https://logesh.devam.pro/gr/fomo/template?id=${this.id}&id_template=${this.tempId}&id_shop=1916&admin_email=logesh@appsmav.com`
      ).then(({ data }) => {
        this.fomoData = data.data.attributes;
        this.fomoType = data.data.type;
        this.dVars = data.data.attributes.dynamic_variables.split(",");
      });
    },
    handleSave: function() {
      console.log(this.fomoData);
      const params = {
        is_activated: 1,
        settings: JSON.stringify(this.fomoData.settings)
      };
      Axios.post(
        `https://logesh.devam.pro/gr/fomo/template?id=${this.id}&id_template=${this.tempId}&id_shop=1916&admin_email=logesh@appsmav.com`,
        this.createFormData(params)
      ).then(res => {
        console.log(res);
      });
    }
  },
  mounted: function() {
    this.fetchFomoData();
  }
};
</script>
<style lang="less" scoped>
.fixedHeaderBlock .fixedHeaderBlockInner {
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .linkBackBlock {
    display: flex;
    align-items: center;
  }

  .title {
    border-right: 1px solid #eaeaea;

    .icon {
      height: 35px;
    }
  }

  .topControl.formSubmit {
    position: fixed;
    top: 12px;
    z-index: 9999;
    right: 12px;
    justify-content: flex-end;
    .md-button {
      margin-left: 10px;
      margin-right: 0;
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
}

.editTemplate {
  margin: 6em 50px 4em;
  display: flex;
  justify-content: flex-start;
  ::v-deep {
    .md-tab,
    .md-tab-nav-button.md-active {
      border-color: #007aff;
      border-style: solid;
    }
    .md-tab-nav-button.md-active {
      border-width: 0 1px;
    }
    .md-tab {
      border-width: 0 1px 1px;
    }
    .md-tabs-content {
      overflow: visible;
    }
    .vc-chrome {
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 50;
    }
  }

  input.form-control {
    padding: 5px;
    border: 1px solid #d2d2d2;
    font-size: 14px;
    width: 100%;
  }

  .settingsBlock {
    flex: 1;
    margin-right: 20px;
    max-width: 33%;
    overflow: hidden;
  }

  .subTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      color: #007aff;
      font-size: 14px;
      line-height: 1;
    }
    .md-menu {
      line-height: 0.9;
      margin: 10px 0;
    }
  }

  .preview_block {
    flex: 2;
    position: relative;

    .btn-default {
      border: 1px solid #ccc;
      color: #000;
      padding: 5px 15px;
    }

    .btn-preview {
      border: 1px solid #007aff;
      padding: 5px 15px;
      color: #007aff;
      margin-left: 10px;
    }

    .preview_block-title {
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      padding: 10px 20px;
      display: flex;
      background: #fff;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);

      h2 {
        font-size: 18px;
        margin: 0;
      }
    }
  }
  .preview_block-template {
    background: #333;
    min-height: 500px;
    position: relative;
    overflow: hidden;
    margin-top: 15px;
    border-radius: 4px;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
    transform: translateZ(0);
  }
  .embed_visible {
    position: absolute;
    top: 55px;
    background: #fff;
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px 20px;
    right: 128px;

    p {
      font-size: 11px;
    }

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      h3 {
        margin: 0;
        font-size: 14px;
        color: #007aff;
      }
    }

    .iframe-block {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 4px;
      width: 100%;
      height: 130px;
      font-size: 12px;
      color: #66788a;
    }

    .link-block {
      margin: 10px 0;

      a {
        font-size: 11px;
        color: #428bca;
        text-decoration: underline;
        margin-right: 10px;
        display: inline-block;

        &:hover {
          color: #2a6496;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
