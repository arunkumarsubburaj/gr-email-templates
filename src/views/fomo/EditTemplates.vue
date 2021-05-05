<template>
  <div>
    <div class="fixedHeaderBlock">
      <div class="fixedHeaderBlockInner">
        <div class="linkBackBlock">
          <a @click.prevent="handleBack" class="link-back">
            <i class="fa fa-long-arrow-left"></i>
          </a>
          <div class="title">
            <md-icon class="icon margin-right-10">bookmark_outline</md-icon>
            <span>Signup bonus Fomo</span>
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
    </div>

    <div class="info_block" v-bind:class="[{ disabled: !isActive }]">
      <div class="info_block-spacing">
        <h4 class="font-size-14">Welcome bonus points</h4>
        <p v-if="isActive">
          100 points = $5 <a href="#" class="info-link-blue">Change</a>
        </p>
      </div>
      <div class="info_block-spacing">
        <div class="form-group">
          <input
            type="text"
            id=""
            class="form-control form-control-sm"
            value="100"
            style="
              width: 60px;
              min-width: 0;
              vertical-align: initial;
              margin: 0 8px;
            "
            maxlength="6"
            :disabled="!isActive"
          />
          <span>point(s)</span>
        </div>
      </div>
      <div class="info_block-spacing highAlert">
        <label class="switch margin-bottom-0" for="toggle_button">
          <input
            type="checkbox"
            name="mainSwitch"
            id="toggle_button"
            :checked="isActive"
            @click="changeDisabled()"
          />
          <i></i>
        </label>
        <span class="enabled" v-if="isActive">Enabled</span>
        <span v-if="!isActive">Disabled</span>
        <div v-if="!isActive" class="popBox">
          <i class="fa fa-long-arrow-left"></i>
          Enable welcome bonus point (Reward users when sign up)
        </div>
      </div>
      <md-button
        v-if="isActive"
        @click.prevent="handleSave"
        class="md-raised md-accent"
        >Save</md-button
      >
    </div>

    <div class="editTemplate">
      <div class="settingsBlock">
        <!-- Basic settings -->
        <div class="btn-toggle" v-on:click="isToggleBasic = !isToggleBasic">
          <div class="btn-toggle-title">
            <span>
              <img src="../../assets/fomo/icon-paint.svg" alt="" />
            </span>
            <h2>Basic Settings</h2>
          </div>
          <span class="material-icons">
            <span v-if="isToggleBasic">keyboard_arrow_down</span>
            <span v-if="!isToggleBasic">keyboard_arrow_right</span>
          </span>
        </div>
        <ul class="inner-settings" v-if="!isToggleBasic">
          <li v-for="basicSetting in basicSettings" :key="basicSetting.name">
            <span>{{ basicSetting.name }}</span>
            <span v-on:click="isToggleBasic = !isToggleBasic">
              <img src="../../assets/fomo/IconLineedit.svg" alt="" />
            </span>
          </li>
        </ul>

        <div class="item" v-if="isToggleBasic">
          <!-- Layout -->
          <div
            class="btn-toggle-sub"
            :class="!isToggleLayout ? 'bor-bot' : ''"
            v-on:click="isToggleLayout = !isToggleLayout"
          >
            <h3>
              Layout
              <span class="material-icons">
                <span v-if="isToggleLayout">keyboard_arrow_down</span>
                <span v-if="!isToggleLayout">keyboard_arrow_right</span>
              </span>
            </h3>
          </div>
          <div class="item-sub" v-if="isToggleLayout">
            <ul class="chooseImg">
              <li v-for="chooselayout in chooselayouts" :key="chooselayout.id">
                <img
                  src="../../assets/fomo/layout_row.png"
                  :alt="chooselayout.name"
                  :id="chooselayout.id"
                />
                <span class="material-icons select">
                  <span>done</span>
                </span>
              </li>
            </ul>
          </div>

          <!-- Setup messages -->
          <div
            class="btn-toggle-sub"
            v-on:click="isToggleSetUpMsg = !isToggleSetUpMsg"
          >
            <h3>
              Setup messages
              <span class="material-icons">
                <span v-if="isToggleSetUpMsg">keyboard_arrow_down</span>
                <span v-if="!isToggleSetUpMsg">keyboard_arrow_right</span>
              </span>
            </h3>
          </div>
          <div class="item-sub" v-if="isToggleSetUpMsg">
            <label class="control-label">Title Text</label>
            <quillEditor
              v-model="
                listData.templates[0].popup_settings.default.text_boxes[0].text
              "
              :options="eOptions"
              @focus="onEditorFocus($event, name)"
              :ref="`${key}-${name}`"
            ></quillEditor>
            <div class="height-10"></div>
            <label class="control-label">Sub Title</label>
          </div>

          <!-- Button Setup -->
          <div
            class="btn-toggle-sub"
            v-on:click="isToggleBtnSetUp = !isToggleBtnSetUp"
          >
            <h3>
              Button Setup
              <span class="material-icons">
                <span v-if="isToggleBtnSetUp">keyboard_arrow_down</span>
                <span v-if="!isToggleBtnSetUp">keyboard_arrow_right</span>
              </span>
            </h3>
          </div>
          <div class="item-sub" v-if="isToggleBtnSetUp">
            <label class="control-label">Button Text</label>
            <quillEditor
              v-model="
                listData.templates[0].popup_settings.default.buttons[0].text
              "
              :options="eOptions"
              @focus="onEditorFocus($event, name)"
              :ref="`${key}-${name}`"
            ></quillEditor>
            <div class="height-10"></div>
            <div class="dis-flex">
              <label class="control-label">Button URL</label>
              <a href="#">Check redirection</a>
            </div>
            <textarea class="textarea-block" v-model="btnUrl">
                   listData.templates[0].popup_settings.default.buttons[0].url
                </textarea
            >
          </div>

          <!-- Choose background images -->
          <div
            class="btn-toggle-sub"
            v-on:click="isToggleChooseBg = !isToggleChooseBg"
          >
            <h3>
              Choose background images
              <span class="material-icons">
                <span v-if="isToggleChooseBg">keyboard_arrow_down</span>
                <span v-if="!isToggleChooseBg">keyboard_arrow_right</span>
              </span>
            </h3>
          </div>
          <div class="item-sub" v-if="isToggleChooseBg">
            <ul class="chooseImg">
              <li v-for="chooseImage in chooseImages" :key="chooseImage.id">
                <img
                  src="../../assets/fomo/bg-card-day.png"
                  alt="chooseImage.name"
                  id="chooseImage.id"
                />
                <span class="icon-checkmark"></span>
              </li>
            </ul>
            <div class="btn btn-info fileinput-button btn-block">
              <span>Upload Image</span>
              <input id="choose_image" type="file" name="Filedata" />
            </div>
            <div class="height-1 bg-gray margin-top-20 margin-bottom-20"></div>
            <div class="form-group dis-flex">
              <label>Color Overlay</label>

              <ColorPicker color="#ff0000"></ColorPicker>
            </div>
            <div class="form-group dis-flex">
              <label>Fields</label>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                  <input
                    type="radio"
                    name="options"
                    id="dark"
                    autocomplete="off"
                  />
                  Dark
                </label>
                <label class="btn btn-secondary">
                  <input
                    type="radio"
                    name="options"
                    id="light"
                    autocomplete="off"
                  />
                  Light
                </label>
              </div>
            </div>
          </div>

          <!-- Thank you message -->
          <div
            class="btn-toggle-sub"
            v-on:click="isToggleThankMsg = !isToggleThankMsg"
          >
            <h3>
              Thank you message
              <span class="material-icons">
                <span v-if="isToggleThankMsg">keyboard_arrow_down</span>
                <span v-if="!isToggleThankMsg">keyboard_arrow_right</span>
              </span>
            </h3>
          </div>
          <div class="item-sub" v-if="isToggleThankMsg">
            <div class="dis-flex">
              <label class="control-label">Text</label>
              <a href="#">Insert dynamic variables</a>
            </div>
            <textarea class="textarea-block" ng-model="thankText">
                    Thank you message
                </textarea
            >
          </div>
        </div>

        <!-- Display settings -->
        <div class="btn-toggle" v-on:click="isToggleDisplay = !isToggleDisplay">
          <div class="btn-toggle-title">
            <span>
              <img src="../../assets/fomo/icon-display.svg" alt="" />
            </span>
            <h2>Display Settings</h2>
          </div>
          <span class="material-icons">
            <span v-if="isToggleDisplay">keyboard_arrow_down</span>
            <span v-if="!isToggleDisplay">keyboard_arrow_right</span>
          </span>
        </div>

        <div class="item" v-if="isToggleDisplay">
          <div class="display-settings">
            <div class="form-group">
              <label class="control-label" for="competition_start_date">
                <md-icon class="icon-checkmark">done</md-icon>
                <span>Start Date</span>
              </label>
              <div
                class="input-group date margin-top-10"
                id="competition_start_datepicker"
              >
                <input class="form-control" type="text" />
                <md-icon>event</md-icon>
              </div>
            </div>
            <div class="form-group">
              <label
                class="control-label"
                for="end_date"
                @click="disabled = (disabled + 1) % 2"
              >
                <md-icon
                  class="icon-checkmark"
                  :class="disabled ? '' : 'emptyIcon'"
                >
                  <span v-if="!disabled">circle</span>
                  <span v-if="disabled">done</span>
                </md-icon>
                <span :class="disabled ? '' : 'disableOpacity'">End Date</span>
              </label>

              <div
                class="input-group date margin-top-10"
                id="competition_end_datepicker"
              >
                <div class="disable-overlay" v-if="disabled"></div>
                <input
                  :disabled="!disabled == 1"
                  class="form-control"
                  type="text"
                  value=""
                  id="end_date"
                />
                <md-icon>event</md-icon>
              </div>
            </div>

            <div class="vis_block-status">
              Visible to:
              <span class="status-btn status-btn-active dis-flex-noJustify">
                <md-icon class="icon-checkmark">done</md-icon>
                <span>Logged out</span>
              </span>
              <span class="status-btn status-btn-active dis-flex-noJustify">
                <md-icon class="icon-checkmark">done</md-icon>
                <span>Guest</span>
              </span>
            </div>
          </div>
          <div class="display-settings">
            <div id="desktop_show_specific_page_only_div" class="form-group">
              <label class="control-label">Show on specific page(s)</label>
              <select id="desktop_show_specific_page_only" multiple>
                {$styles_data['desktop_show_specific_page_only']}
              </select>
              <div class="text-info gr-info small">
                <span class="material-icons">info</span>
                <span
                  >Enter Slug, Part URL (E.g. products, myaccount, cart ..etc)
                  to show the widget on the page(s) or page name</span
                >
              </div>
            </div>

            <div class="form-group">
              <input type="checkbox" id="checkbox0" v-model="checked" />
              <label class="label-text" for="checkbox0"
                >Show on home page</label
              >
            </div>
          </div>

          <div class="display-settings">
            <div class="form-group dis-flex">
              <label for="whentoShow">
                When to show
              </label>
              <div class="divHalf">
                <select class="form-control" v-model="selectedShow">
                  <option disabled value="">Please select one</option>
                  <option>On exit intent</option>
                  <option>B</option>
                  <option>C</option>
                </select>
                <span>Selected: {{ selectedShow }}</span>
              </div>
            </div>
            <div class="form-group dis-flex">
              <label for="disFreq">
                Display frequency
              </label>
              <div class="divHalf">
                <select class="form-control" v-model="selectedFrequency">
                  <option disabled value="">Please select one</option>
                  <option>Once a month</option>
                  <option>B</option>
                  <option>C</option>
                </select>
                <span>Selected: {{ selectedFrequency }}</span>
              </div>
            </div>
          </div>

          <div class="display-settings">
            <div class="form-group dis-flex">
              <label for="WidPosition">
                Prompts Position
              </label>
              <div class="divHalf">
                <select class="form-control" v-model="selectedPosition">
                  <option disabled value="">Please select one</option>
                  <option>Mid Right</option>
                  <option>Mid Left</option>
                  <option>Bottom Bar</option>
                  <option>Bottom Left</option>
                  <option>Bottom Right</option>
                  <option>Bottom Center</option>
                </select>
                <span>Selected: {{ selectedPosition }}</span>
              </div>
            </div>
            <div class="form-group dis-flex">
              <label for="label_x_d">Horizontal Position(px)</label>
              <div class="divHalf">
                <input
                  type="number"
                  class="form-control"
                  value=""
                  id="label_x_d"
                  min="0"
                  max="100"
                />
                <div class="small note" id="">Enter between 0 and 100</div>
              </div>
            </div>
            <div class="form-group dis-flex">
              <label for="label_y_d">Vertical Position(px)</label>
              <div class="divHalf">
                <input
                  type="number"
                  class="form-control"
                  value=""
                  id="label_y_d"
                  min="0"
                  max="100"
                />
                <div class="small note" id="">Enter between 0 and 100</div>
              </div>
            </div>
          </div>

          <div class="display-settings">
            <div
              class="dis-flex dis-flex-center"
              v-on:click="geoLocation = !geoLocation"
            >
              <label>
                Setup geo restriction<br />
                <a href="#" class="linkTxt">Display selected areas only</a>
              </label>
              <span class="material-icons">
                <span v-if="geoLocation">remove</span>
                <span v-if="!geoLocation">add</span>
              </span>
            </div>

            <div v-if="geoLocation" class="margin-top-20">
              Show geo restriction
            </div>
          </div>

          <div class="display-settings">
            <div
              class="dis-flex dis-flex-center"
              v-on:click="popVisibility = !popVisibility"
            >
              <label class="control-label">
                Pop up visibility rules<br />
                <a href="#" class="linkTxt">Show on selected pages</a>
              </label>
              <span class="material-icons">
                <span v-if="popVisibility">remove</span>
                <span v-if="!popVisibility">add</span>
              </span>
            </div>

            <div v-if="popVisibility" class="margin-top-20">
              <div class="form-group">
                <label class="control-label">Show on first visit</label>
                <div class="form-group dis-flex-alignStart">
                  <input type="checkbox" id="checkbox1" />
                  <label class="label-text" for="checkbox1"
                    >Pop up will appear on the first visit</label
                  >
                </div>

                <div class="height-20"></div>

                <label class="control-label">Show on scroll percentage</label>
                <div class="form-group dis-flex-alignStart">
                  <input
                    type="checkbox"
                    id="checkbox2"
                    v-model="showPercentage"
                  />
                  <label class="label-text" for="checkbox2"
                    >Set the percentage a visitor needs to scroll down the page
                    for the pop up to appear</label
                  >
                </div>
                <div v-if="showPercentage" class="dis-flex-noJustify">
                  <input
                    class="form-control margin-right-10 width-100"
                    id=""
                    maxlength="100"
                    name=""
                    value=""
                    initial-value=""
                    type="text"
                  />
                  %
                </div>

                <div class="height-20"></div>

                <label class="control-label">Show after time on page</label>
                <div class="form-group dis-flex-alignStart">
                  <input type="checkbox" id="checkbox3" v-model="showSeconds" />
                  <label class="label-text" for="checkbox3"
                    >Set the number of seconds a visitor needs to be on your
                    webpage before the pop up appears</label
                  >
                </div>
                <div v-if="showSeconds" class="dis-flex-noJustify">
                  <input
                    class="form-control margin-right-10 width-100"
                    id=""
                    maxlength="100"
                    name=""
                    value=""
                    initial-value=""
                    type="text"
                  />
                  Seconds
                </div>

                <div class="height-20"></div>

                <label class="control-label">Show on exit intent</label>
                <div class="form-group dis-flex-alignStart">
                  <input type="checkbox" id="checkbox4" />
                  <label class="label-text" for="checkbox4"
                    >Popup will appear if a visitor’s mouse movement shows
                    intent to leave your website</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="preview_block">
        <div class="preview_block-title">
          <h2>Fomo Preview</h2>
          <div class="previewBlockBtn">
            <md-button
              class="md-raised btn-default"
              v-on:click="isHidden = !isHidden"
              >Embed</md-button
            >
            <md-button class="md-raised btn-preview">Preview</md-button>
          </div>
        </div>
        <div class="preview_block-template">
          <div class="template-inner-6">
            <div class="template-inner-6-inner">
              <div>
                <h3
                  v-html="
                    listData.templates[0].popup_settings.default.text_boxes[0]
                      .text
                  "
                ></h3>
                <p>{{ setupMsgDesc }}</p>
              </div>
              <div class="split"></div>
              <a
                class="btn"
                :href="btnUrl"
                v-html="
                  listData.templates[0].popup_settings.default.buttons[0].text
                "
              ></a>
            </div>
          </div>
        </div>
        <div class="embed_visible" v-if="isHidden">
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
// import HelloWorld from "@/components/HelloWorld.vue";
import Axios from "axios";
import ColorPicker from "../../components/ColorPicker";
//import CustomVariables from "../../components/CustomVariables.vue";
import Quill from "quill";
import { quillEditor } from "vue-quill-editor"; // require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

var Parchment = Quill.import("parchment");
var Delta = Quill.import("delta");
let Break = Quill.import("blots/break");
let Embed = Quill.import("blots/embed");
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
    //CustomVariables,
    quillEditor
  },
  data: function() {
    return {
      id: this.$route.params.fomoId,
      isActive: false,
      listData: null,
      quillEditor: {},
      eOptions: options,
      isToggleDisplay: false,
      isToggleBasic: false,
      isToggleLayout: false,
      isToggleSetUpMsg: false,
      isToggleBtnSetUp: false,
      isToggleChooseBg: false,
      isToggleThankMsg: false,
      isHidden: false,
      geoLocation: false,
      popVisibility: false,
      showPercentage: false,
      showSeconds: false,
      isSwitchEndDate: false,
      isChooseLayout: false,
      disabled: 0,
      selectedShow: "",
      selectedFrequency: "",
      selectedPosition: "",
      setupMsg: "CONGRATULATIONS!",
      setupMsgDesc: "Sign up and explore exiciting deals + Coupon!",
      message:
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/H4SXxphcII8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      basicSettings: [
        { name: "Layout" },
        { name: "Setup Messages" },
        { name: "Button Setup" },
        { name: "Choose Background Images" },
        { name: "Thank you message" }
      ],
      chooselayouts: [
        { id: "1", src: "layout_row.png", name: "layoutStyle_1", style: "row" },
        {
          id: "2",
          src: "layout_col.png",
          name: "layoutStyle_2",
          style: "column"
        },
        {
          id: "3",
          src: "layout_row_reverse.png",
          name: "layoutStyle_3",
          style: "row_reverse"
        },
        {
          id: "4",
          src: "layout_col_reverse.png",
          name: "layoutStyle_4",
          style: "column_reverse"
        }
      ],
      chooseImages: [
        { id: "1", src: "bg-card-day.png", name: "Backfround_1" },
        { id: "2", src: "bg-card-2x.jpg", name: "Backfround_2" },
        { id: "3", src: "bg-card-custom.jpg", name: "Backfround_3" },
        { id: "4", src: "bg-card-10p.png", name: "Backfround_4" },
        { id: "5", src: "bg-card-minimum.png", name: "Backfround_5" },
        { id: "6", src: "bg-card-bonus.png", name: "Backfround_6" },
        { id: "7", src: "bg-card-season.png", name: "Backfround_7" },
        { id: "8", src: "bg_template-6.png", name: "Backfround_8" }
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
  methods: {
    changeDisabled() {
      this.isActive = !this.isActive;
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
    onEditorFocus: function(quill, name) {
      this.quillEditor[name] = quill.selection.savedRange.index;
    },

    handleBack: function() {
      window.history.back();
    }
    //ChooseLayout: function(event) {
    //this.targetId = event.chooselayout.id;
    //console.log(this.targetId); // returns 'foo'
    //}
  },
  mounted: function() {
    Axios.get("https://venga.devam.pro/gr/admin/fomo/getFomo/1").then(
      ({ data }) => {
        this.listData = data.data;

        console.log("@@@", data);
      }
    );
  }
};
</script>
<style lang="less" scoped>
.fixedHeaderBlock .fixedHeaderBlockInner {
  justify-content: space-between;
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

.info_block {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fef9ec;
  border-bottom: 1px solid #ebecec;
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  color: #333;
  margin: 4em 0 20px;
  padding: 15px 0;

  &.disabled {
    background: #ebecec;
  }

  .displayNone {
    display: none;
  }

  .info_block-spacing {
    padding: 0 20px;

    .form-group {
      margin: 10px 0;
    }

    h4,
    p {
      margin: 0;
    }

    .btn-space {
      padding: 8px 25px;
    }
  }

  .icon-info {
    margin-right: 10px;
  }

  .info-link-blue {
    color: #007aff !important;
    margin-left: 10px;
  }
}

/* PopBox */
.popBox {
  position: absolute;
  background: #326ae0;
  color: #fff;
  padding: 20px;
  border-radius: 0 20px 20px 20px;
  top: 45px;
  z-index: 1;
  width: 250px;
  line-height: 13px;
  font-size: 11px;
  display: flex;

  i {
    padding-right: 10px;
  }
}
.highAlert {
  position: relative;
  display: flex;
  align-items: center;

  span {
    font-size: 12px;
    margin-left: 10px;
    color: #d12e2e;

    &.enabled {
      color: #1bcc69;
    }
  }
}

.editTemplate {
  margin: 4em 50px;
  display: flex;
  justify-content: flex-start;

  .settingsBlock {
    flex: 1;
    margin-right: 20px;
    max-width: 33%;

    .btn-toggle {
      border: 1px solid #e4e3e3;
      padding: 10px 20px;
      border-top: 2px solid #007aff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 40px;

      &:first-child {
        margin-top: 0;
      }

      .btn-toggle-title {
        display: flex;
        align-items: center;

        span {
          color: #007aff;
          margin-right: 10px;
          font-weight: bold;
        }

        h2 {
          margin: 10px 0;
          font-size: 18px;
        }
      }
    }

    .btn-toggle-sub {
      border: 5px solid #e8e8e8;
      border-top: 0;
      border-bottom: 0;

      &:first-child {
        border-top: 5px solid #e8e8e8;
        border-bottom: 0 !important;
      }

      &:last-child {
        margin-top: 10px;
        border-top: 1px solid #e8e8e8;
        border-bottom: 5px solid #e8e8e8;
      }

      &.bor-bot {
        border-bottom: 5px solid #e8e8e8;
      }

      h3 {
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin: 0;
        color: #007aff;
        border-bottom: 1px solid #e8e8e8;
      }
    }

    .item-sub {
      border: 5px solid #e8e8e8;
      border-top: 0;
      /*overflow: hidden;*/
      padding: 20px;
    }

    ul.inner-settings {
      margin: 0;
      padding: 0;

      li {
        list-style: none;
        border: 1px solid #e4e3e3;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        border-top: 0;
        color: #48548e;
        font-size: 14px;
        font-weight: 400;

        &:last-child {
          margin-top: 10px;
          border-top: 1px solid #e4e3e3;
          box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
        }

        &:nth-last-child(2) {
          box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  /* Choose Background images */
  ul.chooseImg {
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: row wrap;
    margin: 0px -5px 20px;
    align-items: center;
    justify-content: center;

    li {
      list-style: none;
      width: 68px;
      border: 1px solid #979797;
      background: #ddd;
      margin: 5px;
      position: relative;

      &:hover {
        border-color: #007aff;
      }

      &.active {
        border-color: #007aff;

        .select {
          color: #fff;
          border-radius: 50%;
          background: #007aff;
          font-size: 7px;
          padding: 5px;
          position: absolute;
          top: -8px;
          right: -8px;
        }
      }
    }
  }

  .item-sub {
    .btn-info {
      border-radius: 0;
    }

    .btn-secondary {
      border-radius: 0;
      color: #6c757d;
      background-color: #c4c9ce;
      border-color: #c4c9ce;
    }

    .btn-secondary:not(:disabled):not(.disabled).active,
    .btn-secondary:not(:disabled):not(.disabled):active,
    .show > .btn-secondary.dropdown-toggle {
      color: #fff;
      background-color: #545b62;
      border-color: #4e555b;
    }

    label {
      font-size: 12px;
      color: #333;
    }

    .dis-flex label {
      font-size: 12px;
      color: #333;
      margin: 0;
    }

    .textarea-block {
      border: 1px solid #e8e8e8;
      padding: 20px;
      border-radius: 4px;
      width: 100%;
      font-size: 12px;
    }
  }
  .btn-group-toggle .btn-secondary:first-child {
    margin-right: 5px;
  }

  .dis-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dis-flex-noJustify {
    display: flex;
    align-items: center;
  }
  .dis-flex-alignBase {
    display: flex;
    align-items: baseline;
  }
  .dis-flex-alignStart {
    display: flex;
    align-items: flex-start;
  }

  /* Display settings */
  .display-settings {
    padding: 20px;
    border: 5px solid #e8e8e8;
    border-top: 0;

    &:first-child {
      border-top: 5px solid #e8e8e8;
    }

    .dis-flex {
      align-items: baseline;
    }

    .dis-flex-center {
      align-items: center;
    }

    a.linkTxt {
      color: #428bca;
      font-weight: 600;
    }

    select,
    input[type="number"],
    input[type="text"],
    label input[type="text"] {
      width: 100%;
      border: 1px solid #e8e8e8;
      overflow: hidden;
      border-radius: 4px;
      padding: 6px 12px;
    }

    .form-group {
      margin: 10px 0;

      input[type="check"] {
        margin-right: 10px;
      }

      label,
      .divHalf {
        flex: 1;
      }

      .form-control {
        display: block;
        width: 100%;

        &.width-100 {
          width: 100px;
        }
      }

      .date {
        position: relative;

        .md-icon {
          position: absolute;
          right: 0;
          top: 3px;
        }
      }
    }

    label {
      font-size: 12px;
      color: #333;

      .icon-checkmark {
        color: #fff;
        border-radius: 50%;
        background: green;
        padding: 5px;
        margin-right: 5px;
        font-size: 12px !important;
        width: 20px;
        min-width: 20px;
        height: 20px;

        &.emptyIcon {
          border: 2px solid #000;
          background: transparent;
        }
      }

      .icon-radio-unchecked {
        font-size: 20px;
        margin-right: 5px;
      }
    }

    .vis_block-status {
      display: flex;
      align-items: center;
      background: #e2f3ff;
      padding: 5px 10px;
      color: #333;
      border-radius: 4px;
      justify-content: center;
    }

    label.checkbox .label-text,
    label.label-text {
      color: #808080;
      font-size: 12px;
      font-weight: normal;
    }
  }
  .disableOpacity {
    opacity: 0.3;
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

.margin-top-20 {
  margin-top: 20px;
}
.margin-top-10 {
  margin-top: 10px;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
.height-10 {
  height: 10px;
}
.height-20 {
  height: 20px;
}

.margin-right-10 {
  margin-right: 10px;
}
</style>
