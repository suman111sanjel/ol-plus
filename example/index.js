import 'ol/ol.css';
import './main.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import TimeDimensionTile from "../src/ol/layer/TimeDimensionTile";
import {transform as ol_proj_transform, transformExtent} from "ol/proj";
import {getCenter} from "ol/extent";
import EDALSLD from "../src/ol/sld/EDALSLD";
import LayerSwitcher from '../src/ol/ui/LayerSwitcher'


var extent = transformExtent([60, 0, 100, 60], 'EPSG:4326', 'EPSG:3857');

var layers = [
    new TileLayer({
        source: new OSM({attributions: [],}),
    })
];
var map = new Map({
    layers: layers,
    target: 'map',
    view: new View({
        center: getCenter(extent),
        zoom: 4,
    }),
});

let allUrlList = [];

let files = ["Retro.20180101.nc", "Retro.20180111.nc", "Retro.20180121.nc", "Retro.20180201.nc", "Retro.20180211.nc", "Retro.20180221.nc", "Retro.20180301.nc", "Retro.20180311.nc", "Retro.20180321.nc", "Retro.20180401.nc", "Retro.20180411.nc", "Retro.20180421.nc", "Retro.20180501.nc", "Retro.20180511.nc", "Retro.20180521.nc", "Retro.20180601.nc", "Retro.20180611.nc", "Retro.20180621.nc", "Retro.20180701.nc", "Retro.20180711.nc", "Retro.20180721.nc", "Retro.20180801.nc", "Retro.20180811.nc", "Retro.20180821.nc", "Retro.20180901.nc", "Retro.20180911.nc", "Retro.20180921.nc", "Retro.20181001.nc", "Retro.20181011.nc", "Retro.20181021.nc", "Retro.20181101.nc", "Retro.20181111.nc", "Retro.20181121.nc", "Retro.20181201.nc", "Retro.20181211.nc", "Retro.20181221.nc"];

let WMSUrl = 'http://tethys.icimod.org:8080/thredds/wms/sldas/dekad/';
files.forEach(function (fi) {
    allUrlList.push(WMSUrl + fi);
});

var mm = new TimeDimensionTile({
    id: 'TrueColorImage',
    title: 'TrueColorImage',
    visible: false,
    opacity: 1,
    legendPath: 'http://tethys.icimod.org:8080/thredds/wms/sldas/dekad/Retro.20180101.nc?REQUEST=GetLegendGraphic&STYLES=default-scalar/x-Rainbow&LAYERS=Tair_f_tavg&COLORSCALERANGE=270,305',
    showlegend: true,
    ThreddsDataServerVersion: "5",
    timeSliderSize: 'small',
    alignTimeSlider: 'left',
    source: {
        url: allUrlList,
        params: {
            'VERSION': '1.1.1',
            'LAYERS': 'Tair_f_tavg',
            'STYLES': 'default-scalar/x-Rainbow',
            'COLORSCALERANGE': '270,305'
        }
    }
});


mm.init().then((val) => {
        let l1 = new LayerSwitcher(".layerCollection", mm, false, true);
        map.addThreddsLayer(val);
    },
    (error) => console.error(error));


// var kk = new TimeDimensionTile({
//     id: 'Tair_f_tavg',
//     title: 'Tair_f_tavg',
//     visible: true,
//     opacity: 1,
//     legendPath: 'http://tethys.icimod.org:8080/thredds/wms/sldas/dekad/Retro.20180101.nc?REQUEST=GetLegendGraphic&STYLES=default-scalar/x-Rainbow&LAYERS=Tair_f_tavg&COLORSCALERANGE=270,305',
//     showlegend: true,
//     ThreddsDataServerVersion: "5",
//     timeSliderSize: 'small',
//     alignTimeSlider:'left',
//     source: {
//         url: 'http://tethys.icimod.org:8080/thredds/wms/saldasforecast/monthly_std_mean.ncml',
//         params: {
//             'VERSION': '1.1.1',
//             'LAYERS': 'Tair_f_tavg',
//             'STYLES': 'default-scalar/x-Rainbow',
//             'COLORSCALERANGE': '270,305'
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

let SLDParam = {
    title: 'Air Temperature',
    showLegendTitle: false,
    parameterName: 'Tair_f_tavg',
    propForSLD: [{
        classType: 'Below',
        label: ["less than -5", ""],
        color: '#00000000',
        value: -5
    }, {
        label: ["-5 to -4.5", ""], color: '#9999FF',
        range: [-5, -4.5]
    }, {
        label: ["-4.5 to -4", ""], color: '#99A7FF',
        range: [-4.5, -4]
    }, {
        label: ["-4 to -3.5", ""], color: '#9CB6FF',
        range: [-4, -3.5]
    }, {
        label: ["-3.5 to -3", ""], color: '#9CC2FF',
        range: [-3.5, -3]
    }, {
        label: ["-3 to -2.5", ""], color: '#9CD1FF',
        range: [-3, -2.5]
    }, {
        label: ["-2.5 to -2", ""], color: '#9CDEFF',
        range: [-2.5, -2]
    }, {
        label: ["-2 to -1.5", ""], color: '#9CEDFF',
        range: [-2, -1.5]
    }, {
        label: ["-1.5 to -1", ""], color: '#99FCFF',
        range: [-1.5, -1]
    }, {
        label: ["-1 to -0.5", ""], color: '#A6FFF6',
        range: [-1, -0.5]
    }, {
        label: ["-0.5 to 0", ""], color: '#B5FFE6',
        range: [-0.5, 0]
    }, {
        label: ["0 to 0.5", ""], color: '#E1E1E1',
        range: [0, 0.5]
    }, {
        label: ["0.5 to 1", ""], color: '#E1E1E1',
        range: [0.5, 1]
    }, {
        label: ["1 to 1.5", ""], color: '#FFFFBE',
        range: [1, 1.5]
    }, {
        label: ["1.5 to 2", ""], color: '#FFEBAF',
        range: [1.5, 2]
    }, {
        label: ["2 to 2.5", ""], color: '#FFD37F',
        range: [2, 2.5]
    }, {
        label: ["2.5 to 3", ""], color: '#E69800',
        range: [2.5, 3]
    }, {
        label: ["3 to 3.5", ""], color: '#FF7F7F',
        range: [3, 3.5]
    }, {
        label: ["3.5 to 4", ""], color: '#E64C00',
        range: [3.5, 4]
    }, {
        label: ["4 to 4.5", ""], color: '#A83800',
        range: [4, 4.5]
    }, {
        label: ["4.5 to 5", ""], color: '#732600',
        range: [4.5, 5]
    }, {
        classType: 'Above',
        label: ["5 or more", ""], color: '#00000000',
        value: 5
    }],
}

let EdalSldObj = new EDALSLD(SLDParam);

var kk = new TimeDimensionTile({
    id: 'Tair_f_tavg',
    title: 'Tair_f_tavg',
    visible: true,
    opacity: 1,
    legendPath: 'http://tethys.icimod.org:8080/thredds/wms/sldas/dekad/Retro.20180101.nc?REQUEST=GetLegendGraphic&STYLES=default-scalar/x-Rainbow&LAYERS=Tair_f_tavg&COLORSCALERANGE=270,305',
    showlegend: true,
    ThreddsDataServerVersion: "5",
    timeSliderSize: 'small',
    alignTimeSlider: 'left',
    customLegendElement: EdalSldObj.getLegendHTMLElement(),
    showAnimationButton: true,
    source: {
        url: 'http://110.34.30.197:8080/thredds/wms/saldasforecast/monthly_std_mean.ncml',
        params: {
            'VERSION': '1.1.1',
            'LAYERS': SLDParam.parameterName,
            'SLD_BODY': EdalSldObj.getEDALSLD(),
        }
    },

});

kk.init().then((val) => {
        let l1 = new LayerSwitcher(".layerCollection", kk, true, true, 'withOpacSlider',true);
        map.addThreddsLayer(val);
    },
    (error) => console.error(error));


import 'ol-ext/control/Search.css';
import SearchNominatim from 'ol-ext/control/SearchNominatim';


// SearchJSON.prototype.select = function (f) {
//     console.log(f);
//   var c = f.geometry.coordinates;
//   // Add coordinate to the event
//   try {
//     c = ol_proj_transform (f.geometry.coordinates, 'EPSG:4326', this.getMap().getView().getProjection());
//   } catch(e) { /* ok */ }
//   this.dispatchEvent({ type:"select", search:f, coordinate: c });
// };

// Search.prototype._handleSelect = function (f, reverse, options) {
//     console.log(f);
//     if (!f) return;
//     // Save input in history
//     var hist = this.get('history');
//     // Prevent error on stringify
//     var i;
//     try {
//         var fstr = JSON.stringify(f);
//         for (i = hist.length - 1; i >= 0; i--) {
//             if (!hist[i] || JSON.stringify(hist[i]) === fstr) {
//                 hist.splice(i, 1);
//             }
//         }
//     } catch (e) {
//         for (i = hist.length - 1; i >= 0; i--) {
//             if (hist[i] === f) {
//                 hist.splice(i, 1);
//             }
//         }
//     }
//     hist.unshift(f);
//     var size = Math.max(0, this.get('maxHistory') || 10) || 0;
//     while (hist.length > size) {
//         hist.pop();
//     }
//     this.saveHistory();
//     // Select feature
//     this.select(f, reverse, null, options);
//     if (reverse) {
//         this.setInput(this._getTitleTxt(f));
//         this.drawList_();
//         setTimeout(function () {
//             this.collapse(false);
//         }.bind(this), 300);
//     }
// };






import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Circle from "ol/style/Circle";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import {Icon} from 'ol/style';
import {toSize} from 'ol/size';

import {getCenter as ol_extent_getCenter} from 'ol/extent'
import GeoJSON from "ol/format/GeoJSON";

// let imageIcon=require('./markers_default.png');
import ImageIcon from './markers_default.png'
// Current selection

// var sLayer = new VectorLayer({
//     source: new VectorSource(),
//     // style: new Style({
//     //     image: new Circle({
//     //         radius: 5,
//     //         stroke: new Stroke({
//     //             color: 'rgb(255,165,0)',
//     //             width: 3
//     //         }),
//     //         fill: new Fill({
//     //             color: 'rgba(255,165,0,.3)'
//     //         })
//     //     }),
//     //     stroke: new Stroke({
//     //         color: '#2b2bff',
//     //         width: 3,
//     //          lineDashOffset: 6
//     //     }),
//     //     fill: new Fill({
//     //         color: '#e5e5ff61'
//     //     })
//     // }),
//     style: [
//         new Style({
//             // image: new Icon({
//             //     anchor: [0.5, 46],
//             //     anchorXUnits: 'pixels',
//             //     anchorYUnits: 'pixels',
//             //    src: ImageIcon,
//             //     size:toSize([40,45])
//             // }),
//             stroke: new Stroke({
//                 color: [0, 0, 0, 0],
//                 opacity: 1,
//                 width: 3
//             }),
//             fill: new Fill({
//                 color: '#e5e5ff00'
//             })
//             // Commented to only see the lines
//             //,fill: new ol.style.Stroke ({
//             //  color: [155, 155, 155, 0.4]
//             //})
//         }),
//         // Dash white lines (second style, on the top)
//         new Style({
//             image: new Icon({
//                 anchor: [0.5, 46],
//                 anchorXUnits: 'fraction',
//                 anchorYUnits: 'pixels',
//                 src: ImageIcon,
//                 size: toSize([40, 45]),
//                 // offset:[20,20]
//             }),
//             stroke: new Stroke({
//                 color: [0, 0, 255, 1.0],
//                 opacity: 1,
//                 width: 3,
//                 lineDash: [4, 8, 4, 8]
//             }),
//             fill: new Fill({
//                 color: '#e5e5ff40'
//             })
//         })
//     ],
//     zIndex: 99
// });
// map.addLayer(sLayer);


// Set the control grid reference
var search = new SearchNominatim({
    // lang: "fr",		// Force preferred language
    polygon: true,
    reverse: false,
    position: true,	// Search, with priority to geo position,
    // maxHistory: -1,
    className: 'OSMBasedGeocodingEmissionPage',
    // copy: 'hello',
    // url: 'http://localhost:8000/apps/hkhbasins/getOSMBasedGeocoding',
    // getTitle: function (f) {
    //     return f.display_name;
    // },
    // onselect: function (f) {
    //     console.log(f);
    // },
});

// search.set('copy', false)

var GeoCodingAndDrawLayer = new VectorLayer({
    source: new VectorSource(),
    zIndex: 999
});
map.addLayer(GeoCodingAndDrawLayer);

map.addControl(search);



// Select feature when click on the reference index
search.on('select', function (e) {	// console.log(e);
    // GeoCodingAndDrawLayer.getSource().clear();
removePreviousSearchFeature();
    // Check if we get a geojson to describe the search
    if (e.search.geojson) {
        var format = new GeoJSON();
        var f = format.readFeature(e.search.geojson, {
            dataProjection: "EPSG:4326",
            featureProjection: map.getView().getProjection()
        });
        delete e.search.geojson;
        f.setProperties(e.search);
        GeoCodingAndDrawLayer.getSource().addFeature(f);
        var view = map.getView();
        var resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), map.getSize());
        var zoom = view.getZoomForResolution(resolution);
        var center = ol_extent_getCenter(f.getGeometry().getExtent());
        // redraw before zoom
        setTimeout(function () {
            view.animate({
                center: center,
                zoom: Math.min(zoom, 16)
            });
        }, 100);
    } else {
        map.getView().animate({
            center: e.coordinate,
            zoom: Math.max(map.getView().getZoom(), 16)
        });
    }

    UpDateVectorLayerStyle();
});

import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';

import OLLineString from 'ol/geom/LineString'
import OLPolygon from 'ol/geom/Polygon'
import OLGeoJSON from 'ol/format/GeoJSON'
import OlSelect from 'ol/interaction/Select'
import OlDraw from 'ol/interaction/Draw'
import OlExtTextButton from 'ol-ext/control/TextButton'
import Bar from 'ol-ext/control/Bar'
import OlExtButton from 'ol-ext/control/Button'
import OlExtToggle from 'ol-ext/control/Toggle';
import 'ol-ext/control/Bar.css'
import CircleStyle from "ol/style/Circle";


// Main control bar
var mainbar = new Bar();
map.addControl(mainbar);

// Edit control bar
var editbar = new Bar({
    toggleOne: true,	// one control active at the same time
    group: false			// group controls together
});
mainbar.addControl(editbar);

// Add selection tool:
//  1- a toggle control with a select interaction
//  2- an option bar to delete / get information on the selected feature
var sbar = new Bar();
sbar.addControl(new OlExtButton({
    html: '<i class="fa fa-times"></i>',
    title: "Delete",
    handleClick: function () {
        var features = selectCtrl.getInteraction().getFeatures();
        if (!features.getLength()) info("Select an object first...");
        else info(features.getLength() + " object(s) deleted.");
        features.forEach(function (f) {

             GeoCodingAndDrawLayer.getSource().removeFeature(f);
        });
        selectCtrl.getInteraction().getFeatures().clear();
    }
}));


var selectCtrl = new OlExtToggle({
    html: '<i class="fa fa-hand-pointer"></i>',
    title: "Select",
    interaction: new OlSelect({
        hitTolerance: 2,
        style: new Style({
            image: new CircleStyle({
                radius: 5,
                stroke: new Stroke({
                    color: [255, 0, 0, 1],
                    opacity: 1,
                    width: 2
                }),
                fill: new Fill({
                    color: '#e5e5ff50'
                }),
            }),
            stroke: new Stroke({
                color: [255, 0, 0, 1],
                opacity: 1,
                width: 2
            }),
            fill: new Fill({
                color: '#e5e5ff50'
            })
            // Commented to only see the lines
            //,fill: new ol.style.Stroke ({
            //  color: [155, 155, 155, 0.4]
            //})
        })
    }),
    bar: sbar,
    autoActivate: true,
    active: true
});

editbar.addControl(selectCtrl);

// Add editing tools
var pedit = new OlExtToggle({
    html: '<i class="fa fa-map-marker-alt" ></i>',
    title: 'Point',
    interaction: new OlDraw({
        type: 'Point',
        source: GeoCodingAndDrawLayer.getSource()
    })
});
editbar.addControl(pedit);


var fedit = new OlExtToggle({
    html: '<i class="fa fa-draw-polygon" ></i>',
    title: 'Polygon',
    interaction: new OlDraw({
        type: 'Polygon',
        source: GeoCodingAndDrawLayer.getSource(),
        // Count inserted points
        geometryFunction: function (coordinates, geometry) {
            this.nbpts = coordinates[0].length;
            if (geometry) geometry.setCoordinates([coordinates[0].concat([coordinates[0][0]])]);
            else geometry = new OLPolygon(coordinates);
            return geometry;
        }
    }),
    // Options bar ssociated with the control
    bar: new Bar({
        controls: [new OlExtTextButton({
            html: 'undo',//'<i class="fa fa-mail-reply"></i>',
            title: "undo last point",
            handleClick: function () {
                if (fedit.getInteraction().nbpts > 1) fedit.getInteraction().removeLastPoint();
            }
        }),
            new OlExtTextButton({
                html: 'finish',
                title: "finish",
                handleClick: function () {
                    // Prevent null objects on finishDrawing
                    if (fedit.getInteraction().nbpts > 3) fedit.getInteraction().finishDrawing();
                }
            })
        ]
    })
});
editbar.addControl(fedit);


// // Add editing tools
// var clearAll = new OlExtToggle({
//     html: '<i class="fa fa-trash" ></i>',
//     title: 'Clear all',
//     // Options bar ssociated with the control
//     bar: new Bar({
//         controls: [new OlExtTextButton({
//             html: 'Clear all',//'<i class="fa fa-mail-reply"></i>',
//             title: "Clear all",
//             handleClick: function () {
//                 var features = selectCtrl.getInteraction().getFeatures();
//                 if (!features.getLength()) info("Select an object first...");
//                 else info(features.getLength() + " object(s) deleted.");
//                 // for (var i = 0, f; f = features.item(i); i++) {
//                 //     GeoCodingAndDrawLayer.getSource().removeFeature(f);
//                 // }
//                 GeoCodingAndDrawLayer.getSource().clear();
//                 selectCtrl.getInteraction().getFeatures().clear();
//             }
//         })
//         ]
//     })
// });
// editbar.addControl(clearAll);


// Show info
function info(i) {
    console.log(i);
    // document.querySelector("#info").innerHTML(i || "");
}


function UpDateVectorLayerStyle() {
    GeoCodingAndDrawLayer.getSource().forEachFeature(function (feature) {
        let StyleObj = null;
        if (feature.getProperties().osm_id) {
            StyleObj = [
                new Style({
                    // image: new Icon({
                    //     anchor: [0.5, 46],
                    //     anchorXUnits: 'pixels',
                    //     anchorYUnits: 'pixels',
                    //    src: ImageIcon,
                    //     size:toSize([40,45])
                    // }),
                    stroke: new Stroke({
                        color: [0, 0, 0, 0],
                        opacity: 1,
                        width: 3
                    }),
                    fill: new Fill({
                        color: '#e5e5ff00'
                    })
                    // Commented to only see the lines
                    //,fill: new ol.style.Stroke ({
                    //  color: [155, 155, 155, 0.4]
                    //})
                }),
                // Dash white lines (second style, on the top)
                new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: ImageIcon,
                        size: toSize([40, 45]),
                        // offset:[20,20]
                    }),
                    stroke: new Stroke({
                        color: [0, 0, 255, 1.0],
                        opacity: 1,
                        width: 3,
                        lineDash: [4, 8, 4, 8]
                    }),
                    fill: new Fill({
                        color: '#e5e5ff40'
                    })
                })
            ];

        } else {
            StyleObj = new Style({
                image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({
                        color: [255, 0, 0, 1],
                        opacity: 1,
                        width: 2
                    }),
                    fill: new Fill({
                        color: '#e5e5ff50'
                    }),
                }),
                stroke: new Stroke({
                    color: [255, 0, 0, 1],
                    opacity: 1,
                    width: 2
                }),
                fill: new Fill({
                    color: '#e5e5ff50'
                })
                // Commented to only see the lines
                //,fill: new ol.style.Stroke ({
                //  color: [155, 155, 155, 0.4]
                //})
            });

        }
        feature.setStyle(StyleObj);

        // var ward_no = parseInt(feature.get('new_ward_n'));
        // if (ward_no == ward) {
        //     map.getView().fit(feature.getGeometry().getExtent(), map.getSize());
        //     var stylee = new ol.style.Style({
        //         fill: new ol.style.Fill({
        //             color: '#00000000'
        //         }),
        //         stroke: new ol.style.Stroke({
        //             color: '#1a15d3',
        //             width: 2
        //         }),
        //         text: new ol.style.Text({
        //             text: feature.get('new_ward_n').toString(),
        //             font: '30px Calibri,sans-serif',
        //             fill: new ol.style.Fill({
        //                 color: '#47eae2'
        //             }),
        //             stroke: new ol.style.Stroke({
        //                 color: '#2c7dff',
        //                 width: 1
        //             })
        //         }),
        //         zIndex: 1,
        //     });
        //
        //     feature.setStyle(stylee);
        // } else {
        //     var stylee = new ol.style.Style({
        //         fill: new ol.style.Fill({
        //             color: '#00000000'
        //         }),
        //         stroke: new ol.style.Stroke({
        //             color: '#a7a8ba',
        //             width: 1
        //         }),
        //         text: new ol.style.Text({
        //             text: feature.get('new_ward_n').toString(),
        //             font: '12px Calibri,sans-serif',
        //             fill: new ol.style.Fill({
        //                 color: '#15d518'
        //             }),
        //             stroke: new ol.style.Stroke({
        //                 color: '#000000',
        //                 width: 1
        //             })
        //         })
        //     });
        //
        //     feature.setStyle(stylee);
        // }

    });
}

function removePreviousSearchFeature() {
    var features = GeoCodingAndDrawLayer.getSource().getFeatures();
    features.forEach(function (f) {
        if (f.getProperties().osm_id) {
            GeoCodingAndDrawLayer.getSource().removeFeature(f);
        }

    });
    // console.log(features);
}
