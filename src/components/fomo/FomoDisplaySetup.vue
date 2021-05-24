<template>
  <div>
    <h1>DisplaySetup</h1>
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
    <div class="display-settings">
      <div id="desktop_show_specific_page_only_div" class="form-group">
        <label class="control-label">Show on specific page(s)</label>
        <select id="desktop_show_specific_page_only" multiple>
          {$styles_data['desktop_show_specific_page_only']}
        </select>
        <div class="text-info gr-info small">
          <span class="material-icons">info</span>
          <span
            >Enter Slug, Part URL (E.g. products, myaccount, cart ..etc) to show
            the widget on the page(s) or page name</span
          >
        </div>
      </div>

      <div class="form-group">
        <input type="checkbox" id="checkbox0" v-model="checked" />
        <label class="label-text" for="checkbox0">Show on home page</label>
      </div>
    </div>
    <div class="display-settings">
      <div class="form-group dis-flex">
        <label for="WidPosition"> Prompts Position </label>
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

    <div class="margin-top-20">
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
          <input type="checkbox" id="checkbox2" v-model="showPercentage" />
          <label class="label-text" for="checkbox2"
            >Set the percentage a visitor needs to scroll down the page for the
            pop up to appear</label
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
            >Set the number of seconds a visitor needs to be on your webpage
            before the pop up appears</label
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
            >Popup will appear if a visitor’s mouse movement shows intent to
            leave your website</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FomoDisplaySetup",
  props: ["data"],
  methods: {}
};
</script>
<style lang="less" scoped>
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
</style>
