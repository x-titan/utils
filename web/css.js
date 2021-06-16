import each from "../core/each.js";
import is from "../core/types.js";

//#region Types
/** @typedef {HTMLElement | HTMLDivElement | Element} targetElements */
//#endregion

let g = globalThis, warn = () => console.warn("Error init css.js")
let css = {}
if (is.obj(g.document) && is.obj(g.window))
  try {
    /**
     * @param {targetElements} target
     * @param {CSSStyleDeclaration} css
     */
    css.add = (target, css) => { if (is.array(css)) return target.classList.add(...css); target.classList.add(css) }
    /**
     * @param {targetElements} target
     * @param {CSSStyleDeclaration} css
     */
    css.remove = (target, css) => { if (is.array(css)) return target.classList.remove(...css); target.classList.remove(css) }
    /**
     * @param {targetElements} target
     * @param {CSSStyleDeclaration} css
     */
    css.contains = (target, css) => { if (is.array(css)) return false; return target.classList.contains(css) }
    /**
     * @param {targetElements} target
     * @param {CSSStyleDeclaration} css
     */
    css.toggle = (target, css) => { if (is.array(css)) return target.classList.toggle(...css); target.classList.toggle(css) }
    /**
     * @param {HTMLElement | HTMLDivElement} target
     * @param {CSSStyleDeclaration} css
     */
    const z = (x, y) => { if (!(x instanceof HTMLElement && is.obj(y))) throw new Error("Bad arguments"); return y },
      styler = (target, css) => { each.obj(z(target, css), (x, y) => { target.style[y] = x }); return target },
      set = (target, css) => { each.obj(z(target, css), (x, y) => target.style.setProperty(y, x)); return target };
    styler.set = set; css.styler = styler;
  } catch (error) { console.warn(error) }
else warn()
export default Object.freeze(css)