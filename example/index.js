import 'ol/ol.css';
import './main.css';
import Map from 'ol/Map';
import '../src/ol/PluggableMap';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import TimeDimensionTile from "../src/ol/layer/TimeDimensionTile";
import {transform as ol_proj_transform, transformExtent} from "ol/proj";
import {getCenter} from "ol/extent";
import EDALSLD from "../src/ol/sld/EDALSLD";
import LayerSwitcher from '../src/ol/ui/LayerSwitcher';

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
        source: {
            url: 'http://110.34.30.197:8080/thredds/wms/saldasforecast/monthly_std_mean.ncml',
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
        },
        (error) => console.error(error));


    var jj = new TimeDimensionTile({
        id: 'Tair_f_tavg11',
        title: 'Tair_f_tavg111',
        visible: true,
        opacity: 1,
        legendPath: 'http://tethys.icimod.org:8080/thredds/wms/sldas/dekad/Retro.20180101.nc?REQUEST=GetLegendGraphic&STYLES=default-scalar/x-Rainbow&LAYERS=Tair_f_tavg&COLORSCALERANGE=270,305',
        showlegend: true,
        ThreddsDataServerVersion: "5",
        timeSliderSize: 'small',
        alignTimeSlider: 'left',
        showAnimationButton: true,
        source: {
            url: 'http://tethys.icimod.org:8080/thredds/wms/HIWAT/2022031612/hkhControl_202203161200_latlon.nc',
            params: {
                'VERSION': '1.1.1',
                // 'LAYERS': SLDParam.parameterName,
                // 'SLD_BODY': EdalSldObj.getEDALSLD(),
                TRANSPARENT: 'TRUE',
                STYLES: 'default-scalar/default',
                LAYERS: 'PRMSL_meansealevel',
                TIME: '2022-03-17T00:00:00.000Z',
                COLORSCALERANGE: '995.4,1026',
                NUMCOLORBANDS: '250',
                ABOVEMAXCOLOR: 'extend',
                BELOWMINCOLOR: 'extend',
                BGCOLOR: 'extend',
                LOGSCALE: false,
            }
        },
    });

    await jj.init().then(() => {
            let l1 = new LayerSwitcher(".layerCollection", jj, true, true, 'withOpacSlider', true);
            map.addThreddsLayer(jj);
            console.log('t2');
        },
        (error) => console.error(error));


    console.log("after adding the THredds Layer");


    let threddsLayerProp = {
        "id":"Archive__GEOS_PM2p5",
        "title": "GEOS PM2.5",
        "visible": false,
        "opacity": 0.5,
        "ThreddsDataServerVersion":    5,
        "serverType":
            "TDS",
        "timeSeries":
            false,
        "alignTimeSlider":
            "left",
        "timeSliderSize":
            "small",
        "showlegend":
            false,
        "showControlPanel":
            true,
        "source":
            {
                "url":
                    ["http://smog.icimod.org:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/Geos-PM2p5-2022-03-16-00-30.nc", "http://smog.icimod.org:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/Geos-PM2p5-2022-03-16-06-30.nc"],
                "params":
                    {
                        "LAYERS":
                            "PM2p5", "STYLES":
                            "default-scalar/x-Rainbow", "COLORSCALERANGE":
                            "0,100", "transparent":
                            true
                    }
            }
        ,
        "unit":
            "µg/m<sup>3<sup>",
        "mask":
            false,
        "CropOrMask":
            "crop",
        "changeWMSProxy":
            true,
        "filterCoodrdinate":
            {}
        ,
        "aoi":
            true,
        "zIndex":
            11,
        "api":
            {
                "GetImage":
                    "/apps/airqualitynp/downloadImage/"
            }
        ,
        "chartDetail":
            {
                "title":
                    "GEOS", "unit":
                    "PM<sub>2.5</sub>(µg/m<sup>3</sup>)", "SeriesName":
                    "value"
            }
        ,
        "legendPath":
            "http://smog.icimod.org:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/Geos-PM2p5-2022-03-16-00-30.nc?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=PM2p5&COLORSCALERANGE=0,100&STYLES=default-scalar/x-Rainbow",
        "wmsList":
            ["http://smog.icimod.org:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/Geos-PM2p5-2022-03-16-00-30.nc", "http://smog.icimod.org:8080/thredds/wms/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/Geos-PM2p5-2022-03-16-06-30.nc"]
    }





    var jjlk = new TimeDimensionTile(threddsLayerProp);
    await jjlk.init().then(() => {
            let l1 = new LayerSwitcher(".layerCollection", jjlk, true, true, 'withOpacSlider', true);
            map.addThreddsLayer(jjlk);
            console.log('t2');
        },
        (error) => console.error(error));

    jjlk.on('change:visible', function () {
        console.log(this.getProperties());
        if(this.getProperties().visible){
            console.log('true');
        }else{
             console.log('false');
        }
        console.log('change:visible');
    });

    jjlk.on('change', function () {
        console.log('change');
    });
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep(fn) {
    // await timeout(5000);
    return fn();
}


document.addEventListener('DOMContentLoaded', async (event) => {
    //the event occurred
    // await initMap();

    sleep(initMap);

})