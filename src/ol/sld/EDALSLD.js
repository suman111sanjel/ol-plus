import {createDiv, createSpan, createB, createBr, createTable, createTbody, createTr, createTd} from '../ui/UI'
import './EDALSLD.css'
class EDALSLD {
    constructor(params) {
        this.param = {showLegendTitle: true}
        this.param = Object.assign(this.param, params);
        let ColorAndValueStringXMl = '';
        for (let i of params.propForSLD) {

            if (i.classType === 'Below') {
                ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + `<se:Value>${i.color}</se:Value>`;
                ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + `<se:Threshold>${i.value.toString()}</se:Threshold>`;

            } else if (i.classType === 'Above') {
                let lastValue = `<se:Threshold>${i.value.toString()}</se:Threshold>`;
                if (!ColorAndValueStringXMl.includes(lastValue)) {
                    ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + lastValue;
                }
                ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + `<se:Value>${i.color}</se:Value>`;

            } else {
                let range = i.range;
                let FirstValue = `<se:Threshold>${range[0]}</se:Threshold>`;
                let SecondValue = `<se:Threshold>${range[1]}</se:Threshold>`;
                if (!ColorAndValueStringXMl.includes(FirstValue)) {
                    ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + FirstValue;
                }
                ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + `<se:Value>${i.color}</se:Value>`;
                if (!ColorAndValueStringXMl.includes(SecondValue)) {
                    ColorAndValueStringXMl = ColorAndValueStringXMl + "\n" + SecondValue;
                }
            }
        }
        this.createSLD(params.parameterName, ColorAndValueStringXMl);
    }

    createSLD(parameterName, ColorAndValueStringXMl) {
        let SLDString = `<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd"
                       xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
                       xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink"
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <NamedLayer>
        <se:Name>${parameterName}</se:Name>
        <UserStyle>
            <se:Name>Thesholded colour scheme</se:Name>
            <se:CoverageStyle>
                <se:Rule>
                    <se:RasterSymbolizer>
                        <se:Opacity>1.0</se:Opacity>
                        <se:ColorMap>
                            <se:Categorize fallbackValue="#00000000">
                                <se:LookupValue>Rasterdata</se:LookupValue>
                                ${ColorAndValueStringXMl}
                            </se:Categorize>
                        </se:ColorMap>
                    </se:RasterSymbolizer>
                </se:Rule>
            </se:CoverageStyle>
        </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>`;
        this.EDALSLDString = SLDString.replace(/(\r\n|\n|\r)/gm, "")
    }

    getEDALSLD() {
        return this.EDALSLDString
    }

    getLegendHTMLElement() {
        let outerDivCSSClass = 'info legend legend-control';
        if (this.param.showLegendTitle) {
            outerDivCSSClass = outerDivCSSClass + " " + this.param.showLegendTitle;
        }
        let outerDiv = createDiv(outerDivCSSClass);
        let span = null;
        if (this.param.showLegendTitle) {
            span = createSpan("legend-text");
            let b = createB();
            b.innerHTML = this.param.title;
            span.append(b);
        }
        let br = createBr();
        let table = createTable("legend-table");
        let tbody = createTbody();

        for (let kk of this.param.propForSLD) {
            let tr = createTr("legend-row");
            let td1 = createTd("legend-symbol");
            td1.style.backgroundColor = kk.color;
            let td2 = createTd("legend-text legend-label");
            td2.innerText = kk.label[0]
            let td3 = createTd("legend-text");
            td3.innerText = kk.label[1]
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tbody.prepend(tr);
        }
        table.append(tbody);
        if (this.param.showLegendTitle) {
            outerDiv.append(span);
            outerDiv.append(br);
        }
        outerDiv.append(table);
        return outerDiv
    }
}

export default EDALSLD;