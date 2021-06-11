(window["amFomo_jsonp"] = window["amFomo_jsonp"] || []).push([[1],{

/***/ "bdd8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1bedbed1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/fomo/Signup.vue?vue&type=template&id=348c3d34&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.details.id_template == 1)?_c('ThemeOne',{attrs:{"iData":_vm.details,"screen":_vm.screen,"close":_vm.close}}):_vm._e(),(_vm.details.id_template == 2)?_c('ThemeTwo',{attrs:{"iData":_vm.details,"screen":_vm.screen,"close":_vm.close}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/fomo/Signup.vue?vue&type=template&id=348c3d34&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/fomo/Signup.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const ThemeOne = () => __webpack_require__.e(/* import() | signup-theme-1 */ 2).then(__webpack_require__.bind(null, "5803"));

const ThemeTwo = () => __webpack_require__.e(/* import() | signup-theme-2 */ 3).then(__webpack_require__.bind(null, "3851"));

/* harmony default export */ var Signupvue_type_script_lang_js_ = ({
  name: "FomoSignup",
  components: {
    ThemeOne,
    ThemeTwo
  },
  props: ["details", "close", "previewMode"],
  data: function () {
    return {
      showScreen: "before_login"
    };
  },
  computed: {
    screen: function () {
      if (this.previewMode) return this.details.show_screen;else return this.showScreen;
    }
  }
});
// CONCATENATED MODULE: ./src/fomo/Signup.vue?vue&type=script&lang=js&
 /* harmony default export */ var fomo_Signupvue_type_script_lang_js_ = (Signupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/fomo/Signup.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  fomo_Signupvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "348c3d34",
  null
  ,true
)

/* harmony default export */ var Signup = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=am-fomo.signup.js.map