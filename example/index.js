import 'ol/ol.css';
import './main.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import TimeDimensionTile from "../src/ol/layer/TimeDimensionTile";
import {transformExtent} from "ol/proj";
import {getCenter} from "ol/extent";

var extent = transformExtent([60, 0, 100, 60], 'EPSG:4326', 'EPSG:3857');

var layers = [
    // new TileLayer({
    //     source: new OSM({attributions: [],}),
    // })
];
var map = new Map({
    layers: layers,
    target: 'map',
    view: new View({
        center: getCenter(extent),
        zoom: 4,
    }),
});

var mm = new TimeDimensionTile({
    id: 'TrueColorImage',
    title: 'TrueColorImage',
    visible: true,
    opacity: 1,
    legendPath: 'http://tethys.icimod.org:8080/thredds/wms/saldasforecast/monthly_std_mean.ncml?REQUEST=GetLegendGraphic&STYLES=default-scalar/x-Rainbow&LAYERS=Evap_tavg&COLORSCALERANGE=-2,2',
    showlegend: true,
    ThreddsDataServerVersion: "5",
    timeSliderSize: 'small',
    alignTimeSlider:'left',
    source: {
        url: "http://tethys.icimod.org:8080/thredds/wms/saldasforecast/monthly_std_mean.ncml",
        params: {
            'VERSION': '1.1.1',
            'LAYERS': 'Evap_tavg',
            'STYLES': 'default-scalar/x-Rainbow',
            'COLORSCALERANGE': '-2,2'
        }
    }
});


mm.init().then((val) => map.addThreddsLayer(val),
    (error) => console.error(error));


// function renderThreddsLayer() {
//
// }