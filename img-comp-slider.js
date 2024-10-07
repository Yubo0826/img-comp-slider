import { defineComponent as v, ref as a, onMounted as w, openBlock as b, createElementBlock as y, createElementVNode as e, withDirectives as L, vModelText as S, toDisplayString as u, createCommentVNode as x } from "vue";
const C = { class: "img-comp__slider-wrapper" }, V = /* @__PURE__ */ e("label", {
  for: "img-comp-range",
  class: "img-comp__label"
}, "Move image comparison slider", -1), k = { class: "img-comp__figure img-comp__figure--overlay" }, M = { class: "img-comp__picture" }, B = ["srcset"], z = ["srcset"], E = ["src"], I = { class: "img-comp__caption img-comp__caption--before" }, T = { class: "img-comp__caption-body" }, Y = /* @__PURE__ */ e("svg", {
  class: "img-comp__thumb-icon",
  xmlns: "http://www.w3.org/2000/svg",
  width: "38",
  height: "20",
  viewBox: "0 0 18 10",
  fill: "currentColor"
}, [
  /* @__PURE__ */ e("path", {
    class: "img-comp__thumb-icon--left",
    d: "M12.121 4.703V.488c0-.302.384-.454.609-.24l4.42 4.214a.33.33 0 0 1 0 .481l-4.42 4.214c-.225.215-.609.063-.609-.24V4.703z"
  }),
  /* @__PURE__ */ e("path", {
    class: "img-comp__thumb-icon--right",
    d: "M5.879 4.703V.488c0-.302-.384-.454-.609-.24L.85 4.462a.33.33 0 0 0 0 .481l4.42 4.214c.225.215.609.063.609-.24V4.703z"
  })
], -1), $ = [
  Y
], D = { class: "img-comp__image-wrapper" }, H = { class: "img-comp__figure" }, N = { class: "img-comp__picture" }, O = ["srcset"], R = ["srcset"], W = ["src"], q = { class: "img-comp__caption img-comp__caption--after" }, A = { class: "img-comp__caption-body" }, j = /* @__PURE__ */ v({
  __name: "ImgCompSlider",
  props: {
    img: {},
    beforeLabel: {},
    afterLabel: {},
    direction: { default: "horizontal" }
  },
  setup(d) {
    const _ = d, c = a(_.img[0] || null), m = a(_.img[1] || null), p = a(null), n = a(null), i = a(null), r = a(null), g = a(50), f = (t) => {
      if (!i.value || !r.value)
        return;
      let o = t.offsetY - 20;
      const s = i.value;
      t.offsetY <= s.offsetTop && (o = -20), t.offsetY >= s.offsetHeight && (o = s.offsetHeight - 20), r.value.style.top = `${o}px`;
    }, l = (t) => {
      const o = t.target;
      if (!i.value || !n.value)
        return;
      const s = o.value;
      i.value.style.left = `${s}%`, n.value.style.width = `${s}%`;
    }, h = (t) => {
      var o, s;
      if (t.type === "input") {
        (o = i.value) == null || o.classList.add("img-comp__range--active");
        return;
      }
      (s = i.value) == null || s.classList.remove("img-comp__range--active");
    };
    return w(() => {
      var o;
      const t = (o = p.value) == null ? void 0 : o.querySelector("#image-compare-range");
      t && !("ontouchstart" in window) && (t.addEventListener("mouseup", h), t.addEventListener("mousedown", f)), t == null || t.addEventListener("input", l), t == null || t.addEventListener("change", l);
    }), (t, o) => c.value && m.value ? (b(), y("section", {
      key: 0,
      class: "img-comp",
      ref_key: "imageComparisonSlider",
      ref: p
    }, [
      e("div", C, [
        V,
        L(e("input", {
          type: "range",
          min: "0",
          max: "100",
          "onUpdate:modelValue": o[0] || (o[0] = (s) => g.value = s),
          class: "img-comp__range",
          id: "image-compare-range",
          onInput: l,
          onChange: l
        }, null, 544), [
          [S, g.value]
        ]),
        e("div", {
          class: "img-comp__image-wrapper img-comp__image-wrapper--overlay",
          ref_key: "imageWrapperOverlay",
          ref: n
        }, [
          e("figure", k, [
            e("picture", M, [
              e("source", {
                srcset: c.value,
                media: "(max-width: 40em)"
              }, null, 8, B),
              e("source", {
                srcset: c.value,
                media: "(min-width: 40.0625em) and (max-width: 48em)"
              }, null, 8, z),
              e("img", {
                src: c.value,
                alt: "",
                class: "img-comp__image"
              }, null, 8, E)
            ]),
            e("figcaption", I, [
              e("span", T, u(t.beforeLabel), 1)
            ])
          ])
        ], 512),
        e("div", {
          class: "img-comp__slider",
          ref_key: "slider",
          ref: i
        }, [
          e("span", {
            class: "img-comp__thumb",
            ref_key: "thumb",
            ref: r
          }, $, 512)
        ], 512),
        e("div", D, [
          e("figure", H, [
            e("picture", N, [
              e("source", {
                srcset: m.value,
                media: "(max-width: 40em)"
              }, null, 8, O),
              e("source", {
                srcset: m.value,
                media: "(min-width: 40.0625em) and (max-width: 48em)"
              }, null, 8, R),
              e("img", {
                src: m.value,
                alt: "",
                class: "img-comp__image"
              }, null, 8, W)
            ]),
            e("figcaption", q, [
              e("span", A, u(t.afterLabel), 1)
            ])
          ])
        ])
      ])
    ], 512)) : x("", !0);
  }
});
export {
  j as ImgCompSlider
};
