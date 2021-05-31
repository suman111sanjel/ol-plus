import PluggableMap from "ol/PluggableMap";
PluggableMap.prototype.addThreddsLayer = function (LayerList) {
    for (var _i = 0, LayerList_1 = LayerList; _i < LayerList_1.length; _i++) {
        var l = LayerList_1[_i];
        this.addLayer(l);
    }
};
//# sourceMappingURL=PluggableMap.js.map