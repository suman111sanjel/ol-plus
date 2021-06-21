import {
    createDiv,
    createSpan,
    createImg,
    createInput,
    createLabel
} from "./UI";

// import '../bootstrap-slider.min.js';
import '../bootstrap-slider.min.css';
import './LayerSwitcher.css'
import Slider from '../bootstrap-slider.min'

class LayerCheckBox {
    constructor(AppendingDivID, LayerObject, OpacitySlider, LegendDropDown, customCSSClass) {
        this.divID = AppendingDivID;
        this.layerObj = LayerObject;
        this.DisplayOpacity = OpacitySlider;
        this.DisplayLegendDropDown = LegendDropDown;
        this.customCSSClass = customCSSClass;
        this.init();
    }

    checkLayerProperties() {
        this.layerPropertiesObject = this.layerObj.getProperties();
        if (!this.layerPropertiesObject.id) {
            console.error("Please Provide Layer Id");
        }
        this.layerId = this.layerPropertiesObject.id

        if (!this.layerPropertiesObject.title) {
            console.error("Please Provide Layer title");
        }
        this.layerTitle = this.layerPropertiesObject.title;

        if (!this.layerPropertiesObject.legendPath) {
            console.error("Please Provide legend Path");
        }
        this.legendPath = this.layerPropertiesObject.legendPath;

        if (this.layerPropertiesObject.visible) {
            this.layerVisible = this.layerPropertiesObject.visible;
        } else {
            this.layerVisible = true;
        }
        this.layerVisible = this.layerPropertiesObject.visible;

        if (this.layerPropertiesObject.opacity) {
            this.layerOpacity = this.layerPropertiesObject.opacity;
        } else {
            this.layerOpacity = 1;
        }
    };

    LayerCheckbox() {
        this.outDIv = createDiv("LayerDiv");
        if (this.customCSSClass) {
            let classList = this.customCSSClass.split(" ")
            this.outDIv.classList.add(...classList)
        }
        let paddingDiv = createDiv("paddingForDiv");

        let OuterDiv = createDiv('custom-control custom-checkbox layerCheckPadding');
        this.CheckboxInput = createInput('custom-control-input');
        this.CheckboxInput.setAttribute('type', 'checkbox');
        this.CheckboxInput.setAttribute('id', this.layerId);
        this.CheckboxInput.setAttribute('LayerId', this.layerId);
        this.CheckboxInput.checked = this.layerVisible;
        let LavelTag = createLabel('custom-control-label');
        LavelTag.setAttribute('for', this.layerId);
        LavelTag.innerText = this.layerTitle;
        OuterDiv.append(this.CheckboxInput);
        OuterDiv.append(LavelTag);

        let ChevronDiv = createDiv('ChevronDiv');
        this.cheveronSapn = createSpan('glyphicon glyphicon-chevron-left');
        this.cheveronSapn.setAttribute('title', "Show/Hide Legend");
        this.cheveronSapn.setAttribute('show-legend', false);
        ChevronDiv.append(this.cheveronSapn)
        paddingDiv.append(OuterDiv)
        paddingDiv.append(ChevronDiv)
        this.outDIv.append(paddingDiv);


        this.legendDiv = createDiv('legend-div');
        this.legendDiv.style.display = 'none';
        if (this.layerPropertiesObject.customLegendElement) {
            let el=this.layerPropertiesObject.customLegendElement.cloneNode( true );
            this.legendDiv.append(el);
        } else {
            let imgTag = createImg("legend-image");
            imgTag.setAttribute("src", this.legendPath);
            this.legendDiv.append(imgTag)
        }

        this.outDIv.append(this.legendDiv);

        let LayerOpacityDiv = createDiv('opac-div');
        let LayerOpacityDivinner = createDiv();
        this.rangeInput = createInput('');
        this.rangeInput.setAttribute('type', 'text');
        this.rangeInput.setAttribute('data-slider-min', "0");
        this.rangeInput.setAttribute('data-slider-max', "100");
        this.rangeInput.setAttribute('data-slider-step', "1");
        this.rangeInput.setAttribute('data-slider-value', "100");
        this.rangeInput.setAttribute('data-slider-id', "ex1Slider");
        this.rangeInput.setAttribute('name', "OpacityRange");
        this.rangeInput.setAttribute('LayerId', this.layerId);
        this.rangeInput.setAttribute('id', this.layerId + "-Slider");

        LayerOpacityDivinner.append(this.rangeInput);
        LayerOpacityDiv.append(LayerOpacityDivinner);
        this.outDIv.append(LayerOpacityDiv);

        if (this.DisplayOpacity === false) {
            LayerOpacityDivinner.style.display = 'none';
        }
        return this.outDIv
    };

    bindEvents() {
        this.CheckboxInput.addEventListener("change", () => {
            this.layerObj.setVisible(this.CheckboxInput.checked);
            if (this.CheckboxInput.checked) {
                this.SliderObject.enable();
            } else {
                this.SliderObject.disable();
            }
        }, true);
        this.cheveronSapn.addEventListener("click", () => {
            let currentValue = this.cheveronSapn.getAttribute("show-legend");
            var isTrueSet = (currentValue === 'true');
            if (isTrueSet === true) {
                this.cheveronSapn.setAttribute("show-legend", false);
                this.legendDiv.style.display = 'none';
            } else {
                this.cheveronSapn.setAttribute("show-legend", true);
                this.legendDiv.style.display = 'block';
            }

        }, true);

        // Create a new 'change' event
        var event = new Event('change');
        // Dispatch it.
        this.CheckboxInput.dispatchEvent(event);
    };

    getProperties() {
        return this.layerObj.getProperties()
    };

    getLayer() {
        return this.layerObj;
    }

    setVisible(param) {
        this.layerObj.setVisible(param);
        this.CheckboxInput.checked = param;
        this.outDIv.style.display = 'block';
    };

    setVisibleDivBind(param) {
        this.layerObj.setVisible(param);
        this.CheckboxInput.checked = param;
        if (param === true) {
            this.outDIv.style.display = 'block';
        } else {
            this.outDIv.style.display = 'none';
        }
    };

    init() {
        this.checkLayerProperties();
        let LayerCheckBox = this.LayerCheckbox();
        let AppendingDiv = document.querySelector(this.divID);
        AppendingDiv.append(LayerCheckBox);
        let that = this;
        // $('#' + this.layerId + '-Slider').slider({
        //     tooltip: 'always',
        //     value: this.layerOpacity * 100,
        //     step: 1,
        //     min: 0,
        //     max: 100,
        //     formatter: function (value) {
        //         var valueOp = parseInt(value) / 100;
        //         that.layerObj.setOpacity(valueOp);
        //         return value + " %";
        //     }
        // });

        // Without JQuery
        this.SliderObject = new Slider('#' + this.layerId + '-Slider', {
            tooltip: 'always',
            value: this.layerOpacity * 100,
            step: 1,
            min: 0,
            max: 100,
            formatter: function (value) {
                var valueOp = parseInt(value) / 100;
                that.layerObj.setOpacity(valueOp);
                return value + " %";
            }
        });

        this.bindEvents();
    };

}

export default LayerCheckBox;
