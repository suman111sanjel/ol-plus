import { createDiv, createSpan, createB, createBr, createTable, createTbody, createTr, createTd } from '../ui/UI';
import "./EDALSLD.css";
var EDALSLD = /** @class */ (function () {
    function EDALSLD(params) {
        this.param = { showLegendTitle: true };
        this.param = Object.assign(this.param, params);
        var ColorAndValueStringXMl = '';
        for (var _i = 0, _a = params.propForSLD; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.classType === 'Below') {
                ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + ("<se:Value>" + i.color + "</se:Value>");
                ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + ("<se:Threshold>" + i.value.toString() + "</se:Threshold>");
            }
            else if (i.classType === 'Above') {
                var lastValue = "<se:Threshold>" + i.value.toString() + "</se:Threshold>";
                if (!ColorAndValueStringXMl.includes(lastValue)) {
                    ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + lastValue;
                }
                ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + ("<se:Value>" + i.color + "</se:Value>");
            }
            else {
                var range = i.range;
                var FirstValue = "<se:Threshold>" + range[0] + "</se:Threshold>";
                var SecondValue = "<se:Threshold>" + range[1] + "</se:Threshold>";
                if (!ColorAndValueStringXMl.includes(FirstValue)) {
                    ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + FirstValue;
                }
                ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + ("<se:Value>" + i.color + "</se:Value>");
                if (!ColorAndValueStringXMl.includes(SecondValue)) {
                    ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + SecondValue;
                }
            }
        }
        this.createSLD(params.parameterName, ColorAndValueStringXMl);
    }
    EDALSLD.prototype.createSLD = function (parameterName, ColorAndValueStringXMl) {
        var SLDString = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n<StyledLayerDescriptor version=\"1.1.0\" xsi:schemaLocation=\"http://www.opengis.net/sldStyledLayerDescriptor.xsd\"\n                       xmlns=\"http://www.opengis.net/sld\" xmlns:ogc=\"http://www.opengis.net/ogc\"\n                       xmlns:se=\"http://www.opengis.net/se\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                       xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n    <NamedLayer>\n        <se:Name>" + parameterName + "</se:Name>\n        <UserStyle>\n            <se:Name>Thesholded colour scheme</se:Name>\n            <se:CoverageStyle>\n                <se:Rule>\n                    <se:RasterSymbolizer>\n                        <se:Opacity>1.0</se:Opacity>\n                        <se:ColorMap>\n                            <se:Categorize fallbackValue=\"#00000000\">\n                                <se:LookupValue>Rasterdata</se:LookupValue>\n                                " + ColorAndValueStringXMl + "\n                            </se:Categorize>\n                        </se:ColorMap>\n                    </se:RasterSymbolizer>\n                </se:Rule>\n            </se:CoverageStyle>\n        </UserStyle>\n    </NamedLayer>\n</StyledLayerDescriptor>";
        this.EDALSLDString = SLDString.replace(/(\r\n|\n|\r)/gm, "");
    };
    EDALSLD.prototype.getEDALSLD = function () {
        return this.EDALSLDString;
    };
    EDALSLD.prototype.getLegendHTMLElement = function () {
        var outerDivCSSClass = 'info legend legend-control';
        if (this.param.showLegendTitle) {
            outerDivCSSClass = outerDivCSSClass + " " + this.param.showLegendTitle;
        }
        var outerDiv = createDiv(outerDivCSSClass);
        var span = null;
        if (this.param.showLegendTitle) {
            span = createSpan("legend-text");
            var b = createB();
            b.innerText = this.param.title;
            span.append(b);
        }
        var br = createBr();
        var table = createTable("legend-table");
        var tbody = createTbody();
        for (var _i = 0, _a = this.param.propForSLD; _i < _a.length; _i++) {
            var kk = _a[_i];
            var tr = createTr("legend-row");
            var td1 = createTd("legend-symbol");
            td1.style.backgroundColor = kk.color;
            var td2 = createTd("legend-text legend-label");
            td2.innerText = kk.label[0];
            var td3 = createTd("legend-text");
            td3.innerText = kk.label[1];
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tbody.prepend(tr);
        }
        table.append(tbody);
        if (this.param.showLegendTitle) {
            outerDiv.append(span);
        }
        outerDiv.append(br);
        outerDiv.append(table);
        return outerDiv;
    };
    return EDALSLD;
}());
export default EDALSLD;
//# sourceMappingURL=EDALSLD.js.map