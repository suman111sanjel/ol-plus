/**
 * @module ol/layer/TimeDimensionTile
 */
// import ol_ext_inherits from '../util/ext'
import LayerGroup from 'ol/layer/Group.js';
import '../iso8601';

import './threddsDataserver.css';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import '../PluggableMap';
import {createElement,createDiv,createSpan,createA,createI,createImg,createInput,createInputRange,} from '../ui/UI';

/**
 * @classdesc
 * This layer is used for the visualization of time series data
 *
 * @api
 */
class TimeDimensionTile extends LayerGroup {

    /**
     *
     * @param {Object} params
     */
    constructor(params) {
        super();
        this.param = params;
        this.opacity = '';
        this.AllLayersList = [];
        this.AllDateAndTimeList = [];
        this.loading = 0;
        this.loaded = 0;
        this.t0 = '';
        this.ParentDivWidth = 676;
        this.frameIntervalMS = 1000;
        this.initilizationStatus = false;
        this.maskObjList = [];
    }

    /**
     * Array of Layers
     * @returns {Array<Object>}
     */
    async init() {
        if (this.param.opacity) {
            this.opacity = this.param.opacity;
        } else {
            this.opacity = 1;
        }
        if (this.param.ThreddsDataServerVersion == 5) {
            if (Array.isArray(this.param.source.url)) {
                let AllPromiseList = [];
                let index = 0;
                for (let WMSURL of this.param.source.url) {
                    AllPromiseList.push(this.loadMultipleDateTime(this.param.source.url[index], index, this.collectDateAndTime));
                    // await this.collectDateAndTime();
                    index = index + 1;
                }
                await Promise.all(AllPromiseList).then((results) => {
                    //pass
                }).catch((error) => {
                    console.log(error);
                });
                this.AllDateAndTimeList.sort((a, b) => (a.dateisoFormat > b.dateisoFormat) ? 1 : ((b.dateisoFormat > a.dateisoFormat) ? -1 : 0));

            } else {
                await this.collectDateAndTime(this.param.source.url, 0);
            }
        } else if (this.param.ThreddsDataServerVersion == 4) {
            if (Array.isArray(this.param.source.url)) {
                let AllPromiseList = [];
                let index = 0;
                for (let WMSURL of this.param.source.url) {
                    AllPromiseList.push(this.loadMultipleDateTime(this.param.source.url[index], index, this.collectDateAndTimeThredd4));
                    index = index + 1;
                }

                await Promise.all(AllPromiseList).then((results) => {
                    //pass
                }).catch((error) => {
                    console.log(error);
                });
                this.AllDateAndTimeList.sort((a, b) => (a.dateisoFormat > b.dateisoFormat) ? 1 : ((b.dateisoFormat > a.dateisoFormat) ? -1 : 0));

            } else {
                await this.collectDateAndTimeThredd4(this.param.source.url, 0);
            }
        } else {
            console.error(`Please Provide Properties with key "ThreddsDataServerVersion", value should be 5 for TDS version 5 and 4 for TDS version 4`);
        }

        this.createLayers();
        this.layerVisibilityInitiliazation();
        // this.addLayerPrototypeOfMap();
        this.initilizationStatus = true;
        return this.AllLayersList;
    };

    /**
     * this method is generally used GET Method
     * @param {*} method
     * @param {*} url
     * @returns {Object}
     */
    makeRequest(method, url, returnInObject, dateL) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    if (returnInObject) {
                        resolve({response: xhr.response, dateL: dateL});

                    } else {
                        resolve(xhr.response);
                    }
                } else {
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

    loadMultipleDateTime(url, index, collectDateAndTimeFn) {
        let this_ = this;
        return new Promise(function (resolve, reject) {
            setTimeout(
                async function () {
                    await collectDateAndTimeFn.call(this_, url, index);
                    resolve();
                },
                1
            );
        });
    }

    /**
     *
     * @param {*} url Url to the file gif image
     * @param {*} fileName file name to save
     */
    forceDownload(url, fileName) {
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
        }
        xhr.send();
    };

    /**
     *
     * @param {*} WMSURL WMS URL
     * @param {*} WMSURLArrayIndex index of list of WMS URL
     */
    async collectDateAndTime(WMSURL, WMSURLArrayIndex) {
        let aa = WMSURL + '?request=GetMetadata&item=layerDetails&layerName=' + this.param.source.params.LAYERS;
        // await code here
        let result = await this.makeRequest("GET", aa);
        // code below here will only execute when await makeRequest() finished loading
        let responseData = JSON.parse(result);
        let datesWithData = responseData.datesWithData;
        let DateList = [];
        for (const Year in datesWithData) {
            for (const month in datesWithData[Year]) {
                for (const day of datesWithData[Year][month]) {
                    let IntMonth = parseInt(month) + 1;
                    let IntDay = day;
                    if (IntMonth < 10) {
                        IntMonth = '0' + IntMonth.toString();
                    }
                    if (IntDay < 10) {
                        IntDay = '0' + IntDay.toString();
                    }
                    let combine = Year + '-' + IntMonth.toString() + '-' + IntDay.toString()
                    DateList.push(combine);
                }
            }
        }
        let index = 0;
        let promiseList = [];
        for (let dateL of DateList) {
            let url = WMSURL + '?request=GetMetadata&item=timesteps&layerName=' + this.param.source.params.LAYERS + '&day=' + dateL;
            promiseList.push(this.makeRequest('GET', url, true, dateL));
        }
        await Promise.all(promiseList).then((results) => {
            for (let result of results) {
                let response = JSON.parse(result.response);
                let timesteps = response['timesteps'];
                for (let singleTime of timesteps) {
                    let fullTimeList = result.dateL + "T" + singleTime;
                    let detailDate = {
                        dateisoFormat: fullTimeList,
                        dateisoFormatForLevel: fullTimeList,
                        localDateTime: Date.parseISO8601(fullTimeList).toLocaleString(),
                        layerid: this.param.id + WMSURLArrayIndex + index.toString(),
                        visibility: false,
                        WMSURL: WMSURL
                    }
                    this.AllDateAndTimeList.push(detailDate);
                    index += 1;
                }
            }
        }).catch((error) => {
            console.log(error)
        });
        index = 0
        // this.AllDateAndTimeList = AllDateAndTimeList;
    };

    /**
     *
     * @param {*} WMSURL
     * @param {*} WMSURLArrayIndex
     */
    async collectDateAndTimeThredd4(WMSURL, WMSURLArrayIndex) {
        let aa = WMSURL + '?service=WMS&version=1.3.0&request=GetCapabilities&LAYERS=' + this.param.source.params.LAYERS;
        let result = await this.makeRequest("GET", aa);
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(result, "text/xml");
        let DimensionTag = xmlDoc.getElementsByTagName("Dimension")[0];
        let TimeString = DimensionTag.textContent.trim().split(',');
        let index = 0;
        for (let km of TimeString) {
            let detailDate = {
                dateisoFormat: km,
                dateisoFormatForLevel: km,
                localDateTime: Date.parseISO8601(km).toLocaleString(),
                layerid: this.param.id + WMSURLArrayIndex + index.toString(),
                visibility: false,
                WMSURL: WMSURL
            }
            this.AllDateAndTimeList.push(detailDate)
            index += 1;
        }
        index = 0;
    };

    createLayers() {
        let index = 0
        let AllLayers = [];
        let that = this;
        for (let a of this.AllDateAndTimeList) {
            (function () {
                let currentParam = '';
                let legendPath = ''
                let url = "";
                let source = '';
                let lyr = "";
                let dataeee = a.dateisoFormat.toString()
                let b = JSON.parse(JSON.stringify(a))
                AllLayers[index] = function () {
                    let currentParam = that.param.source.params;
                    currentParam.TIME = dataeee;
                    currentParam.TILED = true;
                    currentParam.VERSION = '1.1.1';
                    let stri = JSON.parse(JSON.stringify(currentParam));
                    legendPath = that.param.legendPath;
                    url = that.param.source.url
                    source = new TileWMS({
                        url: b.WMSURL,
                        hidpi: false,
                        params: stri
                    });
                    let tilePara = Object.assign({}, that.param)
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
        }
        index = 0
        for (let sl of AllLayers) {
            let a = sl()
            this.AllLayersList[index] = a;
            index += 1;
        }
        index = 0
    };

    /**
     *
     */
    layerVisibilityInitiliazation() {
        if (this.isFunction(this.param.dateisoFormatForLevelFormatter)) {
            this.AllDateAndTimeList.forEach((curObj) => {
                curObj.dateisoFormatForLevel = this.param.dateisoFormatForLevelFormatter(curObj.dateisoFormatForLevel)
            })
        }
        let visibile = this.param.visible
        this.AllLayersList[0].setVisible(true);
        this.currentLayerId = this.AllLayersList[0].getProperties().id;
        this.AllLayersList[0].setOpacity(this.opacity);
        this.UIinitilization();
        this.legendUIInitilization();
        if (this.param.customLegendElement) {
            // debugger;
            this.imageContainer.innerHTML = '';
            this.imageContainer.append(this.param.customLegendElement);
        }
        if (visibile === true) {
            this.setVisible(true);
        } else {
            this.setVisible(false);
        }
    };

    /**
     *
     */
    legendUIInitilization() {
        this.timeLayerLedgendDiv = document.querySelector('div.time-layer-ledgend-div');
        let olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
        if (!this.timeLayerLedgendDiv) {
            this.timeLayerLedgendDiv = createDiv('time-layer-ledgend-div custom-thredd-Scroll');
            olOverlaycontainer.append(this.timeLayerLedgendDiv);
        }
        this.imageContainer = createDiv("thredd-layer-image-div");
        let imageNode = createImg()
        imageNode.setAttribute("src", this.param.legendPath);
        this.imageContainer.append(imageNode);
        this.timeLayerLedgendDiv.append(this.imageContainer);
    };

    /**
     *
     */
    UIinitilization() {
        this.timeSliderDiv = document.querySelector('div.timeSliderDiv');
        let olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
        if (!this.timeSliderDiv) {
            this.timeSliderDiv = createDiv('timeSliderDiv custom-thredd-Scroll');
            // this.timeSliderDiv.style.width = this.ParentDivWidth.toString() + "px";
            if (this.param.alignTimeSlider === "left") {
                this.timeSliderDiv.style.left = "10px";
                this.timeSliderDiv.style.transform = "translateX(0%)";
            } else if (this.param.alignTimeSlider === "right") {
                this.timeSliderDiv.style.right = "10px";
                this.timeSliderDiv.style.transform = "translateX(0%)";
            } else if (this.param.alignTimeSlider === "center") {

                // this.timeSliderDiv.style.left = 'calc(50% - ' + (this.ParentDivWidth / 2).toString() + 'px)';
            } else {
                // this.timeSliderDiv.style.left = 'calc(50% - ' + (this.ParentDivWidth / 2).toString() + 'px)';
            }
            olOverlaycontainer.append(this.timeSliderDiv);
        }
        let ui = this.completeUI();
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

    /**
     *
     * @returns {$ElementType}
     */
    completeUI() {
        let containerClass = 'timeSliderInnerDiv' + " " + this.param.id
        this.container = createDiv(containerClass);

        this.timeMapTitle = createDiv('time-map-title');
        this.timeMapTitle.innerText = this.param.title;

        this.btnGroup = createDiv('btn-group');

        //step-backward
        this.spanStepBack = createSpan('btn btn-sm btn-default');
        let iStepBack = createI('glyphicon glyphicon-step-backward');
        this.spanStepBack.append(iStepBack);

        //play-pause
        this.spanPlayPause = createSpan('btn btn-sm btn-default thredds-data-server-play-pause');
        this.iPlayPause = createI('glyphicon glyphicon-play');
        this.iPlayPause.setAttribute("playing", false);
        this.spanPlayPause.append(this.iPlayPause);

        //StepForward
        this.spanStepForward = createSpan('btn btn-sm btn-default');
        let iStepForward = createI('glyphicon glyphicon-step-forward');
        this.spanStepForward.append(iStepForward);

        //StepForward
        this.spanRepeatToggle = createSpan('btn btn-sm btn-default time-threads-repeat-toggle border-right');
        this.spanRepeatToggle.setAttribute("repeat", false);
        let iRepeatToggle = createI('glyphicon glyphicon-repeat');
        this.spanRepeatToggle.append(iRepeatToggle);

        // Date-Time
        this.aTime = createA('thredds-data-server-data-time timecontrol-date');
        this.aTime.innerText = this.AllDateAndTimeList[0].dateisoFormatForLevel;
        this.aTime.style.backgroundColor = "#fff";
        this.aTime.setAttribute("href", "javascript:void(0)");
        this.aTime.setAttribute("title", "Date");
        this.aTime.setAttribute("format", "ISO");

        // slider
        this.sliderDiv = createDiv('thredds-data-server-control-rangecontrol');
        this.sliderDiv.style.width = "203px";
        let lengthOfLayers = this.AllLayersList.length - 1;
        this.sliderInput = createInputRange("thredds-range thredds-data-server-slider-pic-range", 0, lengthOfLayers, 0);
        this.sliderDiv.append(this.sliderInput);

        //slider fps
        this.fpsDiv = createDiv('thredds-data-server-control-rangecontrol glyphicon-dashboard');
        this.fpsDiv.style.width = "122px";
        this.fpsSpan = createSpan("speed");
        this.fpsSpan.innerText = "1fps"
        this.fpsInput = createInputRange("thredds-range thredds-data-server-slider-pic-range-fps", 1, 6, 1,1);
        this.fpsDiv.append(this.fpsSpan);
        this.fpsDiv.append(this.fpsInput);

        //Animation Download
        this.animationDownloadSpan = createSpan('btn btn-sm btn-default border-right');
        this.animationDownloadSpan.setAttribute('title', 'Download Animation');
        this.animationDownloadSpan.setAttribute('data-disabled', 0);
        this.downloadIcon = createI('glyphicon glyphicon-download-alt');
        this.animationDownloadSpan.append(this.downloadIcon)

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

    /**
     *
     */
    bindEvents() {
        /**
         *
         */
        this.sliderInput.addEventListener("input", () => {
            let id = this.AllDateAndTimeList[parseInt(this.sliderInput.value.toString())].layerid;
            let currentLayerDetail = this.AllDateAndTimeList.filter(x => x.layerid === id)[0];
            let currentFormat = this.aTime.getAttribute("format");
            if (currentFormat === 'ISO') {
                this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
            } else {
                this.aTime.innerText = currentLayerDetail.localDateTime;
            }

        }, true);
        /**
         *
         */
        this.sliderInput.addEventListener("change", () => {
            let id = this.AllDateAndTimeList[parseInt(this.sliderInput.value.toString())].layerid;
            let changedToLayer = this.AllLayersList.filter(x => x.getProperties().id === id)[0];
            changedToLayer.setOpacity(0);
            changedToLayer.setVisible(true);
            this.changedToLayer = id;
            var intervalId = null;
            var varName = () => {
                if (this.loading === 0) {
                    /* your code goes here */
                    let currentLayer = this.AllLayersList.filter(x => x.getProperties().id === this.currentLayerId)[0];
                    let changedToLayer = this.AllLayersList.filter(x => x.getProperties().id === this.changedToLayer)[0];
                    currentLayer.setOpacity(0);
                    changedToLayer.setOpacity(this.opacity);
                    currentLayer.setVisible(false);
                    changedToLayer.setVisible(true);
                    this.currentLayerId = this.changedToLayer;
                    if (this.t0) {
                        var t1 = performance.now();
                    }
                    clearInterval(intervalId);
                }
            };
            intervalId = setInterval(varName, 30);

        }, true);
        this.fpsInput.addEventListener("input", () => {
            this.fpsSpan.innerText = this.fpsInput.value.toString() + "fps";
            this.frameIntervalMS = parseInt(1000 / parseInt(this.fpsInput.value));
            if (this.interValFun) {
                this.iPlayPause.setAttribute("playing", false);
                this.iPlayPause.classList.add('glyphicon-play');
                this.iPlayPause.classList.remove('glyphicon-pause');
                clearInterval(this.interValFun);
                this.t0 = 0
            }
        }, true);
        this.aTime.addEventListener("click", () => {
            let currentFormat = this.aTime.getAttribute("format");
            let innerText = this.aTime.innerText;
            if (currentFormat === "ISO") {
                let currentLayerDetail = this.AllDateAndTimeList.filter(x => x.dateisoFormatForLevel === innerText)[0];
                this.aTime.innerText = currentLayerDetail.localDateTime;
                this.aTime.setAttribute("format", "local");
            } else {
                let currentLayerDetail = this.AllDateAndTimeList.filter(x => x.localDateTime === innerText)[0];
                this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                this.aTime.setAttribute("format", "ISO");
            }

        }, true);
        this.spanRepeatToggle.addEventListener("click", () => {
            let currentValue = this.spanRepeatToggle.getAttribute("repeat");
            var isTrueSet = (currentValue === 'true');
            if (isTrueSet === true) {
                this.spanRepeatToggle.setAttribute("repeat", false);
                this.spanRepeatToggle.classList.remove('looped');
            } else {
                this.spanRepeatToggle.setAttribute("repeat", true);
                this.spanRepeatToggle.classList.add('looped');
            }

        }, true);
        this.AllLayersList.forEach((value) => {
            value.getSource().on('tileloadstart', this.tileLoadStart.bind(this));
            value.getSource().on('tileloadend', this.tileLoadEnd.bind(this));
            value.getSource().on('tileloaderror', this.tileLoadEnd(this));
        });
        this.spanStepBack.addEventListener("click", () => {
            let curLId = this.currentLayerId;
            let index = this.AllDateAndTimeList.findIndex(x => x.layerid === curLId) - 1;
            if (index >= 0) {
                let currentLayerDetail = this.AllDateAndTimeList[index];
                let currentFormat = this.aTime.getAttribute("format");
                if (currentFormat === 'ISO') {
                    this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                } else {
                    this.aTime.innerText = currentLayerDetail.localDateTime;
                }
                this.sliderInput.value = index;
                // Create a new 'change' event
                var event = new Event('change');
                // Dispatch it.
                this.sliderInput.dispatchEvent(event);
                // this.sliderInput.fireEvent("onchange");
            }
        }, true);
        this.spanStepForward.addEventListener("click", () => {
            let curLId = this.currentLayerId;
            let index = this.AllDateAndTimeList.findIndex(x => x.layerid === curLId) + 1;
            let totLen = this.AllDateAndTimeList.length
            if (index < totLen) {
                let currentLayerDetail = this.AllDateAndTimeList[index];
                let currentFormat = this.aTime.getAttribute("format");
                if (currentFormat === 'ISO') {
                    this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                } else {
                    this.aTime.innerText = currentLayerDetail.localDateTime;
                }
                this.sliderInput.value = index;
                // Create a new 'change' event
                var event = new Event('change');
                // Dispatch it.
                this.sliderInput.dispatchEvent(event);
                // this.sliderInput.fireEvent("onchange");
            }
        }, true);
        this.spanPlayPause.addEventListener("click", () => {
            let currentValue = this.iPlayPause.getAttribute("playing");
            var isTrueSet = (currentValue === 'true');
            if (isTrueSet === true) {
                //  currently playing , Now stop it
                this.iPlayPause.setAttribute("playing", false);
                this.iPlayPause.classList.add('glyphicon-play');
                this.iPlayPause.classList.remove('glyphicon-pause');
                if (this.interValFun) {
                    clearInterval(this.interValFun);
                    this.t0 = 0;
                }
            } else {
                //  currently stop , Now playing it
                this.iPlayPause.setAttribute("playing", true);
                this.iPlayPause.classList.remove('glyphicon-play');
                this.iPlayPause.classList.add('glyphicon-pause');
                if (this.interValFun) {
                    clearInterval(this.interValFun);
                    this.t0 = performance.now();
                    this.interValFun = setInterval(this.playTime, this.frameIntervalMS);
                } else {
                    this.t0 = performance.now();
                    this.interValFun = setInterval(this.playTime, this.frameIntervalMS);
                }
            }

        }, true);
        this.playTime = () => {
            let curLId = this.currentLayerId;
            let index = this.AllDateAndTimeList.findIndex(x => x.layerid === curLId) + 1;
            let totLen = this.AllDateAndTimeList.length
            if (index < totLen) {
                let currentLayerDetail = this.AllDateAndTimeList[index];
                let currentFormat = this.aTime.getAttribute("format");
                if (currentFormat === 'ISO') {
                    this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                } else {
                    this.aTime.innerText = currentLayerDetail.localDateTime;
                }
                this.sliderInput.value = index;
                // Create a new 'change' event
                var event = new Event('change');
                // Dispatch it.
                this.sliderInput.dispatchEvent(event);
                // this.interValFun=setInterval(this.playTime, this.frameIntervalMS);
            } else {
                let currentValue = this.spanRepeatToggle.getAttribute("repeat");
                var isTrueSet = (currentValue === 'true');
                if (isTrueSet === true) {
                    this.sliderInput.value = 0;
                    // Create a new 'change' event
                    var event = new Event('change');
                    // Dispatch it.
                    this.sliderInput.dispatchEvent(event);
                } else {
                    if (this.interValFun) {
                        clearInterval(this.interValFun);
                        this.t0 = 0
                        this.iPlayPause.setAttribute("playing", false);
                        this.iPlayPause.classList.add('glyphicon-play');
                        this.iPlayPause.classList.remove('glyphicon-pause');
                    }
                }
            }
        };
        this.animationDownloadSpan.addEventListener('click', async () => {
            // let CheckDisable = parseInt(this.animationDownloadSpan.getAttribute('data-disabled'));
            if (this.isFunction(this.param.animationGIFFunction)) {
                this.param.animationGIFFunction.bind(this);
            }

            // if (!CheckDisable) {
            // if (this.param.RGBComposite) {
            //
            // this.animationDownloadSpan.setAttribute('data-disabled', 1);
            // let fps = 1 / parseInt(this.fpsInput.value)
            // let gifshotParams = {
            //     images: [],
            //     gifWidth: 1000,
            //     gifHeight: 720,
            //     numFrames: this.AllDateAndTimeList.length,
            //     interval: fps,
            //     frameDuration: fps,
            //     fontWeight: 'normal',
            //     fontSize: '22px',
            //     fontFamily: 'sans-serif',
            //     fontColor: '#ffffff',
            //     textAlign: 'center',
            //     textBaseline: 'bottom',
            //     sampleInterval: 10,
            //     numWorkers: 2
            // }
            // let BaseUrl = this.param.source.url;
            // this.AllDateAndTimeList.forEach((currentObj, index) => {
            //     let WMSTileUrl = BaseUrl[index] + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&SRS=EPSG:4326&BBOX=60,15,110,40&WIDTH=1000&HEIGHT=720' + '&LAYERS=' + this.param.source.params.LAYERS + '&TRANSPARENT=true&SLD_BODY=' + encodeURIComponent(this.param.source.params.SLD_BODY).toString() + '&TIME='
            //     let imgObj = {src: WMSTileUrl + currentObj.dateisoFormat, text: currentObj.dateisoFormat};
            //     gifshotParams.images.push(imgObj);
            // });
            // var fileName = this.param.title + '.gif';
            // gifshot.createGIF(gifshotParams, function (obj) {
            //     if (!obj.error) {
            //         var image = obj.image;
            //         var download = document.createElement('a');
            //         download.href = image;
            //         download.download = fileName;
            //         document.body.appendChild(download);
            //         download.click();
            //         document.body.removeChild(download);
            //     }
            // });
            // this.animationDownloadSpan.setAttribute('data-disabled', 0);
            //
            // } else {
            //     this.animationDownloadSpan.setAttribute('data-disabled', 1);
            //     let currentLayer = this.getCurrentLayer();
            //     let layerPropertiesObject = currentLayer.getProperties();
            //     let layerSourceParam = layerPropertiesObject.source.getParams();
            //     let layerUrl = layerPropertiesObject.source.getUrls()[0].split('wms')[1];
            //     let plotProp = this.param.plotInfo();
            //     let SourceURL = [];
            //     this.param.source.url.forEach(function (val) {
            //         SourceURL.push(val.split('/wms/')[1]);
            //     });
            //     plotProp.DATADIR = SourceURL
            //     plotProp.LAYER = layerSourceParam.LAYERS
            //     plotProp.COLORSCALERANGE = layerSourceParam.COLORSCALERANGE
            //     plotProp.fps = parseInt(this.fpsInput.value)
            //     plotProp.rid = parseInt($('#selectl0').val());
            //     let responseData = await myApp.makeRequestWithCookieCSRFToken('POST', this.param.api.createGIF, plotProp)
            //     let ParseJson = JSON.parse(responseData)
            //     let gifUrl = this.param.api.GetImage + "?gif=true&ImageName=" + ParseJson.image
            //     var fileName = this.param.title + '.gif';
            //     this.forceDownload(gifUrl, fileName);
            //     this.animationDownloadSpan.setAttribute('data-disabled', 0);
            // }
            // }
        }, true);
    };

    /**
     *
     * @param {*} event
     */
    tileLoadStart(event) {
        this.loading = this.loading + 1;
        if (this.loading === 1) {
            this.aTime.classList.add('loading');
            this.aTime.style.backgroundColor = "#ffefa4";
        }
    };

    /**
     *
     * @param {*} event
     */
    tileLoadEnd(event) {
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

    /**
     *
     * @param {*} visibleorNot
     */
    setVisible(visibleorNot) {
        let currentLayer = this.AllLayersList.filter(x => x.getProperties().id === this.currentLayerId)[0];
        currentLayer.setVisible(visibleorNot);
        this.param.visible = visibleorNot;

        if (visibleorNot === true) {
            this.container.style.display = 'flex';
            if (this.param.showlegend === true) {
                this.imageContainer.style.display = 'block';
            } else {
                this.imageContainer.style.display = 'none';
            }
            ;
            if (this.param.showControlPanel === false) {
                this.container.style.display = 'none';
            }
        } else {
            this.container.style.display = 'none';
            this.imageContainer.style.display = 'none';
        }
        //If Layer is in playing Mode stop it.
        if (this.interValFun) {
            this.iPlayPause.setAttribute("playing", false);
            this.iPlayPause.classList.add('glyphicon-play');
            this.iPlayPause.classList.remove('glyphicon-pause');
            clearInterval(this.interValFun);
            this.t0 = 0
        }

        //slider pannel
        let parentElement = this.container.parentElement
        let allChildrenelement = parentElement.children
        let blockCount = 0;
        for (let el of allChildrenelement) {
            if (getComputedStyle(el)["display"] === "flex") {
                blockCount += 1;
            }
        }
        if (blockCount === 0) {
            this.container.parentElement.style.display = 'none';
        } else {
            this.container.parentElement.style.display = 'flex';
        }

        //slider pannel
        let parentImageContainerElement = this.imageContainer.parentElement
        let allChildrenImageContainerelement = parentImageContainerElement.children
        let ImageblockCount = 0;
        for (let el of allChildrenImageContainerelement) {
            if (getComputedStyle(el)["display"] === "block") {
                ImageblockCount += 1;
            }
        }
        if (ImageblockCount === 0) {
            this.imageContainer.parentElement.style.display = 'none';
        } else {
            this.imageContainer.parentElement.style.display = 'block';
        }
    };

    /**
     *
     * @param {*} indexValue
     */
    setZIndex(indexValue) {
        this.AllLayersList.forEach(function (layer) {
            layer.setZIndex(indexValue);
        });
        this.timeSliderDiv.insertBefore(this.container, this.timeSliderDiv.firstChild);
    };

    /**
     *
     * @param {*} Coods
     */
    setMask(Coods) {
        this.setMaskOrCrop(Coods, 'mask');
    };

    /**
     *
     * @param {*} Coods
     */
    setCrop(Coods) {
        this.setMaskOrCrop(Coods, 'crop');
    };

    /**
     *
     * @param {*} Coods
     * @param {*} maskOrCrop
     */
    setMaskOrCrop(Coods, maskOrCrop) {
        let properties = this.getProperties();
        if (properties.mask) {
            var f = new ol.Feature(new ol.geom.MultiPolygon(Coods));
            if (!this.maskObjList.length) {
                let layer = this;
                if (properties.hasOwnProperty('ThreddsDataServerVersion')) {
                    layer.AllLayersList.forEach((timeDimensionLayer, index) => {
                        this.changeMask(timeDimensionLayer, Coods, index, false, maskOrCrop);
                    });
                } else {
                    this.changeMask(layer, Coods, 0, false, maskOrCrop);
                }
            } else {
                let layer = this;
                if (properties.hasOwnProperty('ThreddsDataServerVersion')) {
                    layer.AllLayersList.forEach((timeDimensionLayer, index) => {
                        this.changeMask(timeDimensionLayer, Coods, index, true, maskOrCrop);
                    });
                } else {
                    this.changeMask(layer, Coods, 0, true, maskOrCrop);
                }
            }
        }
    };

    /**
     *
     * @param {*} layer
     * @param {*} Coods
     * @param {*} ArrayIndex
     * @param {*} deleteOrNot
     * @param {*} maskOrCrop
     */
    changeMask(layer, Coods, ArrayIndex, deleteOrNot, maskOrCrop) {
        if (deleteOrNot) {
            layer.removeFilter(this.maskObjList[ArrayIndex]);
        }
        var f = new ol.Feature(new ol.geom.MultiPolygon(Coods));

        let MOrC = null;
        if (maskOrCrop == 'crop') {
            MOrC = new ol.filter.Crop({feature: f, inner: false});
        } else {
            MOrC = new ol.filter.Mask({
                feature: f,
                inner: false,
                fill: new ol.style.Fill({color: [185, 185, 185, 0.7]})
            });
        }
        layer.addFilter(MOrC);
        MOrC.set('active', true);
        this.maskObjList[ArrayIndex] = MOrC;
    };

    /**
     *
     * @param {*} opac
     */
    setOpacity(opac) {
        this.opacity = opac;
        let currentLayer = this.AllLayersList.filter(x => x.getProperties().id === this.currentLayerId)[0];
        currentLayer.setOpacity(this.opacity);
    };

    /**
     *
     * @returns {Object}
     */
    getProperties() {
        return this.param;
    };

    /**
     *
     */
    computeImgSize() {
        var newImg = new Image();
        newImg.src = this.legendPath;
        this.legendHeight = newImg.height;
        this.legendWidth = newImg.width;
    };

    /**
     *
     * @returns {*}
     */
    getInitilizationStatus() {
        return this.initilizationStatus;
    };

    getAllDateAndTimeList() {
        return this.AllDateAndTimeList;
    };

    /**
     *
     * @returns {Object}
     */
    GetFirstLayer() {
        return this.AllLayersList[0];
    };

    /**
     *
     * @returns {Object}
     */
    getCurrentLayer() {
        let currentLayer = this.AllLayersList.filter(x => x.getProperties().visible === true)[0];
        return currentLayer;
    };

    /**
     *
     * @param {*} o
     * @returns {Boolean}
     */
    isFunction(o) {
        return Function.prototype.isPrototypeOf(o);
    };

    // addLayerPrototypeOfMap() {
    //     if (!PluggableMap.prototype.addThreddsLayer) {
    //         PluggableMap.prototype.addThreddsLayer = function (LayerList) {
    //             for (let l of LayerList) {
    //                 this.addLayer(l);
    //             }
    //         };
    //     }
    // }
}

export default TimeDimensionTile;

