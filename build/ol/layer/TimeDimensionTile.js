var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * @module ol/layer/TimeDimensionTile
 */
// import ol_ext_inherits from '../util/ext'
import LayerGroup from 'ol/layer/Group.js';
import "../iso8601";
import "./threddsDataserver.css";
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import PluggableMap from "ol/PluggableMap";
/**
 * @classdesc
 * This layer is used for the visualization of time series data
 *
 * @api
 */
var TimeDimensionTile = /** @class */ (function (_super) {
    __extends(TimeDimensionTile, _super);
    /**
     *
     * @param {Object} params
     */
    function TimeDimensionTile(params) {
        var _this = _super.call(this) || this;
        _this.param = params;
        _this.opacity = '';
        _this.AllLayersList = [];
        _this.AllDateAndTimeList = [];
        _this.loading = 0;
        _this.loaded = 0;
        _this.t0 = '';
        _this.ParentDivWidth = 676;
        _this.frameIntervalMS = 1000;
        _this.initilizationStatus = false;
        _this.maskObjList = [];
        return _this;
    }
    /**
     * Array of Layers
     * @returns {Array<Object>}
     */
    TimeDimensionTile.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var index, _i, _a, WMSURL, index, _b, _c, WMSURL;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.param.opacity) {
                            this.opacity = this.param.opacity;
                        }
                        else {
                            this.opacity = 1;
                        }
                        if (!(this.param.ThreddsDataServerVersion == 5)) return [3 /*break*/, 8];
                        if (!Array.isArray(this.param.source.url)) return [3 /*break*/, 5];
                        index = 0;
                        _i = 0, _a = this.param.source.url;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        WMSURL = _a[_i];
                        return [4 /*yield*/, this.collectDateAndTime(this.param.source.url[index], index)];
                    case 2:
                        _d.sent();
                        index = index + 1;
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.collectDateAndTime(this.param.source.url, 0)];
                    case 6:
                        _d.sent();
                        _d.label = 7;
                    case 7: return [3 /*break*/, 17];
                    case 8:
                        if (!(this.param.ThreddsDataServerVersion == 4)) return [3 /*break*/, 16];
                        if (!Array.isArray(this.param.source.url)) return [3 /*break*/, 13];
                        index = 0;
                        _b = 0, _c = this.param.source.url;
                        _d.label = 9;
                    case 9:
                        if (!(_b < _c.length)) return [3 /*break*/, 12];
                        WMSURL = _c[_b];
                        return [4 /*yield*/, this.collectDateAndTimeThredd4(this.param.source.url[index], index)];
                    case 10:
                        _d.sent();
                        index = index + 1;
                        _d.label = 11;
                    case 11:
                        _b++;
                        return [3 /*break*/, 9];
                    case 12: return [3 /*break*/, 15];
                    case 13: return [4 /*yield*/, this.collectDateAndTimeThredd4(this.param.source.url, 0)];
                    case 14:
                        _d.sent();
                        _d.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        console.error("Please Provide Properties with key \"ThreddsDataServerVersion\", value should be 5 for TDS version 5 and 4 for TDS version 4");
                        _d.label = 17;
                    case 17:
                        this.createLayers();
                        this.layerVisibilityInitiliazation();
                        this.addLayerPrototypeOfMap();
                        this.initilizationStatus = true;
                        return [2 /*return*/, this.AllLayersList];
                }
            });
        });
    };
    ;
    /**
     * this method is generally used GET Method
     * @param {*} method
     * @param {*} url
     * @returns {Object}
     */
    TimeDimensionTile.prototype.makeRequest = function (method, url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                }
                else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    };
    ;
    /**
     *
     * @param {*} url Url to the file gif image
     * @param {*} fileName file name to save
     */
    TimeDimensionTile.prototype.forceDownload = function (url, fileName) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = fileName;
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        };
        xhr.send();
    };
    ;
    /**
     *
     * @param {*} WMSURL WMS URL
     * @param {*} WMSURLArrayIndex index of list of WMS URL
     */
    TimeDimensionTile.prototype.collectDateAndTime = function (WMSURL, WMSURLArrayIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var aa, result, responseData, datesWithData, DateList, Year, month, _i, _a, day, IntMonth, IntDay, combine, index, _b, DateList_1, dateL, url, resultTime, response, timesteps, _c, timesteps_1, singleTime, fullTimeList, detailDate;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        aa = WMSURL + '?request=GetMetadata&item=layerDetails&layerName=' + this.param.source.params.LAYERS;
                        return [4 /*yield*/, this.makeRequest("GET", aa)];
                    case 1:
                        result = _d.sent();
                        responseData = JSON.parse(result);
                        datesWithData = responseData.datesWithData;
                        DateList = [];
                        for (Year in datesWithData) {
                            for (month in datesWithData[Year]) {
                                for (_i = 0, _a = datesWithData[Year][month]; _i < _a.length; _i++) {
                                    day = _a[_i];
                                    IntMonth = parseInt(month) + 1;
                                    IntDay = day;
                                    if (IntMonth < 10) {
                                        IntMonth = '0' + IntMonth.toString();
                                    }
                                    if (IntDay < 10) {
                                        IntDay = '0' + IntDay.toString();
                                    }
                                    combine = Year + '-' + IntMonth.toString() + '-' + IntDay.toString();
                                    DateList.push(combine);
                                }
                            }
                        }
                        index = 0;
                        _b = 0, DateList_1 = DateList;
                        _d.label = 2;
                    case 2:
                        if (!(_b < DateList_1.length)) return [3 /*break*/, 5];
                        dateL = DateList_1[_b];
                        url = WMSURL + '?request=GetMetadata&item=timesteps&layerName=' + this.param.source.params.LAYERS + '&day=' + dateL;
                        return [4 /*yield*/, this.makeRequest("GET", url)];
                    case 3:
                        resultTime = _d.sent();
                        response = JSON.parse(resultTime);
                        timesteps = response['timesteps'];
                        for (_c = 0, timesteps_1 = timesteps; _c < timesteps_1.length; _c++) {
                            singleTime = timesteps_1[_c];
                            fullTimeList = dateL + "T" + singleTime;
                            detailDate = {
                                dateisoFormat: fullTimeList,
                                dateisoFormatForLevel: fullTimeList,
                                localDateTime: Date.parseISO8601(fullTimeList).toLocaleString(),
                                layerid: this.param.id + WMSURLArrayIndex + index.toString(),
                                visibility: false,
                                WMSURL: WMSURL
                            };
                            this.AllDateAndTimeList.push(detailDate);
                            index += 1;
                        }
                        _d.label = 4;
                    case 4:
                        _b++;
                        return [3 /*break*/, 2];
                    case 5:
                        index = 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    /**
     *
     * @param {*} WMSURL
     * @param {*} WMSURLArrayIndex
     */
    TimeDimensionTile.prototype.collectDateAndTimeThredd4 = function (WMSURL, WMSURLArrayIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var aa, result, parser, xmlDoc, DimensionTag, TimeString, index, _i, TimeString_1, km, detailDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aa = WMSURL + '?service=WMS&version=1.3.0&request=GetCapabilities&LAYERS=' + this.param.source.params.LAYERS;
                        return [4 /*yield*/, this.makeRequest("GET", aa)];
                    case 1:
                        result = _a.sent();
                        console.log("result");
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(result, "text/xml");
                        DimensionTag = xmlDoc.getElementsByTagName("Dimension")[0];
                        TimeString = DimensionTag.textContent.trim().split(',');
                        index = 0;
                        for (_i = 0, TimeString_1 = TimeString; _i < TimeString_1.length; _i++) {
                            km = TimeString_1[_i];
                            detailDate = {
                                dateisoFormat: km,
                                dateisoFormatForLevel: km,
                                localDateTime: Date.parseISO8601(km).toLocaleString(),
                                layerid: this.param.id + WMSURLArrayIndex + index.toString(),
                                visibility: false,
                                WMSURL: WMSURL
                            };
                            this.AllDateAndTimeList.push(detailDate);
                            index += 1;
                        }
                        index = 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    TimeDimensionTile.prototype.createLayers = function () {
        var index = 0;
        var AllLayers = [];
        var that = this;
        var _loop_1 = function (a) {
            (function () {
                var currentParam = '';
                var legendPath = '';
                var url = "";
                var source = '';
                var lyr = "";
                var dataeee = a.dateisoFormat.toString();
                var b = JSON.parse(JSON.stringify(a));
                AllLayers[index] = function () {
                    var currentParam = that.param.source.params;
                    currentParam.TIME = dataeee;
                    currentParam.TILED = true;
                    currentParam.VERSION = '1.1.1';
                    var stri = JSON.parse(JSON.stringify(currentParam));
                    legendPath = that.param.legendPath;
                    url = that.param.source.url;
                    source = new TileWMS({
                        url: b.WMSURL,
                        hidpi: false,
                        params: stri
                    });
                    var tilePara = Object.assign({}, that.param);
                    // let tilePara = JSON.parse(JSON.stringify(that.param));
                    tilePara.id = b.layerid;
                    tilePara.visible = b.visibility;
                    tilePara.legendPath = legendPath;
                    tilePara.source = source;
                    lyr = new TileLayer(tilePara);
                    return lyr;
                };
                index += 1;
            })();
        };
        for (var _i = 0, _a = this.AllDateAndTimeList; _i < _a.length; _i++) {
            var a = _a[_i];
            _loop_1(a);
        }
        index = 0;
        for (var _b = 0, AllLayers_1 = AllLayers; _b < AllLayers_1.length; _b++) {
            var sl = AllLayers_1[_b];
            var a = sl();
            this.AllLayersList[index] = a;
            index += 1;
        }
        index = 0;
    };
    ;
    /**
     *
     */
    TimeDimensionTile.prototype.layerVisibilityInitiliazation = function () {
        var _this = this;
        if (this.isFunction(this.param.dateisoFormatForLevelFormatter)) {
            this.AllDateAndTimeList.forEach(function (curObj) {
                curObj.dateisoFormatForLevel = _this.param.dateisoFormatForLevelFormatter(curObj.dateisoFormatForLevel);
            });
        }
        var visibile = this.param.visible;
        this.AllLayersList[0].setVisible(true);
        this.currentLayerId = this.AllLayersList[0].getProperties().id;
        this.AllLayersList[0].setOpacity(this.opacity);
        this.UIinitilization();
        this.legendUIInitilization();
        if (this.isFunction(this.param.customLegend)) {
            // debugger;
            this.imageContainer.innerHTML = '';
            var customElement = this.param.customLegend(this.param.customLegendData);
            this.imageContainer.append(customElement);
        }
        if (visibile === true) {
            this.setVisible(true);
        }
        else {
            this.setVisible(false);
        }
    };
    ;
    /**
     *
     */
    TimeDimensionTile.prototype.legendUIInitilization = function () {
        this.timeLayerLedgendDiv = document.querySelector('div.time-layer-ledgend-div');
        var olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
        if (!this.timeLayerLedgendDiv) {
            this.timeLayerLedgendDiv = this.createDiv('time-layer-ledgend-div custom-thredd-Scroll');
            olOverlaycontainer.append(this.timeLayerLedgendDiv);
        }
        this.imageContainer = this.createDiv("thredd-layer-image-div");
        var imageNode = this.createImg();
        imageNode.setAttribute("src", this.param.legendPath);
        this.imageContainer.append(imageNode);
        this.timeLayerLedgendDiv.append(this.imageContainer);
    };
    ;
    /**
     *
     */
    TimeDimensionTile.prototype.UIinitilization = function () {
        this.timeSliderDiv = document.querySelector('div.timeSliderDiv');
        var olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
        if (!this.timeSliderDiv) {
            this.timeSliderDiv = this.createDiv('timeSliderDiv custom-thredd-Scroll');
            // this.timeSliderDiv.style.width = this.ParentDivWidth.toString() + "px";
            if (this.param.alignTimeSlider === "left") {
                this.timeSliderDiv.style.left = "10px";
                this.timeSliderDiv.style.transform = "translateX(0%)";
            }
            else if (this.param.alignTimeSlider === "right") {
                this.timeSliderDiv.style.right = "10px";
                this.timeSliderDiv.style.transform = "translateX(0%)";
            }
            else if (this.param.alignTimeSlider === "center") {
                // this.timeSliderDiv.style.left = 'calc(50% - ' + (this.ParentDivWidth / 2).toString() + 'px)';
            }
            else {
                // this.timeSliderDiv.style.left = 'calc(50% - ' + (this.ParentDivWidth / 2).toString() + 'px)';
            }
            olOverlaycontainer.append(this.timeSliderDiv);
        }
        var ui = this.completeUI();
        this.timeSliderDiv.append(ui);
        this.bindEvents();
        if (this.param.timeSliderSize === "small") {
            this.timeSliderDiv.style.backgroundColor = '#fff0';
            this.timeSliderDiv.style.height = '50px';
            // this.timeSliderDiv.style.width = "block";
            this.timeMapTitle.style.border = "solid #cccccc";
            this.timeMapTitle.style.borderWidth = "1px 1px 0px 1px";
            this.timeMapTitle.style.backgroundColor = "#fff";
            this.container.style.paddingBottom = '0px';
            this.container.style.paddingLeft = '0px';
            this.container.style.paddingRight = '0px';
            // console.log(this.btnGroup.style.width);
            // console.log(getComputedStyle(this.btnGroup));
            // console.log(getComputedStyle(this.btnGroup)["width"]);
            // console.log(this.btnGroup.clientWidth);
            // console.log(this.btnGroup.width);
            // console.log(this.btnGroup.offsetWidth);
            // console.log(this.btnGroup.getBoundingClientRect());
        }
    };
    ;
    /**
     *
     * @returns {$ElementType}
     */
    TimeDimensionTile.prototype.completeUI = function () {
        var containerClass = 'timeSliderInnerDiv' + " " + this.param.id;
        this.container = this.createDiv(containerClass);
        this.timeMapTitle = this.createDiv('time-map-title');
        this.timeMapTitle.innerText = this.param.title;
        this.btnGroup = this.createDiv('btn-group');
        //step-backward
        this.spanStepBack = this.createSpan('btn btn-sm btn-default');
        var iStepBack = this.createI('glyphicon glyphicon-step-backward');
        this.spanStepBack.append(iStepBack);
        //play-pause
        this.spanPlayPause = this.createSpan('btn btn-sm btn-default thredds-data-server-play-pause');
        this.iPlayPause = this.createI('glyphicon glyphicon-play');
        this.iPlayPause.setAttribute("playing", false);
        this.spanPlayPause.append(this.iPlayPause);
        //StepForward
        this.spanStepForward = this.createSpan('btn btn-sm btn-default');
        var iStepForward = this.createI('glyphicon glyphicon-step-forward');
        this.spanStepForward.append(iStepForward);
        //StepForward
        this.spanRepeatToggle = this.createSpan('btn btn-sm btn-default time-threads-repeat-toggle border-right');
        this.spanRepeatToggle.setAttribute("repeat", false);
        var iRepeatToggle = this.createI('glyphicon glyphicon-repeat');
        this.spanRepeatToggle.append(iRepeatToggle);
        // Date-Time
        this.aTime = this.createA('thredds-data-server-data-time timecontrol-date');
        this.aTime.innerText = this.AllDateAndTimeList[0].dateisoFormat;
        this.aTime.style.backgroundColor = "#fff";
        this.aTime.setAttribute("href", "javascript:void(0)");
        this.aTime.setAttribute("title", "Date");
        this.aTime.setAttribute("format", "ISO");
        // slider
        this.sliderDiv = this.createDiv('thredds-data-server-control-rangecontrol');
        this.sliderDiv.style.width = "203px";
        var lengthOfLayers = this.AllLayersList.length - 1;
        this.sliderInput = this.createInputRange("thredds-range thredds-data-server-slider-pic-range", 0, lengthOfLayers, 0);
        this.sliderDiv.append(this.sliderInput);
        //slider fps
        this.fpsDiv = this.createDiv('thredds-data-server-control-rangecontrol glyphicon-dashboard');
        this.fpsDiv.style.width = "122px";
        this.fpsSpan = this.createSpan("speed");
        this.fpsSpan.innerText = "1fps";
        this.fpsInput = this.createInputRange("thredds-range thredds-data-server-slider-pic-range-fps", 1, 6, 1);
        this.fpsDiv.append(this.fpsSpan);
        this.fpsDiv.append(this.fpsInput);
        //Animation Download
        this.animationDownloadSpan = this.createSpan('btn btn-sm btn-default border-right');
        this.animationDownloadSpan.setAttribute('title', 'Download Animation');
        this.animationDownloadSpan.setAttribute('data-disabled', 0);
        this.downloadIcon = this.createI('glyphicon glyphicon-download-alt');
        this.animationDownloadSpan.append(this.downloadIcon);
        this.btnGroup.append(this.spanStepBack);
        this.btnGroup.append(this.spanPlayPause);
        this.btnGroup.append(this.spanStepForward);
        this.btnGroup.append(this.spanRepeatToggle);
        this.btnGroup.append(this.aTime);
        this.btnGroup.append(this.sliderDiv);
        this.btnGroup.append(this.fpsDiv);
        if (this.param.showAnimationButton === true) {
            this.btnGroup.append(this.animationDownloadSpan);
        }
        this.container.append(this.timeMapTitle);
        this.container.append(this.btnGroup);
        return this.container;
    };
    ;
    /**
     *
     */
    TimeDimensionTile.prototype.bindEvents = function () {
        var _this = this;
        /**
         *
         */
        this.sliderInput.addEventListener("input", function () {
            var id = _this.AllDateAndTimeList[parseInt(_this.sliderInput.value.toString())].layerid;
            var currentLayerDetail = _this.AllDateAndTimeList.filter(function (x) { return x.layerid === id; })[0];
            var currentFormat = _this.aTime.getAttribute("format");
            if (currentFormat === 'ISO') {
                _this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
            }
            else {
                _this.aTime.innerText = currentLayerDetail.localDateTime;
            }
        }, true);
        /**
         *
         */
        this.sliderInput.addEventListener("change", function () {
            var id = _this.AllDateAndTimeList[parseInt(_this.sliderInput.value.toString())].layerid;
            var changedToLayer = _this.AllLayersList.filter(function (x) { return x.getProperties().id === id; })[0];
            changedToLayer.setOpacity(0);
            changedToLayer.setVisible(true);
            _this.changedToLayer = id;
            var intervalId = null;
            var varName = function () {
                if (_this.loading === 0) {
                    /* your code goes here */
                    var currentLayer = _this.AllLayersList.filter(function (x) { return x.getProperties().id === _this.currentLayerId; })[0];
                    var changedToLayer_1 = _this.AllLayersList.filter(function (x) { return x.getProperties().id === _this.changedToLayer; })[0];
                    currentLayer.setOpacity(0);
                    changedToLayer_1.setOpacity(_this.opacity);
                    currentLayer.setVisible(false);
                    changedToLayer_1.setVisible(true);
                    _this.currentLayerId = _this.changedToLayer;
                    if (_this.t0) {
                        var t1 = performance.now();
                    }
                    clearInterval(intervalId);
                }
            };
            intervalId = setInterval(varName, 30);
        }, true);
        this.fpsInput.addEventListener("input", function () {
            _this.fpsSpan.innerText = _this.fpsInput.value.toString() + "fps";
            _this.frameIntervalMS = parseInt(1000 / parseInt(_this.fpsInput.value));
            if (_this.interValFun) {
                _this.iPlayPause.setAttribute("playing", false);
                _this.iPlayPause.classList.add('glyphicon-play');
                _this.iPlayPause.classList.remove('glyphicon-pause');
                clearInterval(_this.interValFun);
                _this.t0 = 0;
            }
        }, true);
        this.aTime.addEventListener("click", function () {
            var currentFormat = _this.aTime.getAttribute("format");
            var innerText = _this.aTime.innerText;
            if (currentFormat === "ISO") {
                var currentLayerDetail = _this.AllDateAndTimeList.filter(function (x) { return x.dateisoFormatForLevel === innerText; })[0];
                _this.aTime.innerText = currentLayerDetail.localDateTime;
                _this.aTime.setAttribute("format", "local");
            }
            else {
                var currentLayerDetail = _this.AllDateAndTimeList.filter(function (x) { return x.localDateTime === innerText; })[0];
                _this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                _this.aTime.setAttribute("format", "ISO");
            }
        }, true);
        this.spanRepeatToggle.addEventListener("click", function () {
            var currentValue = _this.spanRepeatToggle.getAttribute("repeat");
            var isTrueSet = (currentValue === 'true');
            if (isTrueSet === true) {
                _this.spanRepeatToggle.setAttribute("repeat", false);
                _this.spanRepeatToggle.classList.remove('looped');
            }
            else {
                _this.spanRepeatToggle.setAttribute("repeat", true);
                _this.spanRepeatToggle.classList.add('looped');
            }
        }, true);
        this.AllLayersList.forEach(function (value) {
            value.getSource().on('tileloadstart', _this.tileLoadStart.bind(_this));
            value.getSource().on('tileloadend', _this.tileLoadEnd.bind(_this));
            value.getSource().on('tileloaderror', _this.tileLoadEnd(_this));
        });
        this.spanStepBack.addEventListener("click", function () {
            var curLId = _this.currentLayerId;
            var index = _this.AllDateAndTimeList.findIndex(function (x) { return x.layerid === curLId; }) - 1;
            if (index >= 0) {
                var currentLayerDetail = _this.AllDateAndTimeList[index];
                var currentFormat = _this.aTime.getAttribute("format");
                if (currentFormat === 'ISO') {
                    _this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                }
                else {
                    _this.aTime.innerText = currentLayerDetail.localDateTime;
                }
                _this.sliderInput.value = index;
                // Create a new 'change' event
                var event = new Event('change');
                // Dispatch it.
                _this.sliderInput.dispatchEvent(event);
                // this.sliderInput.fireEvent("onchange");
            }
        }, true);
        this.spanStepForward.addEventListener("click", function () {
            var curLId = _this.currentLayerId;
            var index = _this.AllDateAndTimeList.findIndex(function (x) { return x.layerid === curLId; }) + 1;
            var totLen = _this.AllDateAndTimeList.length;
            if (index < totLen) {
                var currentLayerDetail = _this.AllDateAndTimeList[index];
                var currentFormat = _this.aTime.getAttribute("format");
                if (currentFormat === 'ISO') {
                    _this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                }
                else {
                    _this.aTime.innerText = currentLayerDetail.localDateTime;
                }
                _this.sliderInput.value = index;
                // Create a new 'change' event
                var event = new Event('change');
                // Dispatch it.
                _this.sliderInput.dispatchEvent(event);
                // this.sliderInput.fireEvent("onchange");
            }
        }, true);
        this.spanPlayPause.addEventListener("click", function () {
            var currentValue = _this.iPlayPause.getAttribute("playing");
            var isTrueSet = (currentValue === 'true');
            if (isTrueSet === true) {
                //  currently playing , Now stop it
                _this.iPlayPause.setAttribute("playing", false);
                _this.iPlayPause.classList.add('glyphicon-play');
                _this.iPlayPause.classList.remove('glyphicon-pause');
                if (_this.interValFun) {
                    clearInterval(_this.interValFun);
                    _this.t0 = 0;
                }
            }
            else {
                //  currently stop , Now playing it
                _this.iPlayPause.setAttribute("playing", true);
                _this.iPlayPause.classList.remove('glyphicon-play');
                _this.iPlayPause.classList.add('glyphicon-pause');
                if (_this.interValFun) {
                    clearInterval(_this.interValFun);
                    _this.t0 = performance.now();
                    _this.interValFun = setInterval(_this.playTime, _this.frameIntervalMS);
                }
                else {
                    _this.t0 = performance.now();
                    _this.interValFun = setInterval(_this.playTime, _this.frameIntervalMS);
                }
            }
        }, true);
        this.playTime = function () {
            var curLId = _this.currentLayerId;
            var index = _this.AllDateAndTimeList.findIndex(function (x) { return x.layerid === curLId; }) + 1;
            var totLen = _this.AllDateAndTimeList.length;
            if (index < totLen) {
                var currentLayerDetail = _this.AllDateAndTimeList[index];
                var currentFormat = _this.aTime.getAttribute("format");
                if (currentFormat === 'ISO') {
                    _this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                }
                else {
                    _this.aTime.innerText = currentLayerDetail.localDateTime;
                }
                _this.sliderInput.value = index;
                // Create a new 'change' event
                var event = new Event('change');
                // Dispatch it.
                _this.sliderInput.dispatchEvent(event);
                // this.interValFun=setInterval(this.playTime, this.frameIntervalMS);
            }
            else {
                var currentValue = _this.spanRepeatToggle.getAttribute("repeat");
                var isTrueSet = (currentValue === 'true');
                if (isTrueSet === true) {
                    _this.sliderInput.value = 0;
                    // Create a new 'change' event
                    var event = new Event('change');
                    // Dispatch it.
                    _this.sliderInput.dispatchEvent(event);
                }
                else {
                    if (_this.interValFun) {
                        clearInterval(_this.interValFun);
                        _this.t0 = 0;
                        _this.iPlayPause.setAttribute("playing", false);
                        _this.iPlayPause.classList.add('glyphicon-play');
                        _this.iPlayPause.classList.remove('glyphicon-pause');
                    }
                }
            }
        };
        this.animationDownloadSpan.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var CheckDisable, fps, gifshotParams_1, BaseUrl_1, fileName, currentLayer, layerPropertiesObject, layerSourceParam, layerUrl, plotProp, SourceURL_1, responseData, ParseJson, gifUrl, fileName;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        CheckDisable = parseInt(this.animationDownloadSpan.getAttribute('data-disabled'));
                        if (!!CheckDisable) return [3 /*break*/, 3];
                        if (!this.param.RGBComposite) return [3 /*break*/, 1];
                        this.animationDownloadSpan.setAttribute('data-disabled', 1);
                        fps = 1 / parseInt(this.fpsInput.value);
                        gifshotParams_1 = {
                            images: [],
                            gifWidth: 1000,
                            gifHeight: 720,
                            numFrames: this.AllDateAndTimeList.length,
                            interval: fps,
                            frameDuration: fps,
                            fontWeight: 'normal',
                            fontSize: '22px',
                            fontFamily: 'sans-serif',
                            fontColor: '#ffffff',
                            textAlign: 'center',
                            textBaseline: 'bottom',
                            sampleInterval: 10,
                            numWorkers: 2
                        };
                        BaseUrl_1 = this.param.source.url;
                        this.AllDateAndTimeList.forEach(function (currentObj, index) {
                            var WMSTileUrl = BaseUrl_1[index] + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&SRS=EPSG:4326&BBOX=60,15,110,40&WIDTH=1000&HEIGHT=720' + '&LAYERS=' + _this.param.source.params.LAYERS + '&TRANSPARENT=true&SLD_BODY=' + encodeURIComponent(_this.param.source.params.SLD_BODY).toString() + '&TIME=';
                            var imgObj = { src: WMSTileUrl + currentObj.dateisoFormat, text: currentObj.dateisoFormat };
                            gifshotParams_1.images.push(imgObj);
                        });
                        fileName = this.param.title + '.gif';
                        gifshot.createGIF(gifshotParams_1, function (obj) {
                            if (!obj.error) {
                                var image = obj.image;
                                var download = document.createElement('a');
                                download.href = image;
                                download.download = fileName;
                                document.body.appendChild(download);
                                download.click();
                                document.body.removeChild(download);
                            }
                        });
                        this.animationDownloadSpan.setAttribute('data-disabled', 0);
                        return [3 /*break*/, 3];
                    case 1:
                        this.animationDownloadSpan.setAttribute('data-disabled', 1);
                        currentLayer = this.getCurrentLayer();
                        layerPropertiesObject = currentLayer.getProperties();
                        layerSourceParam = layerPropertiesObject.source.getParams();
                        layerUrl = layerPropertiesObject.source.getUrls()[0].split('wms')[1];
                        plotProp = this.param.plotInfo();
                        SourceURL_1 = [];
                        this.param.source.url.forEach(function (val) {
                            SourceURL_1.push(val.split('/wms/')[1]);
                        });
                        plotProp.DATADIR = SourceURL_1;
                        plotProp.LAYER = layerSourceParam.LAYERS;
                        plotProp.COLORSCALERANGE = layerSourceParam.COLORSCALERANGE;
                        plotProp.fps = parseInt(this.fpsInput.value);
                        plotProp.rid = parseInt($('#selectl0').val());
                        return [4 /*yield*/, myApp.makeRequestWithCookieCSRFToken('POST', this.param.api.createGIF, plotProp)];
                    case 2:
                        responseData = _a.sent();
                        ParseJson = JSON.parse(responseData);
                        gifUrl = this.param.api.GetImage + "?gif=true&ImageName=" + ParseJson.image;
                        fileName = this.param.title + '.gif';
                        this.forceDownload(gifUrl, fileName);
                        this.animationDownloadSpan.setAttribute('data-disabled', 0);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); }, true);
    };
    ;
    /**
     *
     * @param {*} event
     */
    TimeDimensionTile.prototype.tileLoadStart = function (event) {
        this.loading = this.loading + 1;
        if (this.loading === 1) {
            this.aTime.classList.add('loading');
            this.aTime.style.backgroundColor = "#ffefa4";
        }
    };
    ;
    /**
     *
     * @param {*} event
     */
    TimeDimensionTile.prototype.tileLoadEnd = function (event) {
        if (this.loading !== 0) {
            this.loaded = this.loaded + 1;
            if (this.loading === this.loaded) {
                this.loading = 0;
                this.loaded = 0;
                this.aTime.classList.remove('loading');
                this.aTime.style.backgroundColor = "#fff";
            }
        }
    };
    ;
    /**
     *
     * @param {*} type
     * @param {*} className
     * @returns {$ElementType}
     */
    TimeDimensionTile.prototype.createElement = function (type, className) {
        var _a;
        var element = document.createElement(type);
        if (className) {
            var classList = className.split(" ");
            (_a = element.classList).add.apply(_a, classList);
        }
        return element;
    };
    ;
    /**
     *
     * @param {*} ClassName
     * @returns {$ElementType}
     */
    TimeDimensionTile.prototype.createDiv = function (ClassName) {
        var div = this.createElement('div', ClassName);
        return div;
    };
    ;
    /**
     *
     * @param {*} ClassName
     * @returns {$ElementType}
     */
    TimeDimensionTile.prototype.createSpan = function (ClassName) {
        var span = this.createElement('span', ClassName);
        return span;
    };
    ;
    /**
     *
     * @param {*} ClassName
     * @returns {$ElementType}
     */
    TimeDimensionTile.prototype.createA = function (ClassName) {
        var a = this.createElement('a', ClassName);
        return a;
    };
    ;
    /**
     *
     * @param {*} ClassName
     * @returns {$ElementType}
     */
    TimeDimensionTile.prototype.createI = function (ClassName) {
        var i = this.createElement('i', ClassName);
        return i;
    };
    ;
    /**
     *
     * @param {*} ClassName
     * @returns {$ElementType}
     */
    TimeDimensionTile.prototype.createImg = function (ClassName) {
        var img = this.createElement('img', ClassName);
        return img;
    };
    ;
    /**
     *
     * @param {*} ClassName
     * @returns {$ElementType}
     */
    TimeDimensionTile.prototype.createInput = function (ClassName) {
        var i = this.createElement('input', ClassName);
        return i;
    };
    ;
    /**
     *
     * @param {*} ClassName
     * @param {*} min
     * @param {*} max
     * @param {*} value
     * @returns {$ElementType}
     */
    TimeDimensionTile.prototype.createInputRange = function (ClassName, min, max, value) {
        var i = this.createInput(ClassName);
        i.setAttribute("type", "range");
        i.setAttribute("min", min);
        i.setAttribute("max", max);
        i.setAttribute("step", 1);
        i.setAttribute("value", value);
        return i;
    };
    ;
    /**
     *
     * @param {*} visibleorNot
     */
    TimeDimensionTile.prototype.setVisible = function (visibleorNot) {
        var _this = this;
        var currentLayer = this.AllLayersList.filter(function (x) { return x.getProperties().id === _this.currentLayerId; })[0];
        currentLayer.setVisible(visibleorNot);
        this.param.visible = visibleorNot;
        if (visibleorNot === true) {
            this.container.style.display = 'block';
            if (this.param.showlegend === true) {
                this.imageContainer.style.display = 'block';
            }
            else {
                this.imageContainer.style.display = 'none';
            }
            ;
            if (this.param.showControlPanel === false) {
                this.container.style.display = 'none';
            }
        }
        else {
            this.container.style.display = 'none';
            this.imageContainer.style.display = 'none';
        }
        //If Layer is in playing Mode stop it.
        if (this.interValFun) {
            this.iPlayPause.setAttribute("playing", false);
            this.iPlayPause.classList.add('glyphicon-play');
            this.iPlayPause.classList.remove('glyphicon-pause');
            clearInterval(this.interValFun);
            this.t0 = 0;
        }
        //slider pannel
        var parentElement = this.container.parentElement;
        var allChildrenelement = parentElement.children;
        var blockCount = 0;
        for (var _i = 0, allChildrenelement_1 = allChildrenelement; _i < allChildrenelement_1.length; _i++) {
            var el = allChildrenelement_1[_i];
            if (getComputedStyle(el)["display"] === "block") {
                blockCount += 1;
            }
        }
        if (blockCount === 0) {
            this.container.parentElement.style.display = 'none';
        }
        else {
            this.container.parentElement.style.display = 'flex';
        }
        //slider pannel
        var parentImageContainerElement = this.imageContainer.parentElement;
        var allChildrenImageContainerelement = parentImageContainerElement.children;
        var ImageblockCount = 0;
        for (var _a = 0, allChildrenImageContainerelement_1 = allChildrenImageContainerelement; _a < allChildrenImageContainerelement_1.length; _a++) {
            var el = allChildrenImageContainerelement_1[_a];
            if (getComputedStyle(el)["display"] === "block") {
                ImageblockCount += 1;
            }
        }
        if (ImageblockCount === 0) {
            this.imageContainer.parentElement.style.display = 'none';
        }
        else {
            this.imageContainer.parentElement.style.display = 'block';
        }
    };
    ;
    /**
     *
     * @param {*} indexValue
     */
    TimeDimensionTile.prototype.setZIndex = function (indexValue) {
        this.AllLayersList.forEach(function (layer) {
            layer.setZIndex(indexValue);
        });
        this.timeSliderDiv.insertBefore(this.container, this.timeSliderDiv.firstChild);
    };
    ;
    /**
     *
     * @param {*} Coods
     */
    TimeDimensionTile.prototype.setMask = function (Coods) {
        this.setMaskOrCrop(Coods, 'mask');
    };
    ;
    /**
     *
     * @param {*} Coods
     */
    TimeDimensionTile.prototype.setCrop = function (Coods) {
        this.setMaskOrCrop(Coods, 'crop');
    };
    ;
    /**
     *
     * @param {*} Coods
     * @param {*} maskOrCrop
     */
    TimeDimensionTile.prototype.setMaskOrCrop = function (Coods, maskOrCrop) {
        var _this = this;
        var properties = this.getProperties();
        if (properties.mask) {
            var f = new ol.Feature(new ol.geom.MultiPolygon(Coods));
            if (!this.maskObjList.length) {
                var layer = this;
                if (properties.hasOwnProperty('ThreddsDataServerVersion')) {
                    layer.AllLayersList.forEach(function (timeDimensionLayer, index) {
                        _this.changeMask(timeDimensionLayer, Coods, index, false, maskOrCrop);
                    });
                }
                else {
                    this.changeMask(layer, Coods, 0, false, maskOrCrop);
                }
            }
            else {
                var layer = this;
                if (properties.hasOwnProperty('ThreddsDataServerVersion')) {
                    layer.AllLayersList.forEach(function (timeDimensionLayer, index) {
                        _this.changeMask(timeDimensionLayer, Coods, index, true, maskOrCrop);
                    });
                }
                else {
                    this.changeMask(layer, Coods, 0, true, maskOrCrop);
                }
            }
        }
    };
    ;
    /**
     *
     * @param {*} layer
     * @param {*} Coods
     * @param {*} ArrayIndex
     * @param {*} deleteOrNot
     * @param {*} maskOrCrop
     */
    TimeDimensionTile.prototype.changeMask = function (layer, Coods, ArrayIndex, deleteOrNot, maskOrCrop) {
        if (deleteOrNot) {
            layer.removeFilter(this.maskObjList[ArrayIndex]);
        }
        var f = new ol.Feature(new ol.geom.MultiPolygon(Coods));
        var MOrC = null;
        if (maskOrCrop == 'crop') {
            MOrC = new ol.filter.Crop({ feature: f, inner: false });
        }
        else {
            MOrC = new ol.filter.Mask({
                feature: f,
                inner: false,
                fill: new ol.style.Fill({ color: [185, 185, 185, 0.7] })
            });
        }
        layer.addFilter(MOrC);
        MOrC.set('active', true);
        this.maskObjList[ArrayIndex] = MOrC;
    };
    ;
    /**
     *
     * @param {*} opac
     */
    TimeDimensionTile.prototype.setOpacity = function (opac) {
        var _this = this;
        this.opacity = opac;
        var currentLayer = this.AllLayersList.filter(function (x) { return x.getProperties().id === _this.currentLayerId; })[0];
        currentLayer.setOpacity(this.opacity);
    };
    ;
    /**
     *
     * @returns {Object}
     */
    TimeDimensionTile.prototype.getProperties = function () {
        return this.param;
    };
    ;
    /**
     *
     */
    TimeDimensionTile.prototype.computeImgSize = function () {
        var newImg = new Image();
        newImg.src = this.legendPath;
        this.legendHeight = newImg.height;
        this.legendWidth = newImg.width;
    };
    ;
    /**
     *
     * @returns {*}
     */
    TimeDimensionTile.prototype.getInitilizationStatus = function () {
        return this.initilizationStatus;
    };
    ;
    TimeDimensionTile.prototype.getAllDateAndTimeList = function () {
        return this.AllDateAndTimeList;
    };
    ;
    /**
     *
     * @returns {Object}
     */
    TimeDimensionTile.prototype.GetFirstLayer = function () {
        return this.AllLayersList[0];
    };
    ;
    /**
     *
     * @returns {Object}
     */
    TimeDimensionTile.prototype.getCurrentLayer = function () {
        var currentLayer = this.AllLayersList.filter(function (x) { return x.getProperties().visible === true; })[0];
        return currentLayer;
    };
    ;
    /**
     *
     * @param {*} o
     * @returns {Boolean}
     */
    TimeDimensionTile.prototype.isFunction = function (o) {
        return Function.prototype.isPrototypeOf(o);
    };
    ;
    /**
     *
     */
    TimeDimensionTile.prototype.addLayerPrototypeOfMap = function () {
        if (!PluggableMap.prototype.addThreddsLayer) {
            PluggableMap.prototype.addThreddsLayer = function (LayerList) {
                for (var _i = 0, LayerList_1 = LayerList; _i < LayerList_1.length; _i++) {
                    var l = LayerList_1[_i];
                    this.addLayer(l);
                }
            };
        }
    };
    return TimeDimensionTile;
}(LayerGroup));
export default TimeDimensionTile;
//# sourceMappingURL=TimeDimensionTile.js.map