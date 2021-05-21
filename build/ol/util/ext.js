/*global ol*/
if (window.ol && !ol.tdl) {
    ol.tdl = {};
}
/** Inherit the prototype methods from one constructor into another.
 * replace deprecated ol method
 */
var ol_tdl_inherits = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
};
// Compatibilty with ol > 5 to be removed when v6 is out
if (window.ol) {
    if (!ol.inherits)
        ol.inherits = ol_tdl_inherits;
}
/* IE Polyfill */
// NodeList.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
// Element.remove
if (window.Element && !Element.prototype.remove) {
    Element.prototype.remove = function () {
        if (this.parentNode)
            this.parentNode.removeChild(this);
    };
}
/* End Polyfill */
export { ol_tdl_inherits };
export default ol_tdl_inherits;
//# sourceMappingURL=ext.js.map