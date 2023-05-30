import PluggableMap from "ol/PluggableMap";
import TimeDimensionTile from "./layer/TimeDimensionTile";
import Control from "ol/control/Control";

import {createDiv} from "../ol/ui/UI";

PluggableMap.prototype.addThreddsLayer = function (TimeDimensionTileObj) {
    let LayerList = TimeDimensionTileObj.AllLayersList;


    if(!TimeDimensionTileObj.isControlAdded){
                this.addControl(
            new Control({
                element: TimeDimensionTileObj.timeLayerLedgendDiv
            })
        );
                this.addControl(
            new Control({
                element: TimeDimensionTileObj.timeSliderDiv
            })
        );
        TimeDimensionTileObj.isControlAdded=true;
    }
    for (let l of LayerList) {
        this.addLayer(l);
    }

};
