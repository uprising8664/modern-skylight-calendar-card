const t$3 = globalThis, e$3 = t$3.ShadowRoot && (void 0 === t$3.ShadyCSS || t$3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$3 = /* @__PURE__ */ Symbol(), o$5 = /* @__PURE__ */ new WeakMap();
let n$4 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$3 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$5.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$5.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$4("string" == typeof t2 ? t2 : t2 + "", void 0, s$3), i$6 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$4(o2, t2, s$3);
}, S$1 = (s2, o2) => {
  if (e$3) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$3.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$3 = e$3 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
const { is: i$5, defineProperty: e$2, getOwnPropertyDescriptor: h$2, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$4, getPrototypeOf: n$3 } = Object, a$1 = globalThis, c$2 = a$1.trustedTypes, l$1 = c$2 ? c$2.emptyScript : "", p$2 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$3 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i4 = t2;
  switch (s2) {
    case Boolean:
      i4 = null !== t2;
      break;
    case Number:
      i4 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i4 = JSON.parse(t2);
      } catch (t3) {
        i4 = null;
      }
  }
  return i4;
} }, f$1 = (t2, s2) => !i$5(t2, s2), b$1 = { attribute: true, type: String, converter: u$3, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i4 = /* @__PURE__ */ Symbol(), h2 = this.getPropertyDescriptor(t2, i4, s2);
      void 0 !== h2 && e$2(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i4) {
    const { get: e2, set: r2 } = h$2(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2?.call(this);
      r2?.call(this, s3), this.requestUpdate(t2, h2, i4);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$3(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$3(t3), ...o$4(t3)];
      for (const i4 of s2) this.createProperty(i4, t3[i4]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i4] of s2) this.elementProperties.set(t3, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i4 = this._$Eu(t3, s2);
      void 0 !== i4 && this._$Eh.set(i4, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i4 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i4.unshift(c$3(s3));
    } else void 0 !== s2 && i4.push(c$3(s2));
    return i4;
  }
  static _$Eu(t2, s2) {
    const i4 = s2.attribute;
    return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this));
  }
  addController(t2) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.();
  }
  removeController(t2) {
    this._$EO?.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i4 of s2.keys()) this.hasOwnProperty(i4) && (t2.set(i4, this[i4]), delete this[i4]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t2) => t2.hostConnected?.());
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t2) => t2.hostDisconnected?.());
  }
  attributeChangedCallback(t2, s2, i4) {
    this._$AK(t2, i4);
  }
  _$ET(t2, s2) {
    const i4 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i4);
    if (void 0 !== e2 && true === i4.reflect) {
      const h2 = (void 0 !== i4.converter?.toAttribute ? i4.converter : u$3).toAttribute(s2, i4.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    const i4 = this.constructor, e2 = i4._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i4.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== t3.converter?.fromAttribute ? t3.converter : u$3;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? this._$Ej?.get(e2) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i4, e2 = false, h2) {
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i4 ?? (i4 = r2.getPropertyOptions(t2)), !((i4.hasChanged ?? f$1)(h2, s2) || i4.useDefault && i4.reflect && h2 === this._$Ej?.get(t2) && !this.hasAttribute(r2._$Eu(t2, i4)))) return;
      this.C(t2, s2, i4);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i4, reflect: e2, wrapped: h2 }, r2) {
    i4 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i4 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i4] of t3) {
        const { wrapped: t4 } = i4, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i4, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), this._$EO?.forEach((t3) => t3.hostUpdate?.()), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    this._$EO?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t3) => this._$ET(t3, this[t3]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$2?.({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.2");
const t$2 = globalThis, i$4 = (t2) => t2, s$2 = t$2.trustedTypes, e$1 = s$2 ? s$2.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h$1 = "$lit$", o$3 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$2 = "?" + o$3, r$2 = `<${n$2}>`, l = document, c$1 = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u$2 = Array.isArray, d = (t2) => u$2(t2) || "function" == typeof t2?.[Symbol.iterator], f = "[ 	\n\f\r]", v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m$1 = />/g, p$1 = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i4, ...s2) => ({ _$litType$: t2, strings: i4, values: s2 }), b = x(1), E = /* @__PURE__ */ Symbol.for("lit-noChange"), A = /* @__PURE__ */ Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t2, i4) {
  if (!u$2(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e$1 ? e$1.createHTML(i4) : i4;
}
const N = (t2, i4) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i4 ? "<svg>" : 3 === i4 ? "<math>" : "", c2 = v$1;
  for (let i5 = 0; i5 < s2; i5++) {
    const s3 = t2[i5];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v$1 ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m$1 : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p$1) : void 0 !== u2[3] && (c2 = p$1) : c2 === p$1 ? ">" === u2[0] ? (c2 = n3 ?? v$1, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p$1 : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p$1 : c2 === _ || c2 === m$1 ? c2 = v$1 : (c2 = p$1, n3 = void 0);
    const x2 = c2 === p$1 && t2[i5 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v$1 ? s3 + r$2 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h$1 + s3.slice(d2) + o$3 + x2) : s3 + o$3 + (-2 === d2 ? i5 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i4 ? "</svg>" : 3 === i4 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i4 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i4);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i4 || 3 === i4) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h$1)) {
          const i5 = v2[a2++], s2 = r2.getAttribute(t3).split(o$3), e3 = /([.?@])?(.*)/.exec(i5);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$3) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$3), i5 = t3.length - 1;
          if (i5 > 0) {
            r2.textContent = s$2 ? s$2.emptyScript : "";
            for (let s2 = 0; s2 < i5; s2++) r2.append(t3[s2], c$1()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i5], c$1());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$2) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$3, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$3.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i4) {
    const s2 = l.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M$1(t2, i4, s2 = t2, e2) {
  if (i4 === E) return i4;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = a(i4) ? void 0 : i4._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i4 = M$1(t2, h2._$AS(t2, i4.values), h2, e2)), i4;
}
class R {
  constructor(t2, i4) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i4;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i4 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? l).importNode(i4, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i5;
        2 === r2.type ? i5 = new k(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i5 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i5 = new Z(h2, this, t2)), this._$AV.push(i5), r2 = s2[++n3];
      }
      o2 !== r2?.index && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e2;
  }
  p(t2) {
    let i4 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i4), i4 += s2.strings.length - 2) : s2._$AI(t2[i4])), i4++;
  }
}
class k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i4, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i4, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i4 = this._$AM;
    return void 0 !== i4 && 11 === t2?.nodeType && (t2 = i4.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i4 = this) {
    t2 = M$1(this, t2, i4), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: i4, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2) this._$AH.p(i4);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i4), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i4 = C.get(t2.strings);
    return void 0 === i4 && C.set(t2.strings, i4 = new S(t2)), i4;
  }
  k(t2) {
    u$2(this._$AH) || (this._$AH = [], this._$AR());
    const i4 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i4.length ? i4.push(s2 = new k(this.O(c$1()), this.O(c$1()), this, this.options)) : s2 = i4[e2], s2._$AI(h2), e2++;
    e2 < i4.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i4.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    for (this._$AP?.(false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$4(t2).nextSibling;
      i$4(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i4, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i4, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i4 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M$1(this, t2, i4, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M$1(this, e3[s2 + n3], i4, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a(r2) || r2 !== this._$AH[n3]), r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z extends H {
  constructor(t2, i4, s2, e2, h2) {
    super(t2, i4, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i4 = this) {
    if ((t2 = M$1(this, t2, i4, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i4, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M$1(this, t2);
  }
}
const j = { I: k }, B = t$2.litHtmlPolyfillSupport;
B?.(S, k), (t$2.litHtmlVersions ?? (t$2.litHtmlVersions = [])).push("3.3.2");
const D = (t2, i4, s2) => {
  const e2 = s2?.renderBefore ?? i4;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new k(i4.insertBefore(c$1(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
const s$1 = globalThis;
let i$3 = class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a;
    const t2 = super.createRenderRoot();
    return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i$3._$litElement$ = true, i$3["finalized"] = true, s$1.litElementHydrateSupport?.({ LitElement: i$3 });
const o$2 = s$1.litElementPolyfillSupport;
o$2?.({ LitElement: i$3 });
(s$1.litElementVersions ?? (s$1.litElementVersions = [])).push("4.2.2");
const o$1 = { attribute: true, type: String, converter: u$3, reflect: false, hasChanged: f$1 }, r$1 = (t2 = o$1, e2, r2) => {
  const { kind: n3, metadata: i4 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i4);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i4, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n$1(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
function r(r2) {
  return n$1({ ...r2, state: true, attribute: false });
}
const baseStyles = i$6`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :host {
    display: block;
    width: 100%;
    height: 100%;
    /* Surfaces */
    --msc-bg:           #0f0f13;
    --msc-surface:      #1a1a24;
    --msc-surface-2:    #22222f;
    --msc-surface-3:    #2a2a3a;
    --msc-border:       rgba(255,255,255,0.07);

    /* Text */
    --msc-text-primary:   #f0f0ff;
    --msc-text-secondary: rgba(240,240,255,0.55);
    --msc-text-disabled:  rgba(240,240,255,0.25);

    /* Neon accents */
    --msc-cyan:    #00e5ff;
    --msc-pink:    #ff4081;
    --msc-lime:    #c6ff00;
    --msc-orange:  #ff9100;
    --msc-purple:  #d500f9;
    --msc-green:   #00e676;
    --msc-yellow:  #ffea00;
    --msc-blue:    #2979ff;

    /* Accent (primary interactive) */
    --msc-accent:        var(--msc-cyan);
    --msc-accent-glow:   rgba(0,229,255,0.18);
    --msc-accent-dim:    rgba(0,229,255,0.10);

    /* Today highlight */
    --msc-today-bg:      rgba(0,229,255,0.12);
    --msc-today-border:  var(--msc-cyan);

    /* Radii */
    --msc-radius-sm:  6px;
    --msc-radius-md:  12px;
    --msc-radius-lg:  18px;
    --msc-radius-xl:  28px;

    /* Shadows */
    --msc-shadow-sm:  0 2px 8px rgba(0,0,0,0.4);
    --msc-shadow-md:  0 4px 20px rgba(0,0,0,0.6);
    --msc-shadow-glow: 0 0 16px var(--msc-accent-glow);

    /* Transitions */
    --msc-transition: 160ms cubic-bezier(0.4,0,0.2,1);
    --msc-transition-slow: 280ms cubic-bezier(0.4,0,0.2,1);

    /* Typography */
    --msc-font: -apple-system, 'Inter', 'Segoe UI', system-ui, sans-serif;
    --msc-font-size-xs:  10px;
    --msc-font-size-sm:  12px;
    --msc-font-size-md:  13px;
    --msc-font-size-lg:  15px;
    --msc-font-size-xl:  20px;
    --msc-font-size-2xl: 26px;

    display: block;
    font-family: var(--msc-font);
  }

  /* ── Root card wrapper ─────────────────────────────────────────────────── */
  .card {
    background: var(--msc-bg);
    border: 1px solid var(--msc-border);
    border-radius: var(--msc-radius-lg);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: var(--msc-shadow-md);
    height: 100%;
    min-height: 420px;
    color: var(--msc-text-primary);
    position: relative;
  }

  /* ── Header ────────────────────────────────────────────────────────────── */
  .header {
    background: var(--msc-surface);
    border-bottom: 1px solid var(--msc-border);
    padding: 12px 16px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
  }

  .header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .header-title {
    font-size: var(--msc-font-size-xl);
    font-weight: 700;
    color: var(--msc-text-primary);
    letter-spacing: -0.3px;
    margin: 0;
    flex: 1;
  }

  .header-period {
    font-size: var(--msc-font-size-lg);
    font-weight: 600;
    color: var(--msc-accent);
    letter-spacing: -0.2px;
    cursor: pointer;
    transition: opacity var(--msc-transition);
  }
  .header-period:hover { opacity: 0.8; }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .header-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  /* ── Pill button (nav, view switcher) ──────────────────────────────────── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border: none;
    background: var(--msc-surface-2);
    color: var(--msc-text-primary);
    border-radius: var(--msc-radius-xl);
    cursor: pointer;
    font-family: var(--msc-font);
    font-size: var(--msc-font-size-sm);
    font-weight: 500;
    transition: background var(--msc-transition), color var(--msc-transition), box-shadow var(--msc-transition);
    white-space: nowrap;
    padding: 6px 12px;
    height: 32px;
  }
  .btn:hover {
    background: var(--msc-surface-3);
  }
  .btn.active {
    background: var(--msc-accent-dim);
    color: var(--msc-accent);
    box-shadow: inset 0 0 0 1px var(--msc-accent);
  }
  .btn.icon-only {
    width: 32px;
    padding: 0;
  }
  .btn.btn-primary {
    background: var(--msc-accent);
    color: #000;
    font-weight: 700;
  }
  .btn.btn-primary:hover {
    box-shadow: var(--msc-shadow-glow);
  }

  /* ── View switcher group ────────────────────────────────────────────────── */
  .view-switcher {
    display: flex;
    background: var(--msc-surface-2);
    border-radius: var(--msc-radius-xl);
    padding: 3px;
    gap: 2px;
  }
  .view-switcher .btn {
    background: transparent;
    border-radius: var(--msc-radius-xl);
    font-size: var(--msc-font-size-sm);
    height: 26px;
    padding: 0 10px;
  }
  .view-switcher .btn.active {
    background: var(--msc-accent);
    color: #000;
    font-weight: 700;
    box-shadow: none;
  }

  /* ── Calendar badges/toggles ───────────────────────────────────────────── */
  .calendar-badges {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .calendar-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: var(--msc-radius-xl);
    font-size: var(--msc-font-size-sm);
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all var(--msc-transition);
    color: var(--msc-text-primary);
    background: var(--msc-surface-2);
    user-select: none;
  }
  .calendar-badge:hover {
    background: var(--msc-surface-3);
  }
  .calendar-badge.active {
    border-color: var(--badge-color, var(--msc-accent));
    background: color-mix(in srgb, var(--badge-color, var(--msc-accent)) 12%, transparent);
    color: var(--badge-color, var(--msc-accent));
  }
  .calendar-badge .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--badge-color, var(--msc-accent));
    flex-shrink: 0;
    transition: opacity var(--msc-transition);
  }
  .calendar-badge:not(.active) .dot {
    opacity: 0.3;
  }

  /* ── Navigation arrows ─────────────────────────────────────────────────── */
  .nav-group {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: var(--msc-surface-2);
    color: var(--msc-text-primary);
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    transition: background var(--msc-transition), color var(--msc-transition);
  }
  .nav-btn:hover {
    background: var(--msc-surface-3);
    color: var(--msc-accent);
  }
  .today-btn {
    height: 30px;
    padding: 0 12px;
    border-radius: var(--msc-radius-xl);
    border: 1px solid var(--msc-border);
    background: transparent;
    color: var(--msc-text-secondary);
    font-family: var(--msc-font);
    font-size: var(--msc-font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--msc-transition);
  }
  .today-btn:hover {
    border-color: var(--msc-accent);
    color: var(--msc-accent);
  }

  /* ── Calendar body ─────────────────────────────────────────────────────── */
  .calendar-body {
    flex: 1;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .calendar-body > :not(.loading-overlay) {
    flex: 1;
  }

  /* ── Day headers row ───────────────────────────────────────────────────── */
  .day-headers {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-bottom: 1px solid var(--msc-border);
    padding: 0 2px;
  }
  .day-header-cell {
    text-align: center;
    padding: 8px 0 6px;
    font-size: var(--msc-font-size-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--msc-text-secondary);
  }

  /* ── Month grid ────────────────────────────────────────────────────────── */
  .month-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(80px, 1fr);
    gap: 1px;
    background: var(--msc-border);
    flex: 1;
    overflow-y: auto;
  }

  .day-cell {
    background: var(--msc-bg);
    padding: 5px 6px;
    overflow: hidden;
    cursor: pointer;
    transition: background var(--msc-transition);
    position: relative;
    min-height: 80px;
  }
  .day-cell:hover {
    background: var(--msc-surface-2);
  }
  .day-cell.other-month {
    background: color-mix(in srgb, var(--msc-bg) 60%, transparent);
  }
  .day-cell.other-month .day-number {
    color: var(--msc-text-disabled);
  }
  .day-cell.today {
    background: var(--msc-today-bg);
  }
  .day-cell.today .day-number {
    color: var(--msc-accent);
    font-weight: 800;
  }
  .day-cell.selected {
    background: var(--msc-surface-2);
    box-shadow: inset 0 0 0 1.5px var(--msc-accent);
  }

  .day-number {
    font-size: var(--msc-font-size-sm);
    font-weight: 600;
    color: var(--msc-text-secondary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-bottom: 3px;
    transition: all var(--msc-transition);
  }
  .day-cell.today .day-number {
    background: var(--msc-accent);
    color: #000;
    font-weight: 800;
  }

  /* ── Event pill (month view) ───────────────────────────────────────────── */
  .event-pill {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 1px 5px;
    border-radius: 4px;
    font-size: var(--msc-font-size-xs);
    font-weight: 500;
    margin-bottom: 2px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: opacity var(--msc-transition), transform var(--msc-transition);
    color: #000;
    will-change: opacity, transform;
    animation: event-in var(--msc-transition-slow) ease both;
  }
  .event-pill:hover {
    filter: brightness(1.15);
    transform: translateY(-1px);
  }
  .event-pill.all-day {
    border-radius: 4px;
  }
  .event-pill.timed::before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(0,0,0,0.35);
    flex-shrink: 0;
  }
  .event-pill.removed {
    animation: event-out var(--msc-transition-slow) ease forwards;
  }

  .more-events-label {
    font-size: var(--msc-font-size-xs);
    color: var(--msc-text-secondary);
    cursor: pointer;
    padding: 1px 5px;
    border-radius: 4px;
    transition: background var(--msc-transition);
  }
  .more-events-label:hover {
    background: var(--msc-surface-2);
    color: var(--msc-accent);
  }

  /* ── Week view ─────────────────────────────────────────────────────────── */
  .week-grid {
    display: grid;
    grid-template-columns: 48px repeat(7, 1fr);
    height: 100%;
    overflow-y: auto;
    position: relative;
  }

  .week-time-gutter {
    grid-column: 1;
    position: sticky;
    left: 0;
    background: var(--msc-bg);
    z-index: 2;
    border-right: 1px solid var(--msc-border);
  }

  .week-time-label {
    height: 48px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 2px 8px 0 0;
    font-size: var(--msc-font-size-xs);
    color: var(--msc-text-disabled);
    font-weight: 500;
  }

  .week-day-column {
    border-right: 1px solid var(--msc-border);
    position: relative;
    min-height: 100%;
  }
  .week-day-column:last-child { border-right: none; }

  .week-day-header {
    position: sticky;
    top: 0;
    background: var(--msc-surface);
    border-bottom: 1px solid var(--msc-border);
    z-index: 1;
    text-align: center;
    padding: 8px 4px;
  }
  .week-day-name {
    font-size: var(--msc-font-size-xs);
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--msc-text-secondary);
  }
  .week-day-number {
    font-size: var(--msc-font-size-lg);
    font-weight: 700;
    color: var(--msc-text-primary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-top: 2px;
    transition: all var(--msc-transition);
  }
  .week-day-number.today {
    background: var(--msc-accent);
    color: #000;
  }

  .week-hour-row {
    height: 48px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--msc-border);
    position: relative;
  }
  .week-hour-row.half::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 1px dashed var(--msc-border);
    transform: translateY(24px);
  }

  .week-event {
    position: absolute;
    left: 2px;
    right: 2px;
    border-radius: var(--msc-radius-sm);
    padding: 2px 5px;
    font-size: var(--msc-font-size-xs);
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
    color: #000;
    transition: filter var(--msc-transition), transform var(--msc-transition), opacity var(--msc-transition);
    animation: event-in var(--msc-transition-slow) ease both;
    will-change: opacity, transform;
  }
  .week-event:hover {
    filter: brightness(1.15);
    z-index: 2;
  }
  .week-event.removed {
    animation: event-out var(--msc-transition-slow) ease forwards;
  }

  .now-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--msc-pink);
    z-index: 3;
    pointer-events: none;
  }
  .now-line::before {
    content: '';
    position: absolute;
    left: -4px;
    top: -4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--msc-pink);
    box-shadow: 0 0 8px var(--msc-pink);
  }

  /* ── List / Schedule view ──────────────────────────────────────────────── */
  .list-view {
    overflow-y: auto;
    height: 100%;
    padding: 8px 0;
  }

  .list-date-group {
    padding: 0 16px;
  }

  .list-date-heading {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 0 6px;
    position: sticky;
    top: 0;
    background: var(--msc-bg);
    z-index: 1;
  }
  .list-date-heading .date-num {
    font-size: var(--msc-font-size-2xl);
    font-weight: 800;
    color: var(--msc-text-primary);
    line-height: 1;
    min-width: 36px;
  }
  .list-date-heading .date-meta {
    display: flex;
    flex-direction: column;
  }
  .list-date-heading .date-weekday {
    font-size: var(--msc-font-size-sm);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--msc-accent);
  }
  .list-date-heading .date-month {
    font-size: var(--msc-font-size-sm);
    color: var(--msc-text-secondary);
  }
  .list-date-heading.today .date-num {
    color: var(--msc-accent);
  }
  .list-date-heading.today .date-weekday {
    color: var(--msc-accent);
  }

  .list-event {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 10px;
    border-radius: var(--msc-radius-md);
    cursor: pointer;
    transition: background var(--msc-transition), transform var(--msc-transition);
    margin-bottom: 3px;
    animation: event-in var(--msc-transition-slow) ease both;
    will-change: opacity, transform;
  }
  .list-event:hover {
    background: var(--msc-surface-2);
  }
  .list-event.removed {
    animation: event-out var(--msc-transition-slow) ease forwards;
  }

  .list-event-color-bar {
    width: 4px;
    border-radius: 2px;
    align-self: stretch;
    flex-shrink: 0;
    min-height: 28px;
  }

  .list-event-content {
    flex: 1;
    overflow: hidden;
  }
  .list-event-title {
    font-size: var(--msc-font-size-md);
    font-weight: 600;
    color: var(--msc-text-primary);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .list-event-meta {
    font-size: var(--msc-font-size-sm);
    color: var(--msc-text-secondary);
    margin-top: 2px;
  }

  .list-empty {
    text-align: center;
    padding: 32px 16px;
    color: var(--msc-text-disabled);
    font-size: var(--msc-font-size-md);
  }

  /* ── Loading / spinner ─────────────────────────────────────────────────── */
  .loading-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15,15,19,0.6);
    backdrop-filter: blur(4px);
    z-index: 10;
    pointer-events: none;
    transition: opacity var(--msc-transition-slow);
  }
  .loading-overlay.hidden {
    opacity: 0;
  }
  .spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--msc-surface-3);
    border-top-color: var(--msc-accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  /* ── Event dialog ──────────────────────────────────────────────────────── */
  .dialog-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(6px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fade-in var(--msc-transition) ease;
  }

  .dialog {
    background: var(--msc-surface);
    border: 1px solid var(--msc-border);
    border-radius: var(--msc-radius-lg);
    box-shadow: var(--msc-shadow-md);
    width: min(480px, calc(100vw - 32px));
    max-height: calc(100vh - 64px);
    overflow-y: auto;
    animation: dialog-in var(--msc-transition-slow) cubic-bezier(0.34,1.56,0.64,1);
  }

  .dialog-header {
    padding: 20px 20px 12px;
    border-bottom: 1px solid var(--msc-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dialog-title {
    font-size: var(--msc-font-size-lg);
    font-weight: 700;
    color: var(--msc-text-primary);
    margin: 0;
  }

  .dialog-body {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .dialog-footer {
    padding: 12px 20px 20px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    border-top: 1px solid var(--msc-border);
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .form-label {
    font-size: var(--msc-font-size-sm);
    font-weight: 600;
    color: var(--msc-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .form-input {
    background: var(--msc-surface-2);
    border: 1px solid var(--msc-border);
    border-radius: var(--msc-radius-sm);
    color: var(--msc-text-primary);
    font-family: var(--msc-font);
    font-size: var(--msc-font-size-md);
    padding: 8px 12px;
    transition: border-color var(--msc-transition);
    width: 100%;
    box-sizing: border-box;
  }
  .form-input:focus {
    outline: none;
    border-color: var(--msc-accent);
    box-shadow: 0 0 0 3px var(--msc-accent-glow);
  }
  .form-input option {
    background: var(--msc-surface-2);
  }

  /* ── Animations ────────────────────────────────────────────────────────── */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes event-in {
    from { opacity: 0; transform: translateY(4px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes event-out {
    from { opacity: 1; transform: scale(1); max-height: 40px; margin-bottom: 2px; }
    to   { opacity: 0; transform: scale(0.9); max-height: 0; margin-bottom: 0; overflow: hidden; }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes dialog-in {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── Scrollbar styling ─────────────────────────────────────────────────── */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--msc-surface-3); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--msc-text-disabled); }
`;
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var dayjs_min$1 = { exports: {} };
var dayjs_min = dayjs_min$1.exports;
var hasRequiredDayjs_min;
function requireDayjs_min() {
  if (hasRequiredDayjs_min) return dayjs_min$1.exports;
  hasRequiredDayjs_min = 1;
  (function(module, exports$1) {
    !(function(t2, e2) {
      module.exports = e2();
    })(dayjs_min, (function() {
      var t2 = 1e3, e2 = 6e4, n3 = 36e5, r2 = "millisecond", i4 = "second", s2 = "minute", u2 = "hour", a2 = "day", o2 = "week", c2 = "month", f2 = "quarter", h2 = "year", d2 = "date", l2 = "Invalid Date", $2 = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y3 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M2 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
        var e3 = ["th", "st", "nd", "rd"], n4 = t3 % 100;
        return "[" + t3 + (e3[(n4 - 20) % 10] || e3[n4] || e3[0]) + "]";
      } }, m2 = function(t3, e3, n4) {
        var r3 = String(t3);
        return !r3 || r3.length >= e3 ? t3 : "" + Array(e3 + 1 - r3.length).join(n4) + t3;
      }, v2 = { s: m2, z: function(t3) {
        var e3 = -t3.utcOffset(), n4 = Math.abs(e3), r3 = Math.floor(n4 / 60), i5 = n4 % 60;
        return (e3 <= 0 ? "+" : "-") + m2(r3, 2, "0") + ":" + m2(i5, 2, "0");
      }, m: function t3(e3, n4) {
        if (e3.date() < n4.date()) return -t3(n4, e3);
        var r3 = 12 * (n4.year() - e3.year()) + (n4.month() - e3.month()), i5 = e3.clone().add(r3, c2), s3 = n4 - i5 < 0, u3 = e3.clone().add(r3 + (s3 ? -1 : 1), c2);
        return +(-(r3 + (n4 - i5) / (s3 ? i5 - u3 : u3 - i5)) || 0);
      }, a: function(t3) {
        return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
      }, p: function(t3) {
        return { M: c2, y: h2, w: o2, d: a2, D: d2, h: u2, m: s2, s: i4, ms: r2, Q: f2 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t3) {
        return void 0 === t3;
      } }, g2 = "en", D2 = {};
      D2[g2] = M2;
      var p2 = "$isDayjsObject", S2 = function(t3) {
        return t3 instanceof _2 || !(!t3 || !t3[p2]);
      }, w = function t3(e3, n4, r3) {
        var i5;
        if (!e3) return g2;
        if ("string" == typeof e3) {
          var s3 = e3.toLowerCase();
          D2[s3] && (i5 = s3), n4 && (D2[s3] = n4, i5 = s3);
          var u3 = e3.split("-");
          if (!i5 && u3.length > 1) return t3(u3[0]);
        } else {
          var a3 = e3.name;
          D2[a3] = e3, i5 = a3;
        }
        return !r3 && i5 && (g2 = i5), i5 || !r3 && g2;
      }, O = function(t3, e3) {
        if (S2(t3)) return t3.clone();
        var n4 = "object" == typeof e3 ? e3 : {};
        return n4.date = t3, n4.args = arguments, new _2(n4);
      }, b2 = v2;
      b2.l = w, b2.i = S2, b2.w = function(t3, e3) {
        return O(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
      };
      var _2 = (function() {
        function M3(t3) {
          this.$L = w(t3.locale, null, true), this.parse(t3), this.$x = this.$x || t3.x || {}, this[p2] = true;
        }
        var m3 = M3.prototype;
        return m3.parse = function(t3) {
          this.$d = (function(t4) {
            var e3 = t4.date, n4 = t4.utc;
            if (null === e3) return /* @__PURE__ */ new Date(NaN);
            if (b2.u(e3)) return /* @__PURE__ */ new Date();
            if (e3 instanceof Date) return new Date(e3);
            if ("string" == typeof e3 && !/Z$/i.test(e3)) {
              var r3 = e3.match($2);
              if (r3) {
                var i5 = r3[2] - 1 || 0, s3 = (r3[7] || "0").substring(0, 3);
                return n4 ? new Date(Date.UTC(r3[1], i5, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3)) : new Date(r3[1], i5, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3);
              }
            }
            return new Date(e3);
          })(t3), this.init();
        }, m3.init = function() {
          var t3 = this.$d;
          this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
        }, m3.$utils = function() {
          return b2;
        }, m3.isValid = function() {
          return !(this.$d.toString() === l2);
        }, m3.isSame = function(t3, e3) {
          var n4 = O(t3);
          return this.startOf(e3) <= n4 && n4 <= this.endOf(e3);
        }, m3.isAfter = function(t3, e3) {
          return O(t3) < this.startOf(e3);
        }, m3.isBefore = function(t3, e3) {
          return this.endOf(e3) < O(t3);
        }, m3.$g = function(t3, e3, n4) {
          return b2.u(t3) ? this[e3] : this.set(n4, t3);
        }, m3.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m3.valueOf = function() {
          return this.$d.getTime();
        }, m3.startOf = function(t3, e3) {
          var n4 = this, r3 = !!b2.u(e3) || e3, f3 = b2.p(t3), l3 = function(t4, e4) {
            var i5 = b2.w(n4.$u ? Date.UTC(n4.$y, e4, t4) : new Date(n4.$y, e4, t4), n4);
            return r3 ? i5 : i5.endOf(a2);
          }, $3 = function(t4, e4) {
            return b2.w(n4.toDate()[t4].apply(n4.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n4);
          }, y4 = this.$W, M4 = this.$M, m4 = this.$D, v3 = "set" + (this.$u ? "UTC" : "");
          switch (f3) {
            case h2:
              return r3 ? l3(1, 0) : l3(31, 11);
            case c2:
              return r3 ? l3(1, M4) : l3(0, M4 + 1);
            case o2:
              var g3 = this.$locale().weekStart || 0, D3 = (y4 < g3 ? y4 + 7 : y4) - g3;
              return l3(r3 ? m4 - D3 : m4 + (6 - D3), M4);
            case a2:
            case d2:
              return $3(v3 + "Hours", 0);
            case u2:
              return $3(v3 + "Minutes", 1);
            case s2:
              return $3(v3 + "Seconds", 2);
            case i4:
              return $3(v3 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m3.endOf = function(t3) {
          return this.startOf(t3, false);
        }, m3.$set = function(t3, e3) {
          var n4, o3 = b2.p(t3), f3 = "set" + (this.$u ? "UTC" : ""), l3 = (n4 = {}, n4[a2] = f3 + "Date", n4[d2] = f3 + "Date", n4[c2] = f3 + "Month", n4[h2] = f3 + "FullYear", n4[u2] = f3 + "Hours", n4[s2] = f3 + "Minutes", n4[i4] = f3 + "Seconds", n4[r2] = f3 + "Milliseconds", n4)[o3], $3 = o3 === a2 ? this.$D + (e3 - this.$W) : e3;
          if (o3 === c2 || o3 === h2) {
            var y4 = this.clone().set(d2, 1);
            y4.$d[l3]($3), y4.init(), this.$d = y4.set(d2, Math.min(this.$D, y4.daysInMonth())).$d;
          } else l3 && this.$d[l3]($3);
          return this.init(), this;
        }, m3.set = function(t3, e3) {
          return this.clone().$set(t3, e3);
        }, m3.get = function(t3) {
          return this[b2.p(t3)]();
        }, m3.add = function(r3, f3) {
          var d3, l3 = this;
          r3 = Number(r3);
          var $3 = b2.p(f3), y4 = function(t3) {
            var e3 = O(l3);
            return b2.w(e3.date(e3.date() + Math.round(t3 * r3)), l3);
          };
          if ($3 === c2) return this.set(c2, this.$M + r3);
          if ($3 === h2) return this.set(h2, this.$y + r3);
          if ($3 === a2) return y4(1);
          if ($3 === o2) return y4(7);
          var M4 = (d3 = {}, d3[s2] = e2, d3[u2] = n3, d3[i4] = t2, d3)[$3] || 1, m4 = this.$d.getTime() + r3 * M4;
          return b2.w(m4, this);
        }, m3.subtract = function(t3, e3) {
          return this.add(-1 * t3, e3);
        }, m3.format = function(t3) {
          var e3 = this, n4 = this.$locale();
          if (!this.isValid()) return n4.invalidDate || l2;
          var r3 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i5 = b2.z(this), s3 = this.$H, u3 = this.$m, a3 = this.$M, o3 = n4.weekdays, c3 = n4.months, f3 = n4.meridiem, h3 = function(t4, n5, i6, s4) {
            return t4 && (t4[n5] || t4(e3, r3)) || i6[n5].slice(0, s4);
          }, d3 = function(t4) {
            return b2.s(s3 % 12 || 12, t4, "0");
          }, $3 = f3 || function(t4, e4, n5) {
            var r4 = t4 < 12 ? "AM" : "PM";
            return n5 ? r4.toLowerCase() : r4;
          };
          return r3.replace(y3, (function(t4, r4) {
            return r4 || (function(t5) {
              switch (t5) {
                case "YY":
                  return String(e3.$y).slice(-2);
                case "YYYY":
                  return b2.s(e3.$y, 4, "0");
                case "M":
                  return a3 + 1;
                case "MM":
                  return b2.s(a3 + 1, 2, "0");
                case "MMM":
                  return h3(n4.monthsShort, a3, c3, 3);
                case "MMMM":
                  return h3(c3, a3);
                case "D":
                  return e3.$D;
                case "DD":
                  return b2.s(e3.$D, 2, "0");
                case "d":
                  return String(e3.$W);
                case "dd":
                  return h3(n4.weekdaysMin, e3.$W, o3, 2);
                case "ddd":
                  return h3(n4.weekdaysShort, e3.$W, o3, 3);
                case "dddd":
                  return o3[e3.$W];
                case "H":
                  return String(s3);
                case "HH":
                  return b2.s(s3, 2, "0");
                case "h":
                  return d3(1);
                case "hh":
                  return d3(2);
                case "a":
                  return $3(s3, u3, true);
                case "A":
                  return $3(s3, u3, false);
                case "m":
                  return String(u3);
                case "mm":
                  return b2.s(u3, 2, "0");
                case "s":
                  return String(e3.$s);
                case "ss":
                  return b2.s(e3.$s, 2, "0");
                case "SSS":
                  return b2.s(e3.$ms, 3, "0");
                case "Z":
                  return i5;
              }
              return null;
            })(t4) || i5.replace(":", "");
          }));
        }, m3.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m3.diff = function(r3, d3, l3) {
          var $3, y4 = this, M4 = b2.p(d3), m4 = O(r3), v3 = (m4.utcOffset() - this.utcOffset()) * e2, g3 = this - m4, D3 = function() {
            return b2.m(y4, m4);
          };
          switch (M4) {
            case h2:
              $3 = D3() / 12;
              break;
            case c2:
              $3 = D3();
              break;
            case f2:
              $3 = D3() / 3;
              break;
            case o2:
              $3 = (g3 - v3) / 6048e5;
              break;
            case a2:
              $3 = (g3 - v3) / 864e5;
              break;
            case u2:
              $3 = g3 / n3;
              break;
            case s2:
              $3 = g3 / e2;
              break;
            case i4:
              $3 = g3 / t2;
              break;
            default:
              $3 = g3;
          }
          return l3 ? $3 : b2.a($3);
        }, m3.daysInMonth = function() {
          return this.endOf(c2).$D;
        }, m3.$locale = function() {
          return D2[this.$L];
        }, m3.locale = function(t3, e3) {
          if (!t3) return this.$L;
          var n4 = this.clone(), r3 = w(t3, e3, true);
          return r3 && (n4.$L = r3), n4;
        }, m3.clone = function() {
          return b2.w(this.$d, this);
        }, m3.toDate = function() {
          return new Date(this.valueOf());
        }, m3.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m3.toISOString = function() {
          return this.$d.toISOString();
        }, m3.toString = function() {
          return this.$d.toUTCString();
        }, M3;
      })(), k2 = _2.prototype;
      return O.prototype = k2, [["$ms", r2], ["$s", i4], ["$m", s2], ["$H", u2], ["$W", a2], ["$M", c2], ["$y", h2], ["$D", d2]].forEach((function(t3) {
        k2[t3[1]] = function(e3) {
          return this.$g(e3, t3[0], t3[1]);
        };
      })), O.extend = function(t3, e3) {
        return t3.$i || (t3(e3, _2, O), t3.$i = true), O;
      }, O.locale = w, O.isDayjs = S2, O.unix = function(t3) {
        return O(1e3 * t3);
      }, O.en = D2[g2], O.Ls = D2, O.p = {}, O;
    }));
  })(dayjs_min$1);
  return dayjs_min$1.exports;
}
var dayjs_minExports = requireDayjs_min();
const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
var isSameOrBefore$2 = { exports: {} };
var isSameOrBefore$1 = isSameOrBefore$2.exports;
var hasRequiredIsSameOrBefore;
function requireIsSameOrBefore() {
  if (hasRequiredIsSameOrBefore) return isSameOrBefore$2.exports;
  hasRequiredIsSameOrBefore = 1;
  (function(module, exports$1) {
    !(function(e2, i4) {
      module.exports = i4();
    })(isSameOrBefore$1, (function() {
      return function(e2, i4) {
        i4.prototype.isSameOrBefore = function(e3, i5) {
          return this.isSame(e3, i5) || this.isBefore(e3, i5);
        };
      };
    }));
  })(isSameOrBefore$2);
  return isSameOrBefore$2.exports;
}
var isSameOrBeforeExports = requireIsSameOrBefore();
const isSameOrBefore = /* @__PURE__ */ getDefaultExportFromCjs(isSameOrBeforeExports);
var isSameOrAfter$2 = { exports: {} };
var isSameOrAfter$1 = isSameOrAfter$2.exports;
var hasRequiredIsSameOrAfter;
function requireIsSameOrAfter() {
  if (hasRequiredIsSameOrAfter) return isSameOrAfter$2.exports;
  hasRequiredIsSameOrAfter = 1;
  (function(module, exports$1) {
    !(function(e2, t2) {
      module.exports = t2();
    })(isSameOrAfter$1, (function() {
      return function(e2, t2) {
        t2.prototype.isSameOrAfter = function(e3, t3) {
          return this.isSame(e3, t3) || this.isAfter(e3, t3);
        };
      };
    }));
  })(isSameOrAfter$2);
  return isSameOrAfter$2.exports;
}
var isSameOrAfterExports = requireIsSameOrAfter();
const isSameOrAfter = /* @__PURE__ */ getDefaultExportFromCjs(isSameOrAfterExports);
var isBetween$2 = { exports: {} };
var isBetween$1 = isBetween$2.exports;
var hasRequiredIsBetween;
function requireIsBetween() {
  if (hasRequiredIsBetween) return isBetween$2.exports;
  hasRequiredIsBetween = 1;
  (function(module, exports$1) {
    !(function(e2, i4) {
      module.exports = i4();
    })(isBetween$1, (function() {
      return function(e2, i4, t2) {
        i4.prototype.isBetween = function(e3, i5, s2, f2) {
          var n3 = t2(e3), o2 = t2(i5), r2 = "(" === (f2 = f2 || "()")[0], u2 = ")" === f2[1];
          return (r2 ? this.isAfter(n3, s2) : !this.isBefore(n3, s2)) && (u2 ? this.isBefore(o2, s2) : !this.isAfter(o2, s2)) || (r2 ? this.isBefore(n3, s2) : !this.isAfter(n3, s2)) && (u2 ? this.isAfter(o2, s2) : !this.isBefore(o2, s2));
        };
      };
    }));
  })(isBetween$2);
  return isBetween$2.exports;
}
var isBetweenExports = requireIsBetween();
const isBetween = /* @__PURE__ */ getDefaultExportFromCjs(isBetweenExports);
var weekOfYear$2 = { exports: {} };
var weekOfYear$1 = weekOfYear$2.exports;
var hasRequiredWeekOfYear;
function requireWeekOfYear() {
  if (hasRequiredWeekOfYear) return weekOfYear$2.exports;
  hasRequiredWeekOfYear = 1;
  (function(module, exports$1) {
    !(function(e2, t2) {
      module.exports = t2();
    })(weekOfYear$1, (function() {
      var e2 = "week", t2 = "year";
      return function(i4, n3, r2) {
        var f2 = n3.prototype;
        f2.week = function(i5) {
          if (void 0 === i5 && (i5 = null), null !== i5) return this.add(7 * (i5 - this.week()), "day");
          var n4 = this.$locale().yearStart || 1;
          if (11 === this.month() && this.date() > 25) {
            var f3 = r2(this).startOf(t2).add(1, t2).date(n4), s2 = r2(this).endOf(e2);
            if (f3.isBefore(s2)) return 1;
          }
          var a2 = r2(this).startOf(t2).date(n4).startOf(e2).subtract(1, "millisecond"), o2 = this.diff(a2, e2, true);
          return o2 < 0 ? r2(this).startOf("week").week() : Math.ceil(o2);
        }, f2.weeks = function(e3) {
          return void 0 === e3 && (e3 = null), this.week(e3);
        };
      };
    }));
  })(weekOfYear$2);
  return weekOfYear$2.exports;
}
var weekOfYearExports = requireWeekOfYear();
const weekOfYear = /* @__PURE__ */ getDefaultExportFromCjs(weekOfYearExports);
var localeData$2 = { exports: {} };
var localeData$1 = localeData$2.exports;
var hasRequiredLocaleData;
function requireLocaleData() {
  if (hasRequiredLocaleData) return localeData$2.exports;
  hasRequiredLocaleData = 1;
  (function(module, exports$1) {
    !(function(n3, e2) {
      module.exports = e2();
    })(localeData$1, (function() {
      return function(n3, e2, t2) {
        var r2 = e2.prototype, o2 = function(n4) {
          return n4 && (n4.indexOf ? n4 : n4.s);
        }, u2 = function(n4, e3, t3, r3, u3) {
          var i5 = n4.name ? n4 : n4.$locale(), a3 = o2(i5[e3]), s3 = o2(i5[t3]), f2 = a3 || s3.map((function(n5) {
            return n5.slice(0, r3);
          }));
          if (!u3) return f2;
          var d2 = i5.weekStart;
          return f2.map((function(n5, e4) {
            return f2[(e4 + (d2 || 0)) % 7];
          }));
        }, i4 = function() {
          return t2.Ls[t2.locale()];
        }, a2 = function(n4, e3) {
          return n4.formats[e3] || (function(n5) {
            return n5.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(n6, e4, t3) {
              return e4 || t3.slice(1);
            }));
          })(n4.formats[e3.toUpperCase()]);
        }, s2 = function() {
          var n4 = this;
          return { months: function(e3) {
            return e3 ? e3.format("MMMM") : u2(n4, "months");
          }, monthsShort: function(e3) {
            return e3 ? e3.format("MMM") : u2(n4, "monthsShort", "months", 3);
          }, firstDayOfWeek: function() {
            return n4.$locale().weekStart || 0;
          }, weekdays: function(e3) {
            return e3 ? e3.format("dddd") : u2(n4, "weekdays");
          }, weekdaysMin: function(e3) {
            return e3 ? e3.format("dd") : u2(n4, "weekdaysMin", "weekdays", 2);
          }, weekdaysShort: function(e3) {
            return e3 ? e3.format("ddd") : u2(n4, "weekdaysShort", "weekdays", 3);
          }, longDateFormat: function(e3) {
            return a2(n4.$locale(), e3);
          }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
        };
        r2.localeData = function() {
          return s2.bind(this)();
        }, t2.localeData = function() {
          var n4 = i4();
          return { firstDayOfWeek: function() {
            return n4.weekStart || 0;
          }, weekdays: function() {
            return t2.weekdays();
          }, weekdaysShort: function() {
            return t2.weekdaysShort();
          }, weekdaysMin: function() {
            return t2.weekdaysMin();
          }, months: function() {
            return t2.months();
          }, monthsShort: function() {
            return t2.monthsShort();
          }, longDateFormat: function(e3) {
            return a2(n4, e3);
          }, meridiem: n4.meridiem, ordinal: n4.ordinal };
        }, t2.months = function() {
          return u2(i4(), "months");
        }, t2.monthsShort = function() {
          return u2(i4(), "monthsShort", "months", 3);
        }, t2.weekdays = function(n4) {
          return u2(i4(), "weekdays", null, null, n4);
        }, t2.weekdaysShort = function(n4) {
          return u2(i4(), "weekdaysShort", "weekdays", 3, n4);
        }, t2.weekdaysMin = function(n4) {
          return u2(i4(), "weekdaysMin", "weekdays", 2, n4);
        };
      };
    }));
  })(localeData$2);
  return localeData$2.exports;
}
var localeDataExports = requireLocaleData();
const localeData = /* @__PURE__ */ getDefaultExportFromCjs(localeDataExports);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);
dayjs.extend(localeData);
function getEventStart(event) {
  const v2 = event.start.dateTime || event.start.date;
  return dayjs(v2);
}
function getEventEnd(event) {
  const v2 = event.end.dateTime || event.end.date;
  return dayjs(v2);
}
function isAllDay(event) {
  return !event.start.dateTime;
}
function formatTime(dt, use24h = false) {
  return dt.format(use24h ? "HH:mm" : "h:mm A");
}
function formatDateRange(start, end) {
  if (start.isSame(end, "day")) {
    return start.format("MMM D");
  }
  if (start.isSame(end, "month")) {
    return `${start.format("MMM D")}–${end.format("D")}`;
  }
  return `${start.format("MMM D")} – ${end.format("MMM D")}`;
}
function chunkDateRange(start, end, chunkDays = 30) {
  const chunks = [];
  let cursor = start;
  while (cursor.isBefore(end)) {
    const chunkEnd = cursor.add(chunkDays, "day").isAfter(end) ? end : cursor.add(chunkDays, "day");
    chunks.push({ start: cursor, end: chunkEnd });
    cursor = chunkEnd;
  }
  return chunks;
}
function getFetchRange(currentDate, view) {
  if (view === "month") {
    return {
      start: currentDate.startOf("month").subtract(7, "day"),
      end: currentDate.endOf("month").add(14, "day")
    };
  }
  if (view === "week") {
    return {
      start: currentDate.startOf("week").subtract(1, "day"),
      end: currentDate.endOf("week").add(1, "day")
    };
  }
  return {
    start: currentDate.subtract(1, "day"),
    end: currentDate.add(90, "day")
  };
}
const NEON_PALETTE = [
  "#00e5ff",
  // cyan
  "#ff4081",
  // pink
  "#c6ff00",
  // lime
  "#ff9100",
  // orange
  "#d500f9",
  // purple
  "#00e676",
  // green
  "#ffea00",
  // yellow
  "#2979ff"
  // blue
];
function getDefaultColor(index) {
  return NEON_PALETTE[index % NEON_PALETTE.length];
}
function getEventKey(entityId, event) {
  const start = event.start.dateTime || event.start.date || "";
  const end = event.end.dateTime || event.end.date || "";
  return `${entityId}|${event.uid || ""}|${event.recurring_event_id || ""}|${start}|${end}|${event.summary || ""}`;
}
function loadPreference(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function savePreference(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}
class CalendarStore {
  constructor() {
    this._hass = null;
    this._config = null;
    this._events = [];
    this._loadedRange = null;
    this._fetching = false;
    this._pollTimer = null;
    this._haEventUnsub = null;
    this._listeners = /* @__PURE__ */ new Set();
    this._currentDate = dayjs();
    this._view = "month";
  }
  // ── Public API ────────────────────────────────────────────────────────────
  get events() {
    return this._events;
  }
  get fetching() {
    return this._fetching;
  }
  setHass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first && this._config) {
      this._subscribeHaEvent();
      this._startPolling();
      this.fetchFull();
    }
  }
  setConfig(config) {
    this._config = config;
    this._view = config.view || "month";
    this._loadedRange = null;
  }
  setView(view, currentDate) {
    this._view = view;
    this._currentDate = currentDate;
    this._loadedRange = null;
    this.fetchFull();
  }
  navigate(currentDate) {
    this._currentDate = currentDate;
    const range = getFetchRange(currentDate, this._view);
    const needed = !this._loadedRange || range.start.isBefore(this._loadedRange.startDate) || range.end.isAfter(this._loadedRange.endDate);
    if (needed) this.fetchFull();
  }
  subscribe(fn) {
    this._listeners.add(fn);
  }
  unsubscribe(fn) {
    this._listeners.delete(fn);
  }
  destroy() {
    this._stopPolling();
    this._unsubscribeHaEvent();
    this._listeners.clear();
  }
  // ── Fetch: full range ─────────────────────────────────────────────────────
  async fetchFull() {
    if (!this._hass || !this._config || this._fetching) return;
    const range = getFetchRange(this._currentDate, this._view);
    this._fetching = true;
    this._notify();
    try {
      const entities = this._resolveEntities();
      const fresh = await this._fetchEntities(entities, range.start.toDate(), range.end.toDate());
      fresh.sort((a2, b2) => this._sortKey(a2) - this._sortKey(b2));
      this._events = this._limit(fresh);
      this._loadedRange = { startDate: range.start.toDate(), endDate: range.end.toDate() };
    } catch (e2) {
      console.error("[modern-skylight-calendar-card] fetchFull error:", e2);
    } finally {
      this._fetching = false;
      this._notify();
    }
  }
  // ── Fetch: surgical per-entity (webhook / event-driven) ───────────────────
  // Only re-fetches the named entities, splices them into _events in-place.
  // Other entities untouched → their event elements keep their DOM nodes.
  async refreshEntities(entityIds) {
    if (!this._hass || !this._config) return;
    if (!this._loadedRange) {
      return this.fetchFull();
    }
    if (this._fetching) return;
    const range = this._loadedRange;
    const allEntities = this._resolveEntities();
    const targets = entityIds ? allEntities.filter((e2) => entityIds.includes(e2.entityId)) : allEntities;
    this._fetching = true;
    this._notify();
    try {
      const fresh = await this._fetchEntities(targets, range.startDate, range.endDate);
      const targetSet = new Set(targets.map((e2) => e2.entityId));
      const retained = this._events.filter((e2) => !targetSet.has(e2.entityId));
      const merged = [...retained, ...fresh];
      merged.sort((a2, b2) => this._sortKey(a2) - this._sortKey(b2));
      this._events = this._limit(merged);
    } catch (e2) {
      console.error("[modern-skylight-calendar-card] refreshEntities error:", e2);
    } finally {
      this._fetching = false;
      this._notify();
    }
  }
  // ── Internal: entity resolution ───────────────────────────────────────────
  _resolveEntities() {
    if (!this._config) return [];
    const { entities, colors = {}, calendar_names = {}, readonly_calendars = [] } = this._config;
    return entities.map((e2, i4) => {
      const entityId = typeof e2 === "string" ? e2 : e2.entity;
      const customColor = typeof e2 === "object" ? e2.color : void 0;
      const customName = typeof e2 === "object" ? e2.name : void 0;
      return {
        entityId,
        color: customColor || colors[entityId] || getDefaultColor(i4),
        name: customName || calendar_names[entityId] || entityId.split(".")[1]?.replace(/_/g, " ") || entityId,
        readonly: readonly_calendars.includes(entityId)
      };
    });
  }
  resolveEntities() {
    return this._resolveEntities();
  }
  // ── Internal: fetch logic ─────────────────────────────────────────────────
  async _fetchEntities(entities, start, end) {
    const chunks = chunkDateRange(dayjs(start), dayjs(end), 30);
    const results = await Promise.all(
      entities.map((entity) => this._fetchEntity(entity, chunks))
    );
    return results.flat();
  }
  async _fetchEntity(entity, chunks) {
    const seen = /* @__PURE__ */ new Set();
    const allEvents = [];
    const chunkResults = await Promise.all(
      chunks.map((chunk) => this._fetchChunk(entity.entityId, chunk.start, chunk.end))
    );
    for (const events of chunkResults) {
      for (const raw of events) {
        const key = getEventKey(entity.entityId, raw);
        if (seen.has(key)) continue;
        seen.add(key);
        allEvents.push(this._normalizeEvent(raw, entity));
      }
    }
    return allEvents;
  }
  async _fetchChunk(entityId, start, end) {
    if (!this._hass) return [];
    try {
      return await this._hass.callWS({
        type: "calendar/event/list",
        entity_id: entityId,
        start_date_time: start.toISOString(),
        end_date_time: end.toISOString()
      });
    } catch {
      try {
        return await this._hass.callApi(
          "GET",
          `calendars/${entityId}?start=${start.format("YYYY-MM-DD")}T00:00:00Z&end=${end.format("YYYY-MM-DD")}T23:59:59Z`
        );
      } catch (e2) {
        console.error(`[modern-skylight-calendar-card] fetch failed for ${entityId}:`, e2);
        return [];
      }
    }
  }
  _normalizeEvent(raw, entity) {
    return {
      uid: raw.uid || `${entity.entityId}-${raw.start?.dateTime || raw.start?.date}-${raw.summary}`,
      summary: raw.summary || "Untitled",
      description: raw.description,
      location: raw.location,
      start: raw.start,
      end: raw.end,
      entityId: entity.entityId,
      color: entity.color,
      allDay: isAllDay(raw),
      recurring: !!raw.rrule || !!raw.recurring_event_id,
      recurrenceId: raw.recurrence_id,
      recurringEventId: raw.recurring_event_id
    };
  }
  // ── Internal: polling ─────────────────────────────────────────────────────
  _startPolling() {
    this._stopPolling();
    const intervalSec = this._config?.refresh_interval ?? 3600;
    if (intervalSec <= 0) return;
    this._pollTimer = setInterval(() => {
      this.fetchFull();
    }, intervalSec * 1e3);
  }
  _stopPolling() {
    if (this._pollTimer) {
      clearInterval(this._pollTimer);
      this._pollTimer = null;
    }
  }
  // ── Internal: HA event subscription ──────────────────────────────────────
  _subscribeHaEvent() {
    const eventName = this._config?.ha_refresh_event;
    if (!eventName || !this._hass?.connection) return;
    if (this._haEventUnsub) return;
    this._hass.connection.subscribeEvents(() => {
      this.refreshEntities();
    }, eventName).then((unsub) => {
      this._haEventUnsub = unsub;
    }).catch((err) => {
      console.warn("[modern-skylight-calendar-card] Failed to subscribe to HA event:", eventName, err);
    });
  }
  _unsubscribeHaEvent() {
    if (this._haEventUnsub) {
      this._haEventUnsub();
      this._haEventUnsub = null;
    }
  }
  // ── Internal: helpers ─────────────────────────────────────────────────────
  _sortKey(e2) {
    const v2 = e2.start.dateTime || e2.start.date;
    return v2 ? new Date(v2).getTime() : 0;
  }
  _limit(events) {
    const max = this._config?.max_events ?? 0;
    return max > 0 ? events.slice(0, max) : events;
  }
  _notify() {
    this._listeners.forEach((fn) => fn());
  }
}
const safeCustomElement = (tagName) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((classOrTarget, _context) => {
    const existing = customElements.get(tagName);
    if (existing) {
      return existing;
    }
    customElements.define(tagName, classOrTarget);
    return classOrTarget;
  })
);
const t$1 = { ATTRIBUTE: 1, CHILD: 2 }, e = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
let i$2 = class i2 {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i4) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i4;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
const { I: t } = j, i$1 = (o2) => o2, s = () => document.createComment(""), v = (o2, n3, e2) => {
  const l2 = o2._$AA.parentNode, d2 = void 0 === n3 ? o2._$AB : n3._$AA;
  if (void 0 === e2) {
    const i4 = l2.insertBefore(s(), d2), n4 = l2.insertBefore(s(), d2);
    e2 = new t(i4, n4, o2, o2.options);
  } else {
    const t2 = e2._$AB.nextSibling, n4 = e2._$AM, c2 = n4 !== o2;
    if (c2) {
      let t3;
      e2._$AQ?.(o2), e2._$AM = o2, void 0 !== e2._$AP && (t3 = o2._$AU) !== n4._$AU && e2._$AP(t3);
    }
    if (t2 !== d2 || c2) {
      let o3 = e2._$AA;
      for (; o3 !== t2; ) {
        const t3 = i$1(o3).nextSibling;
        i$1(l2).insertBefore(o3, d2), o3 = t3;
      }
    }
  }
  return e2;
}, u$1 = (o2, t2, i4 = o2) => (o2._$AI(t2, i4), o2), m = {}, p = (o2, t2 = m) => o2._$AH = t2, M = (o2) => o2._$AH, h = (o2) => {
  o2._$AR(), o2._$AA.remove();
};
const u = (e2, s2, t2) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s2; l2 <= t2; l2++) r2.set(e2[l2], l2);
  return r2;
}, c = e(class extends i$2 {
  constructor(e2) {
    if (super(e2), e2.type !== t$1.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t2) {
    let r2;
    void 0 === t2 ? t2 = s2 : void 0 !== s2 && (r2 = s2);
    const l2 = [], o2 = [];
    let i4 = 0;
    for (const s3 of e2) l2[i4] = r2 ? r2(s3, i4) : i4, o2[i4] = t2(s3, i4), i4++;
    return { values: o2, keys: l2 };
  }
  render(e2, s2, t2) {
    return this.dt(e2, s2, t2).values;
  }
  update(s2, [t2, r2, c2]) {
    const d2 = M(s2), { values: p$12, keys: a2 } = this.dt(t2, r2, c2);
    if (!Array.isArray(d2)) return this.ut = a2, p$12;
    const h$12 = this.ut ?? (this.ut = []), v$12 = [];
    let m2, y3, x2 = 0, j2 = d2.length - 1, k2 = 0, w = p$12.length - 1;
    for (; x2 <= j2 && k2 <= w; ) if (null === d2[x2]) x2++;
    else if (null === d2[j2]) j2--;
    else if (h$12[x2] === a2[k2]) v$12[k2] = u$1(d2[x2], p$12[k2]), x2++, k2++;
    else if (h$12[j2] === a2[w]) v$12[w] = u$1(d2[j2], p$12[w]), j2--, w--;
    else if (h$12[x2] === a2[w]) v$12[w] = u$1(d2[x2], p$12[w]), v(s2, v$12[w + 1], d2[x2]), x2++, w--;
    else if (h$12[j2] === a2[k2]) v$12[k2] = u$1(d2[j2], p$12[k2]), v(s2, d2[x2], d2[j2]), j2--, k2++;
    else if (void 0 === m2 && (m2 = u(a2, k2, w), y3 = u(h$12, x2, j2)), m2.has(h$12[x2])) if (m2.has(h$12[j2])) {
      const e2 = y3.get(a2[k2]), t3 = void 0 !== e2 ? d2[e2] : null;
      if (null === t3) {
        const e3 = v(s2, d2[x2]);
        u$1(e3, p$12[k2]), v$12[k2] = e3;
      } else v$12[k2] = u$1(t3, p$12[k2]), v(s2, d2[x2], t3), d2[e2] = null;
      k2++;
    } else h(d2[j2]), j2--;
    else h(d2[x2]), x2++;
    for (; k2 <= w; ) {
      const e2 = v(s2, v$12[w + 1]);
      u$1(e2, p$12[k2]), v$12[k2++] = e2;
    }
    for (; x2 <= j2; ) {
      const e2 = d2[x2++];
      null !== e2 && h(e2);
    }
    return this.ut = a2, p(s2, v$12), E;
  }
});
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
let MonthView = class extends i$3 {
  constructor() {
    super(...arguments);
    this.events = [];
    this.currentDate = dayjs();
    this.hiddenCalendars = /* @__PURE__ */ new Set();
    this.MAX_PILLS = 3;
  }
  // ─── Render ────────────────────────────────────────────────────────────────
  render() {
    const firstDow = this.config?.first_day_of_week ?? 1;
    const today = dayjs();
    const monthStart = this.currentDate.startOf("month");
    const monthEnd = this.currentDate.endOf("month");
    let gridStart = monthStart.startOf("week");
    const dow = monthStart.day();
    const offset = (dow - firstDow + 7) % 7;
    gridStart = monthStart.subtract(offset, "day");
    let gridEnd = monthEnd.endOf("week");
    const endDow = monthEnd.day();
    const endOffset = (6 - endDow + firstDow) % 7;
    gridEnd = monthEnd.add(endOffset, "day");
    const cells = [];
    let cursor = gridStart;
    while (cursor.isSameOrBefore(gridEnd, "day")) {
      const dateStr = cursor.format("YYYY-MM-DD");
      const dayEvents = this._eventsForDay(dateStr);
      cells.push({
        date: cursor,
        otherMonth: cursor.month() !== this.currentDate.month(),
        isToday: cursor.isSame(today, "day"),
        events: dayEvents
      });
      cursor = cursor.add(1, "day");
    }
    const dayNames = this._buildDayNames(firstDow);
    const showWeekNumbers = this.config?.show_week_numbers ?? false;
    return b`
      <div class="month-view-wrapper" style="display:flex;flex-direction:column;height:100%;">
        <!-- Day-of-week headers -->
        <div class="day-headers" style="${showWeekNumbers ? "grid-template-columns: 28px repeat(7,1fr)" : ""}">
          ${showWeekNumbers ? b`<div class="day-header-cell" style="color:var(--msc-text-disabled)">W</div>` : A}
          ${dayNames.map((n3) => b`<div class="day-header-cell">${n3}</div>`)}
        </div>

        <!-- Month grid -->
        <div class="month-grid" style="${showWeekNumbers ? "grid-template-columns: 28px repeat(7,1fr)" : ""}">
          ${this._renderRows(cells, showWeekNumbers)}
        </div>
      </div>
    `;
  }
  _renderRows(cells, showWeekNumbers) {
    if (!showWeekNumbers) {
      return c(
        cells,
        (cell) => cell.date.format("YYYY-MM-DD"),
        (cell) => this._renderDayCell(cell)
      );
    }
    const rows = [];
    for (let i4 = 0; i4 < cells.length; i4 += 7) {
      const rowCells = cells.slice(i4, i4 + 7);
      const weekNum = rowCells[0].date.week();
      rows.push(b`
        <div class="day-cell" style="background:var(--msc-surface);cursor:default;display:flex;align-items:flex-start;justify-content:center;padding-top:6px;">
          <span style="font-size:var(--msc-font-size-xs);color:var(--msc-text-disabled);font-weight:700">${weekNum}</span>
        </div>
        ${rowCells.map((cell) => this._renderDayCell(cell))}
      `);
    }
    return rows;
  }
  _renderDayCell(cell) {
    const visible = cell.events.filter((e2) => !this.hiddenCalendars.has(e2.entityId));
    const shown = visible.slice(0, this.MAX_PILLS);
    const overflow = visible.length - this.MAX_PILLS;
    return b`
      <div
        class="day-cell ${cell.otherMonth ? "other-month" : ""} ${cell.isToday ? "today" : ""}"
        @click=${() => this._onDayClick(cell.date)}
      >
        <span class="day-number">${cell.date.date()}</span>
        ${c(
      shown,
      (ev) => `${ev.entityId}|${ev.uid}`,
      (ev) => this._renderPill(ev)
    )}
        ${overflow > 0 ? b`
          <div class="more-events-label"
            @click=${(e2) => {
      e2.stopPropagation();
      this._onMoreClick(cell.date, visible);
    }}>
            +${overflow} more
          </div>
        ` : A}
      </div>
    `;
  }
  _renderPill(ev) {
    const start = getEventStart(ev);
    const bg = ev.color;
    const timeLabel = ev.allDay ? "" : formatTime(start, false);
    return b`
      <div
        class="event-pill ${ev.allDay ? "all-day" : "timed"}"
        style="background:${bg};color:#000"
        title="${ev.summary}${ev.location ? ` · ${ev.location}` : ""}"
        @click=${(e2) => {
      e2.stopPropagation();
      this._onEventClick(ev);
    }}
      >
        ${timeLabel ? b`<span style="opacity:.55;font-size:9px;flex-shrink:0">${timeLabel}</span>` : A}
        <span style="overflow:hidden;text-overflow:ellipsis">${ev.summary}</span>
      </div>
    `;
  }
  // ─── Helpers ───────────────────────────────────────────────────────────────
  _eventsForDay(dateStr) {
    const day = dayjs(dateStr);
    return this.events.filter((ev) => {
      const start = getEventStart(ev);
      const end = getEventEnd(ev);
      if (ev.allDay) {
        const inclusiveEnd = end.subtract(1, "day");
        return !day.isBefore(start, "day") && !day.isAfter(inclusiveEnd, "day");
      }
      return start.isSame(day, "day");
    }).sort((a2, b2) => {
      if (a2.allDay && !b2.allDay) return -1;
      if (!a2.allDay && b2.allDay) return 1;
      return getEventStart(a2).valueOf() - getEventStart(b2).valueOf();
    });
  }
  _buildDayNames(firstDow) {
    const names = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const rotated = [];
    for (let i4 = 0; i4 < 7; i4++) {
      rotated.push(names[(firstDow + i4) % 7]);
    }
    return rotated;
  }
  // ─── Events ────────────────────────────────────────────────────────────────
  _onDayClick(date) {
    this.dispatchEvent(new CustomEvent("day-click", { detail: { date: date.toDate() }, bubbles: true, composed: true }));
  }
  _onEventClick(ev) {
    this.dispatchEvent(new CustomEvent("event-click", { detail: { event: ev }, bubbles: true, composed: true }));
  }
  _onMoreClick(date, events) {
    this.dispatchEvent(new CustomEvent("more-click", { detail: { date: date.toDate(), events }, bubbles: true, composed: true }));
  }
};
MonthView.styles = [baseStyles];
__decorateClass$4([
  n$1({ attribute: false })
], MonthView.prototype, "events", 2);
__decorateClass$4([
  n$1({ attribute: false })
], MonthView.prototype, "currentDate", 2);
__decorateClass$4([
  n$1({ attribute: false })
], MonthView.prototype, "config", 2);
__decorateClass$4([
  n$1({ attribute: false })
], MonthView.prototype, "hiddenCalendars", 2);
MonthView = __decorateClass$4([
  safeCustomElement("msc-month-view")
], MonthView);
const n2 = "important", i3 = " !" + n2, o = e(class extends i$2 {
  constructor(t2) {
    if (super(t2), t2.type !== t$1.ATTRIBUTE || "style" !== t2.name || t2.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce((e2, r2) => {
      const s2 = t2[r2];
      return null == s2 ? e2 : e2 + `${r2 = r2.includes("-") ? r2 : r2.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s2};`;
    }, "");
  }
  update(e2, [r2]) {
    const { style: s2 } = e2.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r2)), this.render(r2);
    for (const t2 of this.ft) null == r2[t2] && (this.ft.delete(t2), t2.includes("-") ? s2.removeProperty(t2) : s2[t2] = null);
    for (const t2 in r2) {
      const e3 = r2[t2];
      if (null != e3) {
        this.ft.add(t2);
        const r3 = "string" == typeof e3 && e3.endsWith(i3);
        t2.includes("-") || r3 ? s2.setProperty(t2, r3 ? e3.slice(0, -11) : e3, r3 ? n2 : "") : s2[t2] = e3;
      }
    }
    return E;
  }
});
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
const HOUR_HEIGHT_PX = 48;
let WeekView = class extends i$3 {
  constructor() {
    super(...arguments);
    this.events = [];
    this.currentDate = dayjs();
    this.hiddenCalendars = /* @__PURE__ */ new Set();
    this._nowMinutes = this._getCurrentMinutes();
  }
  connectedCallback() {
    super.connectedCallback();
    this._nowTimer = setInterval(() => {
      this._nowMinutes = this._getCurrentMinutes();
    }, 6e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._nowTimer) clearInterval(this._nowTimer);
  }
  // ─── Render ────────────────────────────────────────────────────────────────
  render() {
    const firstDow = this.config?.first_day_of_week ?? 1;
    const startHour = this.config?.week_start_hour ?? 0;
    const endHour = this.config?.week_end_hour ?? 24;
    const today = dayjs();
    const weekStart = this._getWeekStart(this.currentDate, firstDow);
    const days = [];
    for (let i4 = 0; i4 < 7; i4++) days.push(weekStart.add(i4, "day"));
    const hours = [];
    for (let h2 = startHour; h2 < endHour; h2++) hours.push(h2);
    const totalHours = endHour - startHour;
    const totalMinutes = totalHours * 60;
    const allDayByDay = days.map((d2) => this._allDayEventsForDay(d2));
    const timedByDay = days.map((d2) => this._positionedTimedEvents(d2, startHour, totalMinutes));
    const nowDayIdx = days.findIndex((d2) => d2.isSame(today, "day"));
    const nowTopPct = Math.max(0, Math.min(
      100,
      (this._nowMinutes - startHour * 60) / totalMinutes * 100
    ));
    return b`
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden;">
        <!-- All-day row -->
        ${this._renderAllDayRow(days, allDayByDay)}

        <!-- Scrollable timed grid -->
        <div class="week-grid" style="--week-total-hours:${totalHours};">
          <!-- Time gutter -->
          <div class="week-time-gutter">
            <div style="height:0"></div>
            ${hours.map((h2) => b`
              <div class="week-time-label">${this._formatHour(h2)}</div>
            `)}
          </div>

          <!-- Day columns -->
        ${days.map((day, idx) => b`
            <div class="week-day-column">
              <!-- Day header (sticky) -->
              <div class="week-day-header">
                <div class="week-day-name">${day.format("ddd")}</div>
                <div class="week-day-number ${day.isSame(today, "day") ? "today" : ""}">
                  ${day.date()}
                </div>
              </div>

              <!-- Hour rows (background grid) -->
              <div style="position:relative;height:${totalHours * HOUR_HEIGHT_PX}px;">
                ${hours.map(() => b`<div class="week-hour-row"></div>`)}

                <!-- "Now" line -->
                ${nowDayIdx === idx ? b`
                  <div class="now-line" style="top:${nowTopPct}%"></div>
                ` : A}

                <!-- Timed events -->
                ${c(
      timedByDay[idx],
      (pe) => `${pe.event.entityId}|${pe.event.uid}`,
      (pe) => this._renderTimedEvent(pe)
    )}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
  _renderAllDayRow(days, allDayByDay) {
    const hasAny = allDayByDay.some((d2) => d2.length > 0);
    if (!hasAny) return A;
    return b`
      <div style="
        display:grid;
        grid-template-columns:48px repeat(7,1fr);
        border-bottom:1px solid var(--msc-border);
        background:var(--msc-surface);
        flex-shrink:0;
      ">
        <div style="border-right:1px solid var(--msc-border);padding:4px 4px 4px 0;
          display:flex;align-items:flex-end;justify-content:flex-end;">
          <span style="font-size:9px;color:var(--msc-text-disabled);font-weight:700;padding-bottom:2px">all day</span>
        </div>
        ${days.map((_day, idx) => b`
          <div style="border-right:1px solid var(--msc-border);padding:3px 2px;min-height:28px;">
            ${allDayByDay[idx].map((ev) => b`
              <div
                class="event-pill all-day"
                style="background:${ev.color};color:#000;margin-bottom:2px;font-size:10px;"
                title="${ev.summary}"
                @click=${() => this._onEventClick(ev)}
              >${ev.summary}</div>
            `)}
          </div>
        `)}
      </div>
    `;
  }
  _renderTimedEvent(pe) {
    const { event: ev, col, totalCols, topPct, heightPct } = pe;
    const start = getEventStart(ev);
    const end = getEventEnd(ev);
    const colW = 100 / totalCols;
    return b`
      <div
        class="week-event"
        style=${o({
      top: `${topPct}%`,
      height: `${Math.max(heightPct, 1.5)}%`,
      left: `${col * colW + 1}%`,
      width: `${colW - 2}%`,
      background: ev.color
    })}
        title="${ev.summary}\n${formatTime(start)} – ${formatTime(end)}"
        @click=${() => this._onEventClick(ev)}
      >
        <div style="font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${ev.summary}</div>
        <div style="font-size:9px;opacity:.7">${formatTime(start)} – ${formatTime(end)}</div>
      </div>
    `;
  }
  // ─── Layout helpers ────────────────────────────────────────────────────────
  _positionedTimedEvents(day, startHour, totalMinutes) {
    const timed = this.events.filter((ev) => {
      if (ev.allDay) return false;
      if (this.hiddenCalendars.has(ev.entityId)) return false;
      return getEventStart(ev).isSame(day, "day");
    });
    if (timed.length === 0) return [];
    timed.sort((a2, b2) => getEventStart(a2).valueOf() - getEventStart(b2).valueOf());
    const columns = [];
    const positioned = timed.map((ev) => {
      const start = getEventStart(ev);
      const end = getEventEnd(ev);
      const startMin = start.hour() * 60 + start.minute();
      const endMin = end.hour() * 60 + end.minute();
      const topPct = (startMin - startHour * 60) / totalMinutes * 100;
      const heightPct = (endMin - startMin) / totalMinutes * 100;
      let col = 0;
      while (columns[col]?.some((other) => {
        const os = getEventStart(other);
        const oe = getEventEnd(other);
        return os.isBefore(end) && oe.isAfter(start);
      })) {
        col++;
      }
      if (!columns[col]) columns[col] = [];
      columns[col].push(ev);
      return { event: ev, col, totalCols: 1, topPct, heightPct };
    });
    const maxCol = columns.length;
    positioned.forEach((pe) => {
      pe.totalCols = maxCol;
    });
    return positioned;
  }
  _allDayEventsForDay(day) {
    return this.events.filter((ev) => {
      if (!ev.allDay) return false;
      if (this.hiddenCalendars.has(ev.entityId)) return false;
      const start = getEventStart(ev);
      const end = getEventEnd(ev).subtract(1, "day");
      return !day.isBefore(start, "day") && !day.isAfter(end, "day");
    });
  }
  _getWeekStart(date, firstDow) {
    const dow = date.day();
    const offset = (dow - firstDow + 7) % 7;
    return date.subtract(offset, "day").startOf("day");
  }
  _formatHour(h2) {
    if (h2 === 0) return "";
    if (h2 === 12) return "12 PM";
    return h2 < 12 ? `${h2} AM` : `${h2 - 12} PM`;
  }
  _getCurrentMinutes() {
    const now = dayjs();
    return now.hour() * 60 + now.minute();
  }
  // ─── Events ────────────────────────────────────────────────────────────────
  _onEventClick(ev) {
    this.dispatchEvent(new CustomEvent("event-click", { detail: { event: ev }, bubbles: true, composed: true }));
  }
};
WeekView.styles = [baseStyles];
__decorateClass$3([
  n$1({ attribute: false })
], WeekView.prototype, "events", 2);
__decorateClass$3([
  n$1({ attribute: false })
], WeekView.prototype, "currentDate", 2);
__decorateClass$3([
  n$1({ attribute: false })
], WeekView.prototype, "config", 2);
__decorateClass$3([
  n$1({ attribute: false })
], WeekView.prototype, "hiddenCalendars", 2);
__decorateClass$3([
  r()
], WeekView.prototype, "_nowMinutes", 2);
WeekView = __decorateClass$3([
  safeCustomElement("msc-week-view")
], WeekView);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
let ListView = class extends i$3 {
  constructor() {
    super(...arguments);
    this.events = [];
    this.currentDate = dayjs();
    this.hiddenCalendars = /* @__PURE__ */ new Set();
  }
  // ─── Render ────────────────────────────────────────────────────────────────
  render() {
    const groups = this._buildGroups();
    if (groups.length === 0) {
      return b`
        <div class="list-view">
          <div class="list-empty">No upcoming events</div>
        </div>
      `;
    }
    return b`
      <div class="list-view">
        ${c(
      groups,
      (g2) => g2.date.format("YYYY-MM-DD"),
      (g2) => this._renderGroup(g2)
    )}
      </div>
    `;
  }
  _renderGroup(group) {
    return b`
      <div class="list-date-group">
        <div class="list-date-heading ${group.isToday ? "today" : ""}">
          <span class="date-num">${group.date.date()}</span>
          <div class="date-meta">
            <span class="date-weekday">${group.date.format("ddd")}</span>
            <span class="date-month">${group.date.format("MMM YYYY")}</span>
          </div>
        </div>

        ${c(
      group.events,
      (ev) => `${ev.entityId}|${ev.uid}`,
      (ev) => this._renderEvent(ev)
    )}
      </div>
    `;
  }
  _renderEvent(ev) {
    const start = getEventStart(ev);
    const end = getEventEnd(ev);
    let timeMeta;
    if (ev.allDay) {
      const inclusiveEnd = end.subtract(1, "day");
      timeMeta = start.isSame(inclusiveEnd, "day") ? "All day" : `All day · ${formatDateRange(start, inclusiveEnd)}`;
    } else {
      timeMeta = `${formatTime(start)} – ${formatTime(end)}`;
    }
    return b`
      <div
        class="list-event"
        @click=${() => this._onEventClick(ev)}
      >
        <div class="list-event-color-bar" style="background:${ev.color}"></div>
        <div class="list-event-content">
          <div class="list-event-title">${ev.summary}</div>
          <div class="list-event-meta">
            ${timeMeta}
            ${ev.location ? b` · <span title="${ev.location}">${ev.location}</span>` : A}
          </div>
        </div>
        ${ev.recurring ? b`
          <span style="font-size:10px;color:var(--msc-text-disabled);flex-shrink:0;align-self:center;" title="Recurring">↻</span>
        ` : A}
      </div>
    `;
  }
  // ─── Helpers ───────────────────────────────────────────────────────────────
  _buildGroups() {
    const today = dayjs();
    const visible = this.events.filter((ev) => !this.hiddenCalendars.has(ev.entityId));
    const startOfView = this.currentDate.startOf("day");
    const dayMap = /* @__PURE__ */ new Map();
    for (const ev of visible) {
      const evStart = getEventStart(ev);
      const evEnd = getEventEnd(ev);
      if (ev.allDay) {
        let cursor = evStart.startOf("day");
        const inclusiveEnd = evEnd.subtract(1, "day").startOf("day");
        while (!cursor.isAfter(inclusiveEnd)) {
          if (!cursor.isBefore(startOfView)) {
            const key = cursor.format("YYYY-MM-DD");
            if (!dayMap.has(key)) dayMap.set(key, []);
            dayMap.get(key).push(ev);
          }
          cursor = cursor.add(1, "day");
        }
      } else {
        const key = evStart.format("YYYY-MM-DD");
        if (!evStart.isBefore(startOfView, "day")) {
          if (!dayMap.has(key)) dayMap.set(key, []);
          dayMap.get(key).push(ev);
        }
      }
    }
    const sortedKeys = Array.from(dayMap.keys()).sort();
    return sortedKeys.map((key) => {
      const date = dayjs(key);
      const dayEvents = dayMap.get(key).sort((a2, b2) => {
        if (a2.allDay && !b2.allDay) return -1;
        if (!a2.allDay && b2.allDay) return 1;
        return getEventStart(a2).valueOf() - getEventStart(b2).valueOf();
      });
      return {
        date,
        isToday: date.isSame(today, "day"),
        events: dayEvents
      };
    });
  }
  // ─── Events ────────────────────────────────────────────────────────────────
  _onEventClick(ev) {
    this.dispatchEvent(new CustomEvent("event-click", { detail: { event: ev }, bubbles: true, composed: true }));
  }
};
ListView.styles = [baseStyles];
__decorateClass$2([
  n$1({ attribute: false })
], ListView.prototype, "events", 2);
__decorateClass$2([
  n$1({ attribute: false })
], ListView.prototype, "currentDate", 2);
__decorateClass$2([
  n$1({ attribute: false })
], ListView.prototype, "config", 2);
__decorateClass$2([
  n$1({ attribute: false })
], ListView.prototype, "hiddenCalendars", 2);
ListView = __decorateClass$2([
  safeCustomElement("msc-list-view")
], ListView);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let EventDialog = class extends i$3 {
  constructor() {
    super(...arguments);
    this.entities = [];
    this._title = "";
    this._description = "";
    this._location = "";
    this._startDate = "";
    this._startTime = "";
    this._endDate = "";
    this._endTime = "";
    this._allDay = false;
    this._entityId = "";
    this._saving = false;
    this._deleting = false;
  }
  updated(changed) {
    if (changed.has("state") && this.state?.open) {
      this._populate();
    }
  }
  _populate() {
    const { event, defaultDate, defaultEntityId } = this.state;
    const writableEntities = this.entities.filter((e2) => !e2.readonly);
    if (event) {
      this._title = event.summary;
      this._description = event.description || "";
      this._location = event.location || "";
      this._entityId = event.entityId;
      this._allDay = event.allDay;
      if (event.allDay) {
        this._startDate = event.start.date || "";
        this._endDate = event.end.date || "";
        this._startTime = "";
        this._endTime = "";
      } else {
        const s2 = dayjs(event.start.dateTime);
        const e2 = dayjs(event.end.dateTime);
        this._startDate = s2.format("YYYY-MM-DD");
        this._startTime = s2.format("HH:mm");
        this._endDate = e2.format("YYYY-MM-DD");
        this._endTime = e2.format("HH:mm");
      }
    } else {
      const base = defaultDate ? dayjs(defaultDate) : dayjs();
      this._title = "";
      this._description = "";
      this._location = "";
      this._entityId = defaultEntityId || writableEntities[0]?.entityId || "";
      this._allDay = false;
      this._startDate = base.format("YYYY-MM-DD");
      this._startTime = base.hour(9).minute(0).format("HH:mm");
      this._endDate = base.format("YYYY-MM-DD");
      this._endTime = base.hour(10).minute(0).format("HH:mm");
    }
  }
  _close() {
    this.dispatchEvent(new CustomEvent("close"));
  }
  _backdrop(e2) {
    if (e2.target === e2.currentTarget) this._close();
  }
  async _save() {
    if (!this._title.trim()) return;
    this._saving = true;
    const entityId = this._entityId;
    const isEdit = !!this.state.event;
    let startDt;
    let endDt;
    if (this._allDay) {
      startDt = this._startDate;
      endDt = this._endDate || this._startDate;
    } else {
      startDt = `${this._startDate}T${this._startTime}:00`;
      endDt = `${this._endDate}T${this._endTime}:00`;
    }
    try {
      if (isEdit && this.state.event) {
        const serviceData = {
          entity_id: entityId,
          uid: this.state.event.uid,
          summary: this._title.trim(),
          description: this._description || void 0,
          location: this._location || void 0,
          start_date_time: this._allDay ? void 0 : startDt,
          end_date_time: this._allDay ? void 0 : endDt,
          start_date: this._allDay ? startDt : void 0,
          end_date: this._allDay ? endDt : void 0
        };
        if (this.state.event.recurrenceId) serviceData.recurrence_id = this.state.event.recurrenceId;
        try {
          const wsPayload = {
            type: "calendar/event/update",
            entity_id: entityId,
            uid: this.state.event.uid,
            event: {
              summary: this._title.trim(),
              dtstart: startDt,
              dtend: endDt,
              ...this._description ? { description: this._description } : {},
              ...this._location ? { location: this._location } : {}
            }
          };
          if (this.state.event.recurrenceId) wsPayload.recurrence_id = this.state.event.recurrenceId;
          await this.hass.connection.sendMessagePromise(wsPayload);
        } catch {
          await this.hass.callService("calendar", "update_event", serviceData);
        }
      } else {
        const wsPayload = {
          type: "calendar/event/create",
          entity_id: entityId,
          event: {
            summary: this._title.trim(),
            description: this._description || void 0,
            location: this._location || void 0,
            ...this._allDay ? { start: { date: startDt }, end: { date: endDt } } : { start: { dateTime: startDt }, end: { dateTime: endDt } }
          }
        };
        try {
          await this.hass.connection.sendMessagePromise(wsPayload);
        } catch {
          const data = {
            entity_id: entityId,
            summary: this._title.trim(),
            description: this._description || void 0,
            location: this._location || void 0,
            start_date_time: this._allDay ? void 0 : startDt,
            end_date_time: this._allDay ? void 0 : endDt,
            start_date: this._allDay ? startDt : void 0,
            end_date: this._allDay ? endDt : void 0
          };
          await this.hass.callService("calendar", "create_event", data);
        }
      }
      this.dispatchEvent(new CustomEvent("saved", { detail: { entityId } }));
      this._close();
    } catch (e2) {
      console.error("[msc-event-dialog] save error", e2);
    } finally {
      this._saving = false;
    }
  }
  async _delete() {
    if (!this.state.event) return;
    this._deleting = true;
    const entityId = this.state.event.entityId;
    const uid = this.state.event.uid;
    const recurrenceId = this.state.event.recurrenceId;
    try {
      const wsPayload = {
        type: "calendar/event/delete",
        entity_id: entityId,
        uid
      };
      if (recurrenceId) wsPayload.recurrence_id = recurrenceId;
      try {
        await this.hass.connection.sendMessagePromise(wsPayload);
      } catch {
        const data = { entity_id: entityId, uid };
        if (recurrenceId) data.recurrence_id = recurrenceId;
        await this.hass.callService("calendar", "delete_event", data);
      }
      this.dispatchEvent(new CustomEvent("saved", { detail: { entityId } }));
      this._close();
    } catch (e2) {
      console.error("[msc-event-dialog] delete error", e2);
    } finally {
      this._deleting = false;
    }
  }
  render() {
    if (!this.state?.open) return A;
    const isEdit = this.state.mode === "edit";
    const writableEntities = this.entities.filter((e2) => !e2.readonly);
    const canSave = this._title.trim().length > 0 && !this._saving;
    return b`
      <div class="dialog-backdrop" @click=${this._backdrop}>
        <div class="dialog" role="dialog" aria-modal="true">
          <div class="dialog-header">
            <h2 class="dialog-title">${isEdit ? "Edit Event" : "New Event"}</h2>
            <button class="btn icon-only" @click=${this._close} title="Close">✕</button>
          </div>

          <div class="dialog-body">
            <div class="form-field">
              <label class="form-label">Title</label>
              <input
                class="form-input"
                type="text"
                placeholder="Event title"
                .value=${this._title}
                @input=${(e2) => this._title = e2.target.value}
                @keydown=${(e2) => e2.key === "Enter" && canSave && this._save()}
                autofocus
              />
            </div>

            ${writableEntities.length > 1 ? b`
              <div class="form-field">
                <label class="form-label">Calendar</label>
                <select class="form-input" .value=${this._entityId}
                  @change=${(e2) => this._entityId = e2.target.value}>
                  ${writableEntities.map((ent) => b`
                    <option value=${ent.entityId} ?selected=${ent.entityId === this._entityId}>
                      ${ent.name}
                    </option>
                  `)}
                </select>
              </div>
            ` : A}

            <div class="form-field">
              <label class="form-label">
                <input
                  type="checkbox"
                  .checked=${this._allDay}
                  @change=${(e2) => this._allDay = e2.target.checked}
                />
                All day
              </label>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <div class="form-field">
                <label class="form-label">Start date</label>
                <input class="form-input" type="date" .value=${this._startDate}
                  @change=${(e2) => this._startDate = e2.target.value} />
              </div>
              ${!this._allDay ? b`
                <div class="form-field">
                  <label class="form-label">Start time</label>
                  <input class="form-input" type="time" .value=${this._startTime}
                    @change=${(e2) => this._startTime = e2.target.value} />
                </div>
              ` : A}
              <div class="form-field">
                <label class="form-label">End date</label>
                <input class="form-input" type="date" .value=${this._endDate}
                  @change=${(e2) => this._endDate = e2.target.value} />
              </div>
              ${!this._allDay ? b`
                <div class="form-field">
                  <label class="form-label">End time</label>
                  <input class="form-input" type="time" .value=${this._endTime}
                    @change=${(e2) => this._endTime = e2.target.value} />
                </div>
              ` : A}
            </div>

            <div class="form-field">
              <label class="form-label">Description</label>
              <textarea class="form-input" rows="2" placeholder="Optional description"
                .value=${this._description}
                @input=${(e2) => this._description = e2.target.value}
              ></textarea>
            </div>

            <div class="form-field">
              <label class="form-label">Location</label>
              <input class="form-input" type="text" placeholder="Optional location"
                .value=${this._location}
                @input=${(e2) => this._location = e2.target.value} />
            </div>
          </div>

          <div class="dialog-footer">
            ${isEdit ? b`
              <button class="btn" style="color:var(--msc-pink);margin-right:auto"
                @click=${this._delete} ?disabled=${this._deleting}>
                ${this._deleting ? "…" : "Delete"}
              </button>
            ` : A}
            <button class="btn" @click=${this._close}>Cancel</button>
            <button class="btn btn-primary" @click=${this._save} ?disabled=${!canSave}>
              ${this._saving ? "…" : isEdit ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
EventDialog.styles = [baseStyles];
__decorateClass$1([
  n$1({ attribute: false })
], EventDialog.prototype, "hass", 2);
__decorateClass$1([
  n$1({ attribute: false })
], EventDialog.prototype, "entities", 2);
__decorateClass$1([
  n$1({ attribute: false })
], EventDialog.prototype, "state", 2);
__decorateClass$1([
  r()
], EventDialog.prototype, "_title", 2);
__decorateClass$1([
  r()
], EventDialog.prototype, "_description", 2);
__decorateClass$1([
  r()
], EventDialog.prototype, "_location", 2);
__decorateClass$1([
  r()
], EventDialog.prototype, "_startDate", 2);
__decorateClass$1([
  r()
], EventDialog.prototype, "_startTime", 2);
__decorateClass$1([
  r()
], EventDialog.prototype, "_endDate", 2);
__decorateClass$1([
  r()
], EventDialog.prototype, "_endTime", 2);
__decorateClass$1([
  r()
], EventDialog.prototype, "_allDay", 2);
__decorateClass$1([
  r()
], EventDialog.prototype, "_entityId", 2);
__decorateClass$1([
  r()
], EventDialog.prototype, "_saving", 2);
__decorateClass$1([
  r()
], EventDialog.prototype, "_deleting", 2);
EventDialog = __decorateClass$1([
  safeCustomElement("msc-event-dialog")
], EventDialog);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let ModernSkylightCalendarCard = class extends i$3 {
  constructor() {
    super(...arguments);
    this._hass = null;
    this._config = null;
    this._currentDate = dayjs();
    this._view = "month";
    this._events = [];
    this._fetching = false;
    this._hiddenCalendars = /* @__PURE__ */ new Set();
    this._dialog = { open: false, mode: "add" };
    this._store = new CalendarStore();
    this._storeListener = () => {
      this._events = [...this._store.events];
      this._fetching = this._store.fetching;
    };
  }
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    this._store.setHass(hass);
    if (first) this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback();
    this._store.subscribe(this._storeListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._store.unsubscribe(this._storeListener);
    this._store.destroy();
  }
  // ── HA card API ───────────────────────────────────────────────────────────
  setConfig(config) {
    if (!config.entities || !Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error('[modern-skylight-calendar-card] "entities" array is required.');
    }
    this._config = config;
    this._view = config.view || "month";
    this._store.setConfig(config);
    const storageKey = config.preference_storage_key || "msc-prefs";
    const hidden = loadPreference(`${storageKey}:hidden`, []);
    this._hiddenCalendars = new Set(hidden);
    const savedView = loadPreference(`${storageKey}:view`, null);
    if (savedView && ["month", "week", "list"].includes(savedView)) {
      this._view = savedView;
    }
  }
  static getConfigElement() {
    return null;
  }
  static getStubConfig() {
    return {
      entities: ["calendar.your_calendar"],
      view: "month",
      title: "Calendar",
      refresh_interval: 3600,
      ha_refresh_event: "gcal_webhook_fired"
    };
  }
  getCardSize() {
    return this._config?.compact_height ? 4 : 7;
  }
  // ── Render ────────────────────────────────────────────────────────────────
  render() {
    if (!this._config) {
      return b`<div class="card"><div style="padding:16px;color:var(--msc-text-secondary)">No config.</div></div>`;
    }
    const entities = this._store.resolveEntities();
    const periodLabel = this._getPeriodLabel();
    return b`
      <div class="card">
        ${this._renderHeader(entities, periodLabel)}
        <div class="calendar-body">
          ${this._renderView()}
          ${this._fetching ? b`<div class="loading-overlay"><div class="spinner"></div></div>` : A}
        </div>
      </div>

      <msc-event-dialog
        .hass=${this._hass}
        .entities=${entities}
        .state=${this._dialog}
        @close=${() => this._closeDialog()}
        @saved=${(e2) => this._onEventSaved(e2.detail.entityId)}
      ></msc-event-dialog>
    `;
  }
  // ── Header ────────────────────────────────────────────────────────────────
  _renderHeader(entities, periodLabel) {
    const compact = this._config?.compact_header ?? false;
    const title = this._config?.title;
    const canManage = this._config?.enable_event_management ?? true;
    return b`
      <div class="header">
        <!-- Top row: Title (left), Period + Nav + Add (right) -->
        <div class="header-top">
          ${title ? b`<h1 class="header-title">${title}</h1>` : A}

          <div class="header-actions" style="gap: 16px;">
            <span class="header-period"
              @click=${() => this._goToday()}
              title="Go to today"
              style="cursor: pointer;"
            >${periodLabel}</span>

            <div class="nav-group">
              <button class="nav-btn" @click=${() => this._navigate(-1)} title="Previous">‹</button>
              <button class="today-btn" @click=${() => this._goToday()}>Today</button>
              <button class="nav-btn" @click=${() => this._navigate(1)} title="Next">›</button>
            </div>

            ${canManage ? b`
              <button class="btn btn-primary icon-only" title="New event"
                @click=${() => this._openAddDialog()}>+</button>
            ` : A}
          </div>
        </div>

        ${!compact ? b`
          <!-- Bottom row: Badges (left), View Switcher (right) -->
          <div class="header-bottom">
            <div class="calendar-badges">
              ${entities.map((ent) => this._renderBadge(ent))}
            </div>

            <div class="view-switcher">
              ${["month", "week", "list"].map((v2) => b`
                <button
                  class="btn ${this._view === v2 ? "active" : ""}"
                  @click=${() => this._switchView(v2)}
                >${this._viewLabel(v2)}</button>
              `)}
            </div>
          </div>
        ` : A}
      </div>
    `;
  }
  _renderBadge(ent) {
    const active = !this._hiddenCalendars.has(ent.entityId);
    return b`
      <span
        class="calendar-badge ${active ? "active" : ""}"
        style="--badge-color:${ent.color}"
        @click=${() => this._toggleCalendar(ent.entityId)}
        title="${ent.name}"
      >
        <span class="dot"></span>
        ${ent.name}
      </span>
    `;
  }
  // ── View ──────────────────────────────────────────────────────────────────
  _renderView() {
    if (!this._config) return A;
    switch (this._view) {
      case "month":
        return b`
          <msc-month-view
            .events=${this._events}
            .currentDate=${this._currentDate}
            .config=${this._config}
            .hiddenCalendars=${this._hiddenCalendars}
            @event-click=${(e2) => this._onEventClick(e2.detail.event)}
            @day-click=${(e2) => this._onDayClick(e2.detail.date)}
          ></msc-month-view>
        `;
      case "week":
        return b`
          <msc-week-view
            .events=${this._events}
            .currentDate=${this._currentDate}
            .config=${this._config}
            .hiddenCalendars=${this._hiddenCalendars}
            @event-click=${(e2) => this._onEventClick(e2.detail.event)}
          ></msc-week-view>
        `;
      case "list":
        return b`
          <msc-list-view
            .events=${this._events}
            .currentDate=${this._currentDate}
            .config=${this._config}
            .hiddenCalendars=${this._hiddenCalendars}
            @event-click=${(e2) => this._onEventClick(e2.detail.event)}
          ></msc-list-view>
        `;
      default:
        return A;
    }
  }
  // ── Navigation ────────────────────────────────────────────────────────────
  _navigate(dir) {
    const unit = this._view === "month" ? "month" : this._view === "week" ? "week" : "day";
    const amount = this._view === "list" ? 7 : 1;
    this._currentDate = this._currentDate.add(dir * amount, unit);
    this._store.navigate(this._currentDate);
    this.requestUpdate();
  }
  _goToday() {
    this._currentDate = dayjs();
    this._store.navigate(this._currentDate);
    this.requestUpdate();
  }
  _switchView(v2) {
    this._view = v2;
    this._store.setView(v2, this._currentDate);
    const storageKey = this._config?.preference_storage_key || "msc-prefs";
    savePreference(`${storageKey}:view`, v2);
  }
  _toggleCalendar(entityId) {
    const next = new Set(this._hiddenCalendars);
    if (next.has(entityId)) {
      next.delete(entityId);
    } else {
      next.add(entityId);
    }
    this._hiddenCalendars = next;
    const storageKey = this._config?.preference_storage_key || "msc-prefs";
    savePreference(`${storageKey}:hidden`, Array.from(next));
  }
  // ── Period label ──────────────────────────────────────────────────────────
  _getPeriodLabel() {
    const d2 = this._currentDate;
    switch (this._view) {
      case "month":
        return d2.format("MMMM YYYY");
      case "week": {
        const firstDow = this._config?.first_day_of_week ?? 1;
        const dow = d2.day();
        const offset = (dow - firstDow + 7) % 7;
        const weekStart = d2.subtract(offset, "day");
        const weekEnd = weekStart.add(6, "day");
        if (weekStart.month() === weekEnd.month()) {
          return `${weekStart.format("MMM D")} – ${weekEnd.format("D, YYYY")}`;
        }
        return `${weekStart.format("MMM D")} – ${weekEnd.format("MMM D, YYYY")}`;
      }
      case "list":
        return d2.format("MMMM YYYY");
      default:
        return "";
    }
  }
  _viewLabel(v2) {
    return { month: "Month", week: "Week", list: "List" }[v2];
  }
  // ── Dialog ────────────────────────────────────────────────────────────────
  _openAddDialog(defaultDate) {
    const entities = this._store.resolveEntities();
    const writableEntities = entities.filter((e2) => !e2.readonly);
    if (writableEntities.length === 0) return;
    this._dialog = {
      open: true,
      mode: "add",
      defaultDate: defaultDate || this._currentDate.toDate(),
      defaultEntityId: writableEntities[0].entityId
    };
  }
  _openEditDialog(event) {
    const entities = this._store.resolveEntities();
    const ent = entities.find((e2) => e2.entityId === event.entityId);
    if (ent?.readonly) return;
    this._dialog = {
      open: true,
      mode: "edit",
      event
    };
  }
  _closeDialog() {
    this._dialog = { open: false, mode: "add" };
  }
  _onEventSaved(entityId) {
    this._store.refreshEntities([entityId]);
  }
  // ── Event handlers from child views ──────────────────────────────────────
  _onEventClick(event) {
    if (!(this._config?.enable_event_management ?? true)) return;
    this._openEditDialog(event);
  }
  _onDayClick(date) {
    if (!(this._config?.enable_event_management ?? true)) return;
    this._openAddDialog(date);
  }
};
ModernSkylightCalendarCard.styles = [baseStyles];
__decorateClass([
  n$1({ attribute: false })
], ModernSkylightCalendarCard.prototype, "hass", 1);
__decorateClass([
  r()
], ModernSkylightCalendarCard.prototype, "_config", 2);
__decorateClass([
  r()
], ModernSkylightCalendarCard.prototype, "_currentDate", 2);
__decorateClass([
  r()
], ModernSkylightCalendarCard.prototype, "_view", 2);
__decorateClass([
  r()
], ModernSkylightCalendarCard.prototype, "_events", 2);
__decorateClass([
  r()
], ModernSkylightCalendarCard.prototype, "_fetching", 2);
__decorateClass([
  r()
], ModernSkylightCalendarCard.prototype, "_hiddenCalendars", 2);
__decorateClass([
  r()
], ModernSkylightCalendarCard.prototype, "_dialog", 2);
ModernSkylightCalendarCard = __decorateClass([
  safeCustomElement("modern-skylight-calendar-card")
], ModernSkylightCalendarCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "modern-skylight-calendar-card",
  name: "Modern Skylight Calendar Card",
  description: "A sleek, neon-themed, flicker-free calendar card for Home Assistant. Supports Month, Week, and List views with real-time Google Calendar updates.",
  preview: true,
  documentationURL: "https://github.com/uprising8664/modern-skylight-calendar-card"
});
export {
  ModernSkylightCalendarCard
};
