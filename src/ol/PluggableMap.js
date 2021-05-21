import PluggableMap from "ol/PluggableMap";

/**
 *
 * @param {*} LayerList
 */
PluggableMap.prototype.addThreddsLayer = function (LayerList) {
    for (let l of LayerList) {
        this.addLayer(l);
    }
};