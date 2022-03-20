import PluggableMap from "ol/PluggableMap";
import Control from "ol/control/Control";
PluggableMap.prototype.addThreddsLayer = function (TimeDimensionTileObj) {
    var LayerList = TimeDimensionTileObj.AllLayersList;
    if (!TimeDimensionTileObj.isControlAdded) {
        this.addControl(new Control({
            element: TimeDimensionTileObj.timeLayerLedgendDiv
        }));
        this.addControl(new Control({
            element: TimeDimensionTileObj.timeSliderDiv
        }));
        TimeDimensionTileObj.isControlAdded = true;
    }
    for (var _i = 0, LayerList_1 = LayerList; _i < LayerList_1.length; _i++) {
        var l = LayerList_1[_i];
        this.addLayer(l);
    }
};
//# sourceMappingURL=PluggableMap.js.map