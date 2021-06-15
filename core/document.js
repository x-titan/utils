import is from "./types.js"
import * as css from "./css.js"

//#region Types
/** @typedef {HTMLElement | HTMLDivElement | Element} targetElements */
//#endregion

let g = globalThis, warn = () => console.warn("Error in search function", "Error init document.js")
/**
 * @function
 * @param {string} query
 * @param {targetElements | HTMLDocument | Document} primary
 * @return {targetElements | HTMLDocument | Document}
 */
let search = () => warn.bind(null)

if (is.obj(g.document) && is.obj(g.window))
  try {
    const $d = document
    /**
     * @param {string} query
     * @param {targetElements | HTMLDocument | Document} primary
     */
    search = function search(query, primary = $d) { return primary.querySelector(query) }
    /**
     * @param {string} query
     * @param {targetElements | HTMLDocument | Document} primary
     */
    search.all = function (query, primary = $d) { return primary.querySelectorAll(query) }
    /**
     * @param {string} query
     * @param {targetElements | HTMLDocument | Document} primary
     */
    search.id = function searchId(query, primary = $d) { return primary.getElementById(query) }
    search.newElement = $d.createElement; (fn => search.newElement = fn.bind($d))($d.createElement);
    /** @param {targetElements} target */
    search.scrollTo = target => target.scrollIntoView({ behavior: "smooth" });
  } catch (error) { console.warn(error) }
else warn()
export { search, css }