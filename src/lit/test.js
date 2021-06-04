const t =
    "undefined" != typeof window &&
    null != window.customElements &&
    void 0 !== window.customElements.polyfillWrapFlushCallback,
  e = (t, e, s = null) => {
    for (; e !== s; ) {
      const s = e.nextSibling;
      t.removeChild(e), (e = s);
    }
  },
  s = `{{lit-${String(Math.random()).slice(2)}}}`,
  i = `\x3c!--${s}--\x3e`,
  n = new RegExp(`${s}|${i}`);
class o {
  constructor(t, e) {
    (this.parts = []), (this.element = e);
    const i = [],
      o = [],
      a = document.createTreeWalker(e.content, 133, null, !1);
    let p = 0,
      h = -1,
      d = 0;
    const {
      strings: u,
      values: { length: m }
    } = t;
    for (; d < m; ) {
      const t = a.nextNode();
      if (null !== t) {
        if ((h++, 1 === t.nodeType)) {
          if (t.hasAttributes()) {
            const e = t.attributes,
              { length: s } = e;
            let i = 0;
            for (let t = 0; t < s; t++) r(e[t].name, "$lit$") && i++;
            for (; i-- > 0; ) {
              const e = u[d],
                s = c.exec(e)[2],
                i = s.toLowerCase() + "$lit$",
                o = t.getAttribute(i);
              t.removeAttribute(i);
              const r = o.split(n);
              this.parts.push({
                type: "attribute",
                index: h,
                name: s,
                strings: r
              }),
                (d += r.length - 1);
            }
          }
          "TEMPLATE" === t.tagName && (o.push(t), (a.currentNode = t.content));
        } else if (3 === t.nodeType) {
          const e = t.data;
          if (e.indexOf(s) >= 0) {
            const s = t.parentNode,
              o = e.split(n),
              a = o.length - 1;
            for (let e = 0; e < a; e++) {
              let i,
                n = o[e];
              if ("" === n) i = l();
              else {
                const t = c.exec(n);
                null !== t &&
                  r(t[2], "$lit$") &&
                  (n =
                    n.slice(0, t.index) +
                    t[1] +
                    t[2].slice(0, -"$lit$".length) +
                    t[3]),
                  (i = document.createTextNode(n));
              }
              s.insertBefore(i, t),
                this.parts.push({ type: "node", index: ++h });
            }
            "" === o[a] ? (s.insertBefore(l(), t), i.push(t)) : (t.data = o[a]),
              (d += a);
          }
        } else if (8 === t.nodeType)
          if (t.data === s) {
            const e = t.parentNode;
            (null !== t.previousSibling && h !== p) ||
              (h++, e.insertBefore(l(), t)),
              (p = h),
              this.parts.push({ type: "node", index: h }),
              null === t.nextSibling ? (t.data = "") : (i.push(t), h--),
              d++;
          } else {
            let e = -1;
            for (; -1 !== (e = t.data.indexOf(s, e + 1)); )
              this.parts.push({ type: "node", index: -1 }), d++;
          }
      } else a.currentNode = o.pop();
    }
    for (const t of i) t.parentNode.removeChild(t);
  }
}
const r = (t, e) => {
    const s = t.length - e.length;
    return s >= 0 && t.slice(s) === e;
  },
  a = t => -1 !== t.index,
  l = () => document.createComment(""),
  c = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
function p(t, e) {
  const {
      element: { content: s },
      parts: i
    } = t,
    n = document.createTreeWalker(s, 133, null, !1);
  let o = d(i),
    r = i[o],
    a = -1,
    l = 0;
  const c = [];
  let p = null;
  for (; n.nextNode(); ) {
    a++;
    const t = n.currentNode;
    for (
      t.previousSibling === p && (p = null),
        e.has(t) && (c.push(t), null === p && (p = t)),
        null !== p && l++;
      void 0 !== r && r.index === a;

    )
      (r.index = null !== p ? -1 : r.index - l), (o = d(i, o)), (r = i[o]);
  }
  c.forEach(t => t.parentNode.removeChild(t));
}
const h = t => {
    let e = 11 === t.nodeType ? 0 : 1;
    const s = document.createTreeWalker(t, 133, null, !1);
    for (; s.nextNode(); ) e++;
    return e;
  },
  d = (t, e = -1) => {
    for (let s = e + 1; s < t.length; s++) {
      const e = t[s];
      if (a(e)) return s;
    }
    return -1;
  };
const u = new WeakMap(),
  m = t => "function" == typeof t && u.has(t),
  f = {},
  _ = {};
class g {
  constructor(t, e, s) {
    (this.__parts = []),
      (this.template = t),
      (this.processor = e),
      (this.options = s);
  }
  update(t) {
    let e = 0;
    for (const s of this.__parts) void 0 !== s && s.setValue(t[e]), e++;
    for (const t of this.__parts) void 0 !== t && t.commit();
  }
  _clone() {
    const e = t
        ? this.template.element.content.cloneNode(!0)
        : document.importNode(this.template.element.content, !0),
      s = [],
      i = this.template.parts,
      n = document.createTreeWalker(e, 133, null, !1);
    let o,
      r = 0,
      l = 0,
      c = n.nextNode();
    for (; r < i.length; )
      if (((o = i[r]), a(o))) {
        for (; l < o.index; )
          l++,
            "TEMPLATE" === c.nodeName &&
              (s.push(c), (n.currentNode = c.content)),
            null === (c = n.nextNode()) &&
              ((n.currentNode = s.pop()), (c = n.nextNode()));
        if ("node" === o.type) {
          const t = this.processor.handleTextExpression(this.options);
          t.insertAfterNode(c.previousSibling), this.__parts.push(t);
        } else
          this.__parts.push(
            ...this.processor.handleAttributeExpressions(
              c,
              o.name,
              o.strings,
              this.options
            )
          );
        r++;
      } else this.__parts.push(void 0), r++;
    return t && (document.adoptNode(e), customElements.upgrade(e)), e;
  }
}
const y =
    window.trustedTypes &&
    trustedTypes.createPolicy("lit-html", { createHTML: t => t }),
  b = ` ${s} `;
class w {
  constructor(t, e, s, i) {
    (this.strings = t),
      (this.values = e),
      (this.type = s),
      (this.processor = i);
  }
  getHTML() {
    const t = this.strings.length - 1;
    let e = "",
      n = !1;
    for (let o = 0; o < t; o++) {
      const t = this.strings[o],
        r = t.lastIndexOf("\x3c!--");
      n = (r > -1 || n) && -1 === t.indexOf("--\x3e", r + 1);
      const a = c.exec(t);
      e +=
        null === a
          ? t + (n ? b : i)
          : t.substr(0, a.index) + a[1] + a[2] + "$lit$" + a[3] + s;
    }
    return (e += this.strings[t]), e;
  }
  getTemplateElement() {
    const t = document.createElement("template");
    let e = this.getHTML();
    return void 0 !== y && (e = y.createHTML(e)), (t.innerHTML = e), t;
  }
}
const v = t => null === t || !("object" == typeof t || "function" == typeof t),
  x = t => Array.isArray(t) || !(!t || !t[Symbol.iterator]);
class S {
  constructor(t, e, s) {
    (this.dirty = !0),
      (this.element = t),
      (this.name = e),
      (this.strings = s),
      (this.parts = []);
    for (let t = 0; t < s.length - 1; t++) this.parts[t] = this._createPart();
  }
  _createPart() {
    return new k(this);
  }
  _getValue() {
    const t = this.strings,
      e = t.length - 1,
      s = this.parts;
    if (1 === e && "" === t[0] && "" === t[1]) {
      const t = s[0].value;
      if ("symbol" == typeof t) return String(t);
      if ("string" == typeof t || !x(t)) return t;
    }
    let i = "";
    for (let n = 0; n < e; n++) {
      i += t[n];
      const e = s[n];
      if (void 0 !== e) {
        const t = e.value;
        if (v(t) || !x(t)) i += "string" == typeof t ? t : String(t);
        else for (const e of t) i += "string" == typeof e ? e : String(e);
      }
    }
    return (i += t[e]), i;
  }
  commit() {
    this.dirty &&
      ((this.dirty = !1),
      this.element.setAttribute(this.name, this._getValue()));
  }
}
class k {
  constructor(t) {
    (this.value = void 0), (this.committer = t);
  }
  setValue(t) {
    t === f ||
      (v(t) && t === this.value) ||
      ((this.value = t), m(t) || (this.committer.dirty = !0));
  }
  commit() {
    for (; m(this.value); ) {
      const t = this.value;
      (this.value = f), t(this);
    }
    this.value !== f && this.committer.commit();
  }
}
class P {
  constructor(t) {
    (this.value = void 0), (this.__pendingValue = void 0), (this.options = t);
  }
  appendInto(t) {
    (this.startNode = t.appendChild(l())), (this.endNode = t.appendChild(l()));
  }
  insertAfterNode(t) {
    (this.startNode = t), (this.endNode = t.nextSibling);
  }
  appendIntoPart(t) {
    t.__insert((this.startNode = l())), t.__insert((this.endNode = l()));
  }
  insertAfterPart(t) {
    t.__insert((this.startNode = l())),
      (this.endNode = t.endNode),
      (t.endNode = this.startNode);
  }
  setValue(t) {
    this.__pendingValue = t;
  }
  commit() {
    if (null === this.startNode.parentNode) return;
    for (; m(this.__pendingValue); ) {
      const t = this.__pendingValue;
      (this.__pendingValue = f), t(this);
    }
    const t = this.__pendingValue;
    t !== f &&
      (v(t)
        ? t !== this.value && this.__commitText(t)
        : t instanceof w
        ? this.__commitTemplateResult(t)
        : t instanceof Node
        ? this.__commitNode(t)
        : x(t)
        ? this.__commitIterable(t)
        : t === _
        ? ((this.value = _), this.clear())
        : this.__commitText(t));
  }
  __insert(t) {
    this.endNode.parentNode.insertBefore(t, this.endNode);
  }
  __commitNode(t) {
    this.value !== t && (this.clear(), this.__insert(t), (this.value = t));
  }
  __commitText(t) {
    const e = this.startNode.nextSibling,
      s = "string" == typeof (t = null == t ? "" : t) ? t : String(t);
    e === this.endNode.previousSibling && 3 === e.nodeType
      ? (e.data = s)
      : this.__commitNode(document.createTextNode(s)),
      (this.value = t);
  }
  __commitTemplateResult(t) {
    const e = this.options.templateFactory(t);
    if (this.value instanceof g && this.value.template === e)
      this.value.update(t.values);
    else {
      const s = new g(e, t.processor, this.options),
        i = s._clone();
      s.update(t.values), this.__commitNode(i), (this.value = s);
    }
  }
  __commitIterable(t) {
    Array.isArray(this.value) || ((this.value = []), this.clear());
    const e = this.value;
    let s,
      i = 0;
    for (const n of t)
      (s = e[i]),
        void 0 === s &&
          ((s = new P(this.options)),
          e.push(s),
          0 === i ? s.appendIntoPart(this) : s.insertAfterPart(e[i - 1])),
        s.setValue(n),
        s.commit(),
        i++;
    i < e.length && ((e.length = i), this.clear(s && s.endNode));
  }
  clear(t = this.startNode) {
    e(this.startNode.parentNode, t.nextSibling, this.endNode);
  }
}
class C {
  constructor(t, e, s) {
    if (
      ((this.value = void 0),
      (this.__pendingValue = void 0),
      2 !== s.length || "" !== s[0] || "" !== s[1])
    )
      throw new Error(
        "Boolean attributes can only contain a single expression"
      );
    (this.element = t), (this.name = e), (this.strings = s);
  }
  setValue(t) {
    this.__pendingValue = t;
  }
  commit() {
    for (; m(this.__pendingValue); ) {
      const t = this.__pendingValue;
      (this.__pendingValue = f), t(this);
    }
    if (this.__pendingValue === f) return;
    const t = !!this.__pendingValue;
    this.value !== t &&
      (t
        ? this.element.setAttribute(this.name, "")
        : this.element.removeAttribute(this.name),
      (this.value = t)),
      (this.__pendingValue = f);
  }
}
class N extends S {
  constructor(t, e, s) {
    super(t, e, s),
      (this.single = 2 === s.length && "" === s[0] && "" === s[1]);
  }
  _createPart() {
    return new T(this);
  }
  _getValue() {
    return this.single ? this.parts[0].value : super._getValue();
  }
  commit() {
    this.dirty &&
      ((this.dirty = !1), (this.element[this.name] = this._getValue()));
  }
}
class T extends k {}
let U = !1;
(() => {
  try {
    const t = {
      get capture() {
        return (U = !0), !1;
      }
    };
    window.addEventListener("test", t, t),
      window.removeEventListener("test", t, t);
  } catch (t) {}
})();
class A {
  constructor(t, e, s) {
    (this.value = void 0),
      (this.__pendingValue = void 0),
      (this.element = t),
      (this.eventName = e),
      (this.eventContext = s),
      (this.__boundHandleEvent = t => this.handleEvent(t));
  }
  setValue(t) {
    this.__pendingValue = t;
  }
  commit() {
    for (; m(this.__pendingValue); ) {
      const t = this.__pendingValue;
      (this.__pendingValue = f), t(this);
    }
    if (this.__pendingValue === f) return;
    const t = this.__pendingValue,
      e = this.value,
      s =
        null == t ||
        (null != e &&
          (t.capture !== e.capture ||
            t.once !== e.once ||
            t.passive !== e.passive)),
      i = null != t && (null == e || s);
    s &&
      this.element.removeEventListener(
        this.eventName,
        this.__boundHandleEvent,
        this.__options
      ),
      i &&
        ((this.__options = E(t)),
        this.element.addEventListener(
          this.eventName,
          this.__boundHandleEvent,
          this.__options
        )),
      (this.value = t),
      (this.__pendingValue = f);
  }
  handleEvent(t) {
    "function" == typeof this.value
      ? this.value.call(this.eventContext || this.element, t)
      : this.value.handleEvent(t);
  }
}
const E = t =>
  t &&
  (U ? { capture: t.capture, passive: t.passive, once: t.once } : t.capture);
function V(t) {
  let e = O.get(t.type);
  void 0 === e &&
    ((e = { stringsArray: new WeakMap(), keyString: new Map() }),
    O.set(t.type, e));
  let i = e.stringsArray.get(t.strings);
  if (void 0 !== i) return i;
  const n = t.strings.join(s);
  return (
    (i = e.keyString.get(n)),
    void 0 === i &&
      ((i = new o(t, t.getTemplateElement())), e.keyString.set(n, i)),
    e.stringsArray.set(t.strings, i),
    i
  );
}
const O = new Map(),
  M = new WeakMap();
const $ = new (class {
  handleAttributeExpressions(t, e, s, i) {
    const n = e[0];
    if ("." === n) {
      return new N(t, e.slice(1), s).parts;
    }
    if ("@" === n) return [new A(t, e.slice(1), i.eventContext)];
    if ("?" === n) return [new C(t, e.slice(1), s)];
    return new S(t, e, s).parts;
  }
  handleTextExpression(t) {
    return new P(t);
  }
})();
"undefined" != typeof window &&
  (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.4.1");
const z = (t, ...e) => new w(t, e, "html", $),
  R = (t, e) => `${t}--${e}`;
let I = !0;
void 0 === window.ShadyCSS
  ? (I = !1)
  : void 0 === window.ShadyCSS.prepareTemplateDom &&
    (console.warn(
      "Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."
    ),
    (I = !1));
const j = t => e => {
    const i = R(e.type, t);
    let n = O.get(i);
    void 0 === n &&
      ((n = { stringsArray: new WeakMap(), keyString: new Map() }),
      O.set(i, n));
    let r = n.stringsArray.get(e.strings);
    if (void 0 !== r) return r;
    const a = e.strings.join(s);
    if (((r = n.keyString.get(a)), void 0 === r)) {
      const s = e.getTemplateElement();
      I && window.ShadyCSS.prepareTemplateDom(s, t),
        (r = new o(e, s)),
        n.keyString.set(a, r);
    }
    return n.stringsArray.set(e.strings, r), r;
  },
  B = ["html", "svg"],
  F = new Set(),
  q = (t, e, s) => {
    F.add(t);
    const i = s ? s.element : document.createElement("template"),
      n = e.querySelectorAll("style"),
      { length: o } = n;
    if (0 === o) return void window.ShadyCSS.prepareTemplateStyles(i, t);
    const r = document.createElement("style");
    for (let t = 0; t < o; t++) {
      const e = n[t];
      e.parentNode.removeChild(e), (r.textContent += e.textContent);
    }
    (t => {
      B.forEach(e => {
        const s = O.get(R(e, t));
        void 0 !== s &&
          s.keyString.forEach(t => {
            const {
                element: { content: e }
              } = t,
              s = new Set();
            Array.from(e.querySelectorAll("style")).forEach(t => {
              s.add(t);
            }),
              p(t, s);
          });
      });
    })(t);
    const a = i.content;
    s
      ? (function(t, e, s = null) {
          const {
            element: { content: i },
            parts: n
          } = t;
          if (null == s) return void i.appendChild(e);
          const o = document.createTreeWalker(i, 133, null, !1);
          let r = d(n),
            a = 0,
            l = -1;
          for (; o.nextNode(); )
            for (
              l++,
                o.currentNode === s &&
                  ((a = h(e)), s.parentNode.insertBefore(e, s));
              -1 !== r && n[r].index === l;

            ) {
              if (a > 0) {
                for (; -1 !== r; ) (n[r].index += a), (r = d(n, r));
                return;
              }
              r = d(n, r);
            }
        })(s, r, a.firstChild)
      : a.insertBefore(r, a.firstChild),
      window.ShadyCSS.prepareTemplateStyles(i, t);
    const l = a.querySelector("style");
    if (window.ShadyCSS.nativeShadow && null !== l)
      e.insertBefore(l.cloneNode(!0), e.firstChild);
    else if (s) {
      a.insertBefore(r, a.firstChild);
      const t = new Set();
      t.add(r), p(s, t);
    }
  };
window.JSCompiler_renameProperty = (t, e) => t;
const D = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          return t ? "" : null;
        case Object:
        case Array:
          return null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, e) {
      switch (e) {
        case Boolean:
          return null !== t;
        case Number:
          return null === t ? null : Number(t);
        case Object:
        case Array:
          return JSON.parse(t);
      }
      return t;
    }
  },
  H = (t, e) => e !== t && (e == e || t == t),
  L = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: H };
class X extends HTMLElement {
  constructor() {
    super(), this.initialize();
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this._classProperties.forEach((e, s) => {
        const i = this._attributeNameForProperty(s, e);
        void 0 !== i && (this._attributeToPropertyMap.set(i, s), t.push(i));
      }),
      t
    );
  }
  static _ensureClassProperties() {
    if (
      !this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))
    ) {
      this._classProperties = new Map();
      const t = Object.getPrototypeOf(this)._classProperties;
      void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t));
    }
  }
  static createProperty(t, e = L) {
    if (
      (this._ensureClassProperties(),
      this._classProperties.set(t, e),
      e.noAccessor || this.prototype.hasOwnProperty(t))
    )
      return;
    const s = "symbol" == typeof t ? Symbol() : `__${t}`,
      i = this.getPropertyDescriptor(t, s, e);
    void 0 !== i && Object.defineProperty(this.prototype, t, i);
  }
  static getPropertyDescriptor(t, e, s) {
    return {
      get() {
        return this[e];
      },
      set(i) {
        const n = this[t];
        (this[e] = i), this.requestUpdateInternal(t, n, s);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  static getPropertyOptions(t) {
    return (this._classProperties && this._classProperties.get(t)) || L;
  }
  static finalize() {
    const t = Object.getPrototypeOf(this);
    if (
      (t.hasOwnProperty("finalized") || t.finalize(),
      (this.finalized = !0),
      this._ensureClassProperties(),
      (this._attributeToPropertyMap = new Map()),
      this.hasOwnProperty(JSCompiler_renameProperty("properties", this)))
    ) {
      const t = this.properties,
        e = [
          ...Object.getOwnPropertyNames(t),
          ...("function" == typeof Object.getOwnPropertySymbols
            ? Object.getOwnPropertySymbols(t)
            : [])
        ];
      for (const s of e) this.createProperty(s, t[s]);
    }
  }
  static _attributeNameForProperty(t, e) {
    const s = e.attribute;
    return !1 === s
      ? void 0
      : "string" == typeof s
      ? s
      : "string" == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  static _valueHasChanged(t, e, s = H) {
    return s(t, e);
  }
  static _propertyValueFromAttribute(t, e) {
    const s = e.type,
      i = e.converter || D,
      n = "function" == typeof i ? i : i.fromAttribute;
    return n ? n(t, s) : t;
  }
  static _propertyValueToAttribute(t, e) {
    if (void 0 === e.reflect) return;
    const s = e.type,
      i = e.converter;
    return ((i && i.toAttribute) || D.toAttribute)(t, s);
  }
  initialize() {
    (this._updateState = 0),
      (this._updatePromise = new Promise(
        t => (this._enableUpdatingResolver = t)
      )),
      (this._changedProperties = new Map()),
      this._saveInstanceProperties(),
      this.requestUpdateInternal();
  }
  _saveInstanceProperties() {
    this.constructor._classProperties.forEach((t, e) => {
      if (this.hasOwnProperty(e)) {
        const t = this[e];
        delete this[e],
          this._instanceProperties || (this._instanceProperties = new Map()),
          this._instanceProperties.set(e, t);
      }
    });
  }
  _applyInstanceProperties() {
    this._instanceProperties.forEach((t, e) => (this[e] = t)),
      (this._instanceProperties = void 0);
  }
  connectedCallback() {
    this.enableUpdating();
  }
  enableUpdating() {
    void 0 !== this._enableUpdatingResolver &&
      (this._enableUpdatingResolver(), (this._enableUpdatingResolver = void 0));
  }
  disconnectedCallback() {}
  attributeChangedCallback(t, e, s) {
    e !== s && this._attributeToProperty(t, s);
  }
  _propertyToAttribute(t, e, s = L) {
    const i = this.constructor,
      n = i._attributeNameForProperty(t, s);
    if (void 0 !== n) {
      const t = i._propertyValueToAttribute(e, s);
      if (void 0 === t) return;
      (this._updateState = 8 | this._updateState),
        null == t ? this.removeAttribute(n) : this.setAttribute(n, t),
        (this._updateState = -9 & this._updateState);
    }
  }
  _attributeToProperty(t, e) {
    if (8 & this._updateState) return;
    const s = this.constructor,
      i = s._attributeToPropertyMap.get(t);
    if (void 0 !== i) {
      const t = s.getPropertyOptions(i);
      (this._updateState = 16 | this._updateState),
        (this[i] = s._propertyValueFromAttribute(e, t)),
        (this._updateState = -17 & this._updateState);
    }
  }
  requestUpdateInternal(t, e, s) {
    let i = !0;
    if (void 0 !== t) {
      const n = this.constructor;
      (s = s || n.getPropertyOptions(t)),
        n._valueHasChanged(this[t], e, s.hasChanged)
          ? (this._changedProperties.has(t) ||
              this._changedProperties.set(t, e),
            !0 !== s.reflect ||
              16 & this._updateState ||
              (void 0 === this._reflectingProperties &&
                (this._reflectingProperties = new Map()),
              this._reflectingProperties.set(t, s)))
          : (i = !1);
    }
    !this._hasRequestedUpdate &&
      i &&
      (this._updatePromise = this._enqueueUpdate());
  }
  requestUpdate(t, e) {
    return this.requestUpdateInternal(t, e), this.updateComplete;
  }
  async _enqueueUpdate() {
    this._updateState = 4 | this._updateState;
    try {
      await this._updatePromise;
    } catch (t) {}
    const t = this.performUpdate();
    return null != t && (await t), !this._hasRequestedUpdate;
  }
  get _hasRequestedUpdate() {
    return 4 & this._updateState;
  }
  get hasUpdated() {
    return 1 & this._updateState;
  }
  performUpdate() {
    if (!this._hasRequestedUpdate) return;
    this._instanceProperties && this._applyInstanceProperties();
    let t = !1;
    const e = this._changedProperties;
    try {
      (t = this.shouldUpdate(e)), t ? this.update(e) : this._markUpdated();
    } catch (e) {
      throw ((t = !1), this._markUpdated(), e);
    }
    t &&
      (1 & this._updateState ||
        ((this._updateState = 1 | this._updateState), this.firstUpdated(e)),
      this.updated(e));
  }
  _markUpdated() {
    (this._changedProperties = new Map()),
      (this._updateState = -5 & this._updateState);
  }
  get updateComplete() {
    return this._getUpdateComplete();
  }
  _getUpdateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._updatePromise;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._reflectingProperties &&
      this._reflectingProperties.size > 0 &&
      (this._reflectingProperties.forEach((t, e) =>
        this._propertyToAttribute(e, this[e], t)
      ),
      (this._reflectingProperties = void 0)),
      this._markUpdated();
  }
  updated(t) {}
  firstUpdated(t) {}
}
X.finalized = !0;
const W =
    window.ShadowRoot &&
    (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  J = Symbol();
class G {
  constructor(t, e) {
    if (e !== J)
      throw new Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
      );
    this.cssText = t;
  }
  get styleSheet() {
    return (
      void 0 === this._styleSheet &&
        (W
          ? ((this._styleSheet = new CSSStyleSheet()),
            this._styleSheet.replaceSync(this.cssText))
          : (this._styleSheet = null)),
      this._styleSheet
    );
  }
  toString() {
    return this.cssText;
  }
}
(window.litElementVersions || (window.litElementVersions = [])).push("2.5.1");
const K = {};
class Q extends X {
  static getStyles() {
    return this.styles;
  }
  static _getUniqueStyles() {
    if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) return;
    const t = this.getStyles();
    if (Array.isArray(t)) {
      const e = (t, s) =>
          t.reduceRight(
            (t, s) => (Array.isArray(s) ? e(s, t) : (t.add(s), t)),
            s
          ),
        s = e(t, new Set()),
        i = [];
      s.forEach(t => i.unshift(t)), (this._styles = i);
    } else this._styles = void 0 === t ? [] : [t];
    this._styles = this._styles.map(t => {
      if (t instanceof CSSStyleSheet && !W) {
        const e = Array.prototype.slice
          .call(t.cssRules)
          .reduce((t, e) => t + e.cssText, "");
        return new G(String(e), J);
      }
      return t;
    });
  }
  initialize() {
    super.initialize(),
      this.constructor._getUniqueStyles(),
      (this.renderRoot = this.createRenderRoot()),
      window.ShadowRoot &&
        this.renderRoot instanceof window.ShadowRoot &&
        this.adoptStyles();
  }
  createRenderRoot() {
    return this.attachShadow(this.constructor.shadowRootOptions);
  }
  adoptStyles() {
    const t = this.constructor._styles;
    0 !== t.length &&
      (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow
        ? W
          ? (this.renderRoot.adoptedStyleSheets = t.map(t =>
              t instanceof CSSStyleSheet ? t : t.styleSheet
            ))
          : (this._needsShimAdoptedStyleSheets = !0)
        : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
            t.map(t => t.cssText),
            this.localName
          ));
  }
  connectedCallback() {
    super.connectedCallback(),
      this.hasUpdated &&
        void 0 !== window.ShadyCSS &&
        window.ShadyCSS.styleElement(this);
  }
  update(t) {
    const e = this.render();
    super.update(t),
      e !== K &&
        this.constructor.render(e, this.renderRoot, {
          scopeName: this.localName,
          eventContext: this
        }),
      this._needsShimAdoptedStyleSheets &&
        ((this._needsShimAdoptedStyleSheets = !1),
        this.constructor._styles.forEach(t => {
          const e = document.createElement("style");
          (e.textContent = t.cssText), this.renderRoot.appendChild(e);
        }));
  }
  render() {
    return K;
  }
}
(Q.finalized = !0),
  (Q.render = (t, s, i) => {
    if (!i || "object" != typeof i || !i.scopeName)
      throw new Error("The `scopeName` option is required.");
    const n = i.scopeName,
      o = M.has(s),
      r = I && 11 === s.nodeType && !!s.host,
      a = r && !F.has(n),
      l = a ? document.createDocumentFragment() : s;
    if (
      (((t, s, i) => {
        let n = M.get(s);
        void 0 === n &&
          (e(s, s.firstChild),
          M.set(s, (n = new P(Object.assign({ templateFactory: V }, i)))),
          n.appendInto(s)),
          n.setValue(t),
          n.commit();
      })(t, l, Object.assign({ templateFactory: j(n) }, i)),
      a)
    ) {
      const t = M.get(l);
      M.delete(l);
      const i = t.value instanceof g ? t.value.template : void 0;
      q(n, l, i), e(s, s.firstChild), s.appendChild(l), M.set(s, t);
    }
    !o && r && window.ShadyCSS.styleElement(s.host);
  }),
  (Q.shadowRootOptions = { mode: "open" });
const Y = new WeakMap(),
  Z =
    ((tt = t => e => {
      if (!(e instanceof P))
        throw new Error("unsafeHTML can only be used in text bindings");
      const s = Y.get(e);
      if (void 0 !== s && v(t) && t === s.value && e.value === s.fragment)
        return;
      const i = document.createElement("template");
      i.innerHTML = t;
      const n = document.importNode(i.content, !0);
      e.setValue(n), Y.set(e, { value: t, fragment: n });
    }),
    (...t) => {
      const e = tt(...t);
      return u.set(e, !0), e;
    });
var tt;
let et,
  st = t => t;
let it,
  nt = t => t;
customElements.define(
  "fomo-signup",
  class extends Q {
    static get properties() {
      return {
        preview: { type: Boolean },
        showPreview: { type: String },
        cData: {},
        opened: { type: Boolean },
        iState: { state: !0, reflect: !0 }
      };
    }
    constructor() {
      super(),
        (this.opened = !1),
        (this.preview = !1),
        (this.showPreview = null),
        (this.cData = !1),
        (this.iState = {});
    }
    updated(t) {
      t.forEach((t, e) => {
        "showPreview" === e && this.handleShowPreview();
      });
    }
    connectedCallback() {
      super.connectedCallback(),
        (this.iState = {
          event: { handleSignUp: this.handleSignUp, closeFomo: this.closeFomo },
          state: { signed: !1 }
        }),
        !0 === this.preview
          ? this.setAttribute("opened", "")
          : (this.setAttribute("opened", ""),
            (this.cData = JSON.stringify({
              title:
                "Sign up and explore exiciting deals during this festive season",
              btn_text: "Sign up now",
              coupon_title: "Here is your Coupon",
              congrats: "Congratulations !!",
              bg_color: "#ffad00",
              btn_color: "#A41111"
            })));
    }
    handleShowPreview() {
      (this.newData = { ...this.iState }),
        "after_login" === this.showPreview
          ? (this.newData.state.signed = !0)
          : (this.newData.state.signed = !1),
        (this.iState = this.newData);
    }
    closeFomo() {
      !0 !== this.preview && this.removeAttribute("opened");
    }
    handleSignUp() {
      setTimeout(() => {
        (this.newData = { ...this.iState }),
          (this.newData.state.signed = !0),
          (this.iState = this.newData);
      }, 2e3);
    }
    render() {
      const t = JSON.parse(this.cData);
      return z(
        it || (it = nt` ${0} `),
        ((e = this.iState),
        (s = t),
        z(
          et ||
            (et = st` <div class="amfm__modal"> <div class="amfm__signUp"> <div class="amfm__close" @click="${0}">&times;</div> <section class="step1 ${0}"> <div class="amfm__signUp_desc">${0}</div> <button class="amfm__signUp_btn" @click="${0}"> ${0} </button> </section> <section class="step2 ${0}"> <div class="amfm__signUp_desc"> <span class="flashTitle">${0}</span> ${0} </div> <div class="amfm__signUp_coupon" title="click to copy"> <input id="couponCode" type="text" readonly="readonly" value="AMFM123456"> <span class="amfm__fomo_copyCode"> <svg viewBox="0 0 512 512"> <g> <path d="m463.353 419.998c1.732-2.262 3.362-5.418 3.309-9.487v-333.604c0-8.284-6.716-15-15-15h-48.206v-46.907c0-8.284-6.716-15-15-15h-328.119c-8.284 0-15 6.716-15 15v420.093c0 8.284 6.716 15 15 15h48.206v46.907c0 8.284 6.716 15 15 15h237.557c3.016-.01 7.428-1.17 10.367-4.147l90.549-86.388c.423-.448.426-.39 1.337-1.467zm-388.016.095v-390.093h298.12v31.907h-249.915c-8.284 0-15 6.716-15 15v343.187h-33.205zm63.205-328.186h298.12v303.705h-75.549c-8.284 0-15 6.716-15 15v71.388h-207.571zm237.571 370.051v-36.346h38.097z"/> <path d="m185.115 211.582h206.968c8.284 0 15-6.716 15-15s-6.716-15-15-15h-206.968c-8.284 0-15 6.716-15 15s6.716 15 15 15z"/> <path d="m185.115 271.721h206.968c8.284 0 15-6.716 15-15s-6.716-15-15-15h-206.968c-8.284 0-15 6.716-15 15s6.716 15 15 15z"/> <path d="m185.115 331.86h206.968c8.284 0 15-6.716 15-15s-6.716-15-15-15h-206.968c-8.284 0-15 6.716-15 15s6.716 15 15 15z"/> <path d="m308.134 361.999h-123.019c-8.284 0-15 6.716-15 15s6.716 15 15 15h123.019c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/> </g> </svg> </span> </div> </section> <div class="amfm_signUp_points"> <span>200</span> <small>Points</small> </div> </div> </div> <style>:host{--bg-color:${0};--btn-color:${0}}*{-webkit-box-sizing:border-box;box-sizing:border-box}.amfm__hide{display:none!important}.amfm__signUp_btn{cursor:pointer;outline:0;border:0}.amfm__signUp_coupon{cursor:copy;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-animation:none!important;animation:none!important}.amfm__fomo_copyCode{width:22px;height:22px;margin-left:10px}.amfm__fomo_copyCode svg{display:block;width:100%;fill:currentColor}.amfm__modal{position:fixed;z-index:101;font-family:Arial,sans-serif;bottom:30px;left:0;opacity:0;pointer-events:none;-webkit-transition:.2s ease;transition:.2s ease}.amfm__signUp{position:relative;min-width:200px;max-width:400px;height:150px;padding:0 150px 0 50px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;color:#333;font-size:10px;background-color:var(--bg-color);border-radius:0 75px 75px 0;opacity:0;-webkit-transform:translateX(-100px);transform:translateX(-100px);-webkit-transition:.35s ease-out .2s;transition:.35s ease-out .2s}.amfm__close{position:absolute;top:5px;left:5px;width:24px;height:24px;font-size:18px;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;color:#fff;background-color:#000;border-radius:50%;opacity:.7;-webkit-transition:.3s linear;transition:.3s linear}.amfm__close:hover{opacity:1;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.amfm__signUp_desc{font-size:1.7em;font-weight:700;line-height:1.2;margin-bottom:.75em;padding-right:2em}.amfm__signUp_btn,.amfm__signUp_coupon{padding:0 30px;border-radius:2.2em;border:none;outline:0;color:rgba(255,255,255,.75);font-size:1.4em;line-height:3;text-transform:uppercase;background-color:var(--btn-color);-webkit-appearance:none;-webkit-transition:.18s;transition:.18s}.amfm__signUp_btn:hover{padding:0 40px}.amfm__signUp_btn:hover,.amfm__signUp_coupon:hover{-webkit-box-shadow:0 0 0 3px #fff;box-shadow:0 0 0 3px #fff}.amfm__signUp_coupon input{background:0 0;border:0;height:40px;color:#fff;text-align:center;display:inline-block;width:120px;pointer-events:none}.amfm__signUp_coupon input:focus{outline:0;border:0}.amfm_signUp_points{position:absolute;top:50%;right:30px;width:90px;height:90px;margin-top:-45px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;color:var(--bg-color);line-height:1;font-size:2.6em;font-weight:700;background:#fff;border-radius:50%}:host([opened]) .amfm_signUp_points{-webkit-box-shadow:0 0 0 1px currentcolor,0 0 0 8px #fff;box-shadow:0 0 0 1px currentcolor,0 0 0 8px #fff;-webkit-animation:heartBeat 2s ease-in-out 1s both;animation:heartBeat 2s ease-in-out 1s both}.amfm_signUp_points small{font-size:54%;font-weight:400}@-webkit-keyframes heartBeat{0%{-webkit-transform:scale(1);transform:scale(1)}7%{-webkit-transform:scale(1.3);transform:scale(1.3)}14%{-webkit-transform:scale(1);transform:scale(1)}28%{-webkit-transform:scale(1.3);transform:scale(1.3)}42%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes heartBeat{0%{-webkit-transform:scale(1);transform:scale(1)}7%{-webkit-transform:scale(1.3);transform:scale(1.3)}14%{-webkit-transform:scale(1);transform:scale(1)}28%{-webkit-transform:scale(1.3);transform:scale(1.3)}42%{-webkit-transform:scale(1);transform:scale(1)}}.step1{-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}.fadeOff{opacity:0;pointer-events:none;-webkit-transform:translateX(30px);transform:translateX(30px)}.step2{-webkit-animation:fadeIn .3s ease-in-out both;animation:fadeIn .3s ease-in-out both}.flashTitle{display:block;margin-bottom:.5em;-webkit-animation:flash 1s linear .3s both;animation:flash 1s linear .3s both}@-webkit-keyframes fadeIn{0%{opacity:0;-webkit-transform:translateX(-30px);transform:translateX(-30px)}100%{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes fadeIn{0%{opacity:0;-webkit-transform:translateX(-30px);transform:translateX(-30px)}100%{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes flash{0%,100%,50%{opacity:1}25%,75%{opacity:0}}@keyframes flash{0%,100%,50%{opacity:1}25%,75%{opacity:0}}:host([opened]) .amfm__modal{opacity:1;pointer-events:all}:host([opened]) .amfm__signUp{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}</style> `),
          e.event.closeFomo,
          e.state.signed ? "amfm__hide" : "",
          Z(s.title),
          e.event.handleSignUp,
          s.btn_text,
          e.state.signed ? "" : "amfm__hide",
          Z(s.congrats),
          Z(s.coupon_title),
          s.bg_color,
          s.btn_color
        ))
      );
      var e, s;
    }
  }
);
