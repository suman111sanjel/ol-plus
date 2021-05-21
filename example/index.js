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
    new TileLayer({
        source: new OSM({attributions: [],}),
    }),
    new TileLayer({
        extent: [-13884991, 2870341, -7455066, 6338219],
        source: new TileWMS({
            url: 'https://ahocevar.com/geoserver/wms',
            params: {'LAYERS': 'topp:states', 'TILED': true},
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
        }),
    })];
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
    legendPath: 'http://tethys.icimod.org:8080/thredds/wms/HIWAT/2021051912/hkhEnsemble_202105191200_hourly_latlon.nc?REQUEST=GetLegendGraphic&PALETTE=default&LAYERS=enspmm-prec1h&STYLES=colored_contours/default',
    showlegend: true,
    ThreddsDataServerVersion: "5",
    // timeSliderSize: 'small',
    // alignTimeSlider:'left',
    source: {
        url: "http://tethys.icimod.org:8080/thredds/wms/HIWAT/2021051912/hkhEnsemble_202105191200_hourly_latlon.nc",
        params: {
            'VERSION': '1.1.1',
            'LAYERS': 'enspmm-prec1h',
            'STYLES': 'default-scalar/x-Rainbow',
            'COLORSCALERANGE': '0,20'
        }
    }
});


mm.init().then((val) => map.addThreddsLayer(val),
    (error) => console.error(error));

//
// var bb = new TimeDimensionTile({
//     id: 'TrueColorImage',
//     title: 'TrueColorImage',
//     visible: true,
//     opacity: 1,
//     legendPath: 'http://tethys.icimod.org:8080/thredds/wms/HIWAT/2021051912/hkhEnsemble_202105191200_hourly_latlon.nc?REQUEST=GetLegendGraphic&PALETTE=default&LAYERS=enspmm-prec1h&STYLES=colored_contours/default',
//     showlegend: true,
//     ThreddsDataServerVersion: "5",
//     // timeSliderSize: 'small',
//     // alignTimeSlider:'left',
//     source: {
//         url: "http://tethys.icimod.org:8080/thredds/wms/HIWAT/2021051912/hkhEnsemble_202105191200_hourly_latlon.nc",
//         params: {
//             'VERSION': '1.1.1',
//             'LAYERS': 'enspmm-prectot',
//             'STYLES': 'default-scalar/x-Rainbow',
//             'COLORSCALERANGE': '0,100'
//         }
//     }
// });
//
//
// bb.init().then((val) => map.addThreddsLayer(val),
//     (error) => console.error(error));

//
// var kk = new TimeDimensionTile({
//     id: 'TrueColorImage',
//     title: 'TrueColorImage',
//     visible: true,
//     opacity: 1,
//     legendPath: "http://tethys.icimod.org:8080/thredds/wms/HIWAT/2021051712/hkhEnsemble_202105171200_hourly_latlon.nc?REQUEST=GetLegendGraphic&PALETTE=default&LAYERS=enspmm-prec1h&STYLES=default-scalar/default",
//     showlegend: true,
//     ThreddsDataServerVersion: "5",
//     // timeSliderSize: 'small',
//     // alignTimeSlider:'right',
//     source: {
//         url: "http://tethys.icimod.org:8080/thredds/wms/HIWAT/2021051712/hkhEnsemble_202105171200_hourly_latlon.nc",
//         params: {
//             'VERSION': '1.1.1',
//             'LAYERS': 'enspmm-prec1h',
//             'STYLES': 'default-scalar/x-Rainbow',
//             'COLORSCALERANGE': '0,100'
//         }
//     }
// });
//
//
// kk.init().then((val) => map.addThreddsLayer(val),
//     (error) => console.error(error));


// function renderThreddsLayer() {
//
// }