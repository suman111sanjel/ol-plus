import 'ol/ol.css';
import './main.css';
import '../src/ol/layer/threddsDataserver.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';

import '../src/ol/PluggableMap';
import TileWMS from 'ol/source/TileWMS';
import {transform as ol_proj_transform, transformExtent} from "ol/proj";
import {getCenter} from "ol/extent";
import EDALSLD from "../src/ol/sld/EDALSLD";
import LayerSwitcher from '../src/ol/ui/LayerSwitcher';

import TimeDimensionTile from "../src/ol/layer/TimeDimensionTile";


async function initMap() {
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


    let SLDParam = {
        title: 'Air Temperature',
        showLegendTitle: false,
        parameterName: 'PM2p5',
        propForSLD: [{
            classType: 'Below',
            label: ["less than -5", ""],
            color: '#acacff',
            value: 0
        }, {
            label: ["0 to 10", ""], color: '#9999FF',
            range: [0, 10]
        }, {
            label: ["10 to 20", ""], color: '#99A7FF',
            range: [10, 20]
        }, {
            label: ["20 to 30", ""], color: '#9CB6FF',
            range: [20, 30]
        }, {
            label: ["30 to 40", ""], color: '#9CC2FF',
            range: [30, 40]
        }, {
            label: ["40 to 50", ""], color: '#9CD1FF',
            range: [40, 50]
        }, {
            label: ["50 to 60", ""], color: '#9CDEFF',
            range: [50, 60]
        }, {
            label: ["60 to 70", ""], color: '#9CEDFF',
            range: [60, 70]
        }, {
            label: ["70 to 80", ""], color: '#99FCFF',
            range: [70, 80]
        }, {
            label: ["80 to 90", ""], color: '#A6FFF6',
            range: [80, 90]
        }, {
            label: ["90 to 100", ""], color: '#B5FFE6',
            range: [90, 100]
        }, {
            label: ["100 to 110", ""], color: '#E1E1E1',
            range: [100, 110]
        }, {
            label: ["110 to 120", ""], color: '#E1E1E1',
            range: [110, 120]
        }, {
            label: ["120 to 130", ""], color: '#FFFFBE',
            range: [120, 130]
        }, {
            label: ["130 to 140", ""], color: '#FFEBAF',
            range: [130, 140]
        }, {
            label: ["140 to 150", ""], color: '#FFD37F',
            range: [140, 150]
        }, {
            label: ["150 to 160", ""], color: '#E69800',
            range: [150, 160]
        }, {
            label: ["160 to 170", ""], color: '#FF7F7F',
            range: [160, 170]
        }, {
            label: ["170 to 180", ""], color: '#E64C00',
            range: [170, 180]
        }, {
            label: ["180 to 190", ""], color: '#A83800',
            range: [180, 190]
        }, {
            label: ["190 to 200", ""], color: '#732600',
            range: [190, 200]
        }, {
            classType: 'Above',
            label: ["200 or more", ""], color: '#421700',
            value: 200
        }],
    }

    let EdalSldObj = new EDALSLD(SLDParam);
    console.log("before adding layers");

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
        animationDownloadFunction: function (obj) {
            let isProcessing = obj.getIsProcessing();
            if (!isProcessing) {
                console.log("test");
                console.log(isProcessing);
                obj.setIsProcessing(true);
            }
        },
        showControlPanel: true,
        defaultTimeZone: 'local',
        source: {
            url: 'http://smog.icimod.org:8080/thredds/wms/Agg/GEOS-Model-PM2p5.nc',
            params: {
                'VERSION': '1.1.1',
                'LAYERS': SLDParam.parameterName,
                'SLD_BODY': EdalSldObj.getEDALSLD(),
            }
        },
    });

    await kk.init().then(() => {
            let l1 = new LayerSwitcher(".layerCollection", kk, true, true, 'withOpacSlider', true);
            map.addThreddsLayer(kk);
            console.log('t1');
            kk.setVisible(true);
        },
        (error) => console.error(error));

    //
    // var jj = new TimeDimensionTile({
    //     id: 'Tair_f_tavg11',
    //     title: 'Tair_f_tavg111',
    //     visible: false,
    //     opacity: 1,
    //     legendPath: 'http://tethys.icimod.org:8080/thredds/wms/sldas/dekad/Retro.20180101.nc?REQUEST=GetLegendGraphic&STYLES=default-scalar/x-Rainbow&LAYERS=Tair_f_tavg&COLORSCALERANGE=270,305',
    //     showlegend: true,
    //     ThreddsDataServerVersion: "5",
    //     timeSliderSize: 'small',
    //     alignTimeSlider: 'right',
    //     showAnimationButton: false,
    //     showControlPanel: true,
    //     source: {
    //         url: 'http://smog.icimod.org:8080/thredds/wms/Agg/GEOS-Model-O3.nc',
    //         params: {
    //             'VERSION': '1.1.1',
    //             // 'LAYERS': SLDParam.parameterName,
    //             // 'SLD_BODY': EdalSldObj.getEDALSLD(),
    //             TRANSPARENT: 'TRUE',
    //             STYLES: 'default-scalar/default',
    //             LAYERS: 'O3',
    //             COLORSCALERANGE: '0,100',
    //             NUMCOLORBANDS: '250',
    //             ABOVEMAXCOLOR: 'extend',
    //             BELOWMINCOLOR: 'extend',
    //             BGCOLOR: 'extend',
    //             LOGSCALE: false,
    //         }
    //     },
    // });
    //
    // await jj.init().then(() => {
    //         let l1 = new LayerSwitcher(".layerCollection", jj, true, true, 'withOpacSlider', true);
    //         l1.setVisibleDivBind(true);
    //         map.addThreddsLayer(jj);
    //         console.log('t2');
    //     },
    //     (error) => console.error(error));


    // var jjkk = new TimeDimensionTile({
    //     id: 'Tair_f_tavg11asdfasd',
    //     title: 'Tair_f_tavg111asdfasdf',
    //     visible: false,
    //     opacity: 1,
    //     legendPath: 'http://tethys.icimod.org:8080/thredds/wms/sldas/dekad/Retro.20180101.nc?REQUEST=GetLegendGraphic&STYLES=default-scalar/x-Rainbow&LAYERS=Tair_f_tavg&COLORSCALERANGE=270,305',
    //     showlegend: true,
    //     ThreddsDataServerVersion: "5",
    //     timeSliderSize: 'small',
    //     alignTimeSlider: 'right',
    //     showAnimationButton: false,
    //
    //     showControlPanel: true,
    //     source: {
    //         url: 'http://smog.icimod.org:8080/thredds/wms/Agg/GEOS-Model-O3.nc',
    //         params: {
    //             'VERSION': '1.1.1',
    //             // 'LAYERS': SLDParam.parameterName,
    //             // 'SLD_BODY': EdalSldObj.getEDALSLD(),
    //             TRANSPARENT: 'TRUE',
    //             STYLES: 'default-scalar/default',
    //             LAYERS: 'O3',
    //             COLORSCALERANGE: '0,100',
    //             NUMCOLORBANDS: '250',
    //             ABOVEMAXCOLOR: 'extend',
    //             BELOWMINCOLOR: 'extend',
    //             BGCOLOR: 'extend',
    //             LOGSCALE: false,
    //         }
    //     },
    // });
    //
    // await jjkk.init().then(() => {
    //         let l1 = new LayerSwitcher(".layerCollection", jjkk, true, true, 'withOpacSlider', true);
    //         l1.setVisibleDivBind(true);
    //         map.addThreddsLayer(jjkk);
    //         console.log('t2');
    //     },
    //     (error) => console.error(error));

}

initMap();

//
// function timeout(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
//
// async function sleep(fn) {
//     // await timeout(5000);
//     return fn();
// }
//
//
// document.addEventListener('DOMContentLoaded', async (event) => {
//     //the event occurred
//     // await initMap();
//
//     sleep(initMap);
//
// })

