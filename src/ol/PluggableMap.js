import PluggableMap from "ol/PluggableMap";


PluggableMap.prototype.addThreddsLayer = function (LayerList) {
    for (let l of LayerList) {
        this.addLayer(l);
    }
};