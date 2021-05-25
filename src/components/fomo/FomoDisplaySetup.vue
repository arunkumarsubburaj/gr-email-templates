<template>
  <div>
    <h1>Display Setup</h1>
    <div class="displaySetting visibleTo">
      <h6 class="bLabel">Visible to:</h6>
      <div>
        <span
          class="status-btn"
          :class="{ active: formData.visible_to == 'all' }"
          @click="formData.visible_to = 'all'"
        >
          <md-icon class="icon-checkmark">done</md-icon>
          <span>All Visitors</span>
        </span>
        <span
          class="status-btn"
          :class="{ active: formData.visible_to == 'guest' }"
          @click="formData.visible_to = 'guest'"
        >
          <md-icon class="icon-checkmark">done</md-icon>
          <span>Guest Users</span>
        </span>
      </div>
    </div>
    <div class="displaySetting">
      <div class="splitDiv">
        <h6 class="bLabel">Page Display</h6>
        <div>
          <md-field>
            <label>Show on specific page(s)</label>
            <md-input
              v-model="formData.show_on_pages"
              :disabled="formData.show_on_home_page == 1"
            ></md-input>
          </md-field>
          <small class="text-info display-flex align-items-center">
            <span class="material-icons">info</span>
            <span>
              Enter Slug, Part URL (E.g. products, myaccount, cart ..etc) to
              show the widget on the page(s) or page name
            </span>
          </small>
        </div>
        <md-checkbox
          v-model="formData.show_on_home_page"
          :true-value="1"
          :false-value="0"
          >Show on home page</md-checkbox
        >
      </div>
      <div class="splitDiv">
        <h6 class="bLabel">Positioning</h6>
        <md-field>
          <md-select name="position" v-model="formData.position">
            <md-option
              :value="key"
              v-for="(name, key) in content.prompt_positions"
              :key="key"
              >{{ name }}</md-option
            >
          </md-select>
        </md-field>
        <div class="form-group dis-flex">
          <md-field>
            <label>Horizontal Position (px)</label>
            <md-input v-model="formData.horizontal" type="number"></md-input>
            <span class="md-suffix">pixels</span>
          </md-field>
        </div>
        <div class="form-group dis-flex">
          <md-field>
            <label>Vertical Position (px)</label>
            <md-input v-model="formData.vertical" type="number"></md-input>
            <span class="md-suffix">pixels</span>
          </md-field>
        </div>
      </div>
    </div>
    <div class="displaySetting flex-direction-column">
      <h6 class="bLabel">Setup Geolocation</h6>
      <md-field>
        <md-select name="country" v-model="geolocation" multiple>
          <md-option
            :value="key"
            v-for="(name, key) in content.countries"
            :key="key"
            >{{ name }}</md-option
          >
        </md-select>
      </md-field>
      <small class="text-info display-flex align-items-center">
        <span class="material-icons">info</span>
        <span> Display in selected countries only </span>
      </small>
    </div>
    <div class="displaySetting">
      <div class="splitDiv">
        <h6 class="bLabel">Show on first visit</h6>
        <div>
          <md-checkbox
            v-model="formData.show_on_first_visit"
            :true-value="1"
            :false-value="0"
            >Pop up will appear on the first visit</md-checkbox
          >
        </div>
        <h6 class="bLabel mt-20">Show on scroll percentage</h6>
        <div>
          <md-checkbox
            v-model="formData.show_after_scroll"
            :true-value="1"
            :false-value="0"
            >Set the percentage a visitor needs to scroll down the page for the
            pop up to appear</md-checkbox
          >
        </div>
        <md-field class="mt-20" v-if="formData.show_after_scroll == 1">
          <label>Scroll Percentage</label>
          <md-input
            v-model="formData.scroll_percentage"
            type="number"
          ></md-input>
        </md-field>
      </div>
      <div class="splitDiv">
        <h6 class="bLabel">Show on exit intent</h6>
        <div>
          <md-checkbox
            v-model="formData.show_on_exit"
            :true-value="1"
            :false-value="0"
            >Popup will appear if a visitor’s mouse movement shows intent to
            leave your website</md-checkbox
          >
        </div>
        <h6 class="bLabel mt-20">Show after time on page</h6>
        <div>
          <md-checkbox
            v-model="formData.show_after_seconds"
            :true-value="1"
            :false-value="0"
            >Set the number of seconds a visitor needs to be on your webpage
            before the pop up appears</md-checkbox
          >
        </div>
        <md-field class="mt-20" v-if="formData.show_after_seconds == 1">
          <label>Delay Seconds</label>
          <md-input v-model="formData.seconds" type="number"></md-input>
        </md-field>
      </div>
    </div>
    <div class="displaySetting formSubmit">
      <md-button class="md-raised" @click.prevent="close">Cancel</md-button>
      <md-button class="md-raised md-accent">Save</md-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "FomoDisplaySetup",
  props: ["data", "content", "close"],
  data: function() {
    return {
      formData: { ...this.data }
    };
  },
  computed: {
    geolocation: {
      // The allowed_countries initially comes as a string., need to change it as an array
      get: function() {
        return typeof this.formData.allowed_countries == "string"
          ? this.formData.allowed_countries.split(",")
          : this.formData.allowed_countries;
      },
      set: function(v) {
        this.formData.allowed_countries = v;
      }
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.mt-20 {
  margin-top: 20px !important;
}
.mb-20 {
  margin-bottom: 20px !important;
}
.display-flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}
.flex-direction-column {
  flex-direction: column;
}
.bLabel {
  font-size: 1.2em;
  font-weight: 600;
  color: #000;
  margin: 0;
}
.displaySetting {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
  justify-content: space-between;
}
.splitDiv {
  width: 48%;
}
.visibleTo {
  display: flex;
  align-items: center;
  h6 {
    width: 40%;
  }
}
span.status-btn {
  padding: 0.2em 1em;
  color: #000;
  border: 1px solid;
  margin: 0 0.5em;
  border-radius: 2em;
  display: inline-flex;
  align-items: center;
  opacity: 0.4;
  cursor: pointer;
  &.active {
    opacity: 1;
  }
}
.text-info {
  line-height: 1.2;
  .material-icons {
    padding-right: 10px;
  }
}
.formSubmit {
  justify-content: flex-end;
  .md-button {
    margin-left: 10px;
  }
}
</style>
