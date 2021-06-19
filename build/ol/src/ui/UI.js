export let createElement = function (type, className) {
    var element = document.createElement(type);
    if (className) {
        let classList = className.split(" ")
        element.classList.add(...classList);
    }
    return element
}

export let createDiv = function (ClassName) {
    var div =createElement('div', ClassName);
    return div;
}

export let createSpan = function (ClassName) {
    var span =createElement('span', ClassName);
    return span;
}

export let createA = function (ClassName) {
    var a =createElement('a', ClassName);
    return a;
}
export let createButton = function (ClassName) {
    var a =createElement('button', ClassName);
    return a;
}
export let createI = function (ClassName) {
    var i =createElement('i', ClassName);
    return i;
}
export let createImg = function (ClassName) {
    var img =createElement('img', ClassName);
    return img;
}
export let createInput = function (ClassName) {
    var i =createElement('input', ClassName);
    return i;
}
export let createSelect = function (ClassName) {
    var i =createElement('select', ClassName);
    return i;
}
export let createOption = function (ClassName) {
    var i =createElement('option', ClassName);
    return i;
}
export let createH = function (HeadingNumber, ClassName) {
    var i =createElement('h' + HeadingNumber.toString(), ClassName);
    return i;
}
export let createLabel = function (ClassName) {
    var i =createElement('label', ClassName);
    return i;
}
export let createB = function (ClassName) {
    var i =createElement('b', ClassName);
    return i;
}
export let createBr = function (ClassName) {
    var i =createElement('br', ClassName);
    return i;
}
export let createTable = function (ClassName) {
    var i =createElement('table', ClassName);
    return i;
}
export let createTbody = function (ClassName) {
    var i =createElement('tbody', ClassName);
    return i;
}

export let createTr = function (ClassName) {
    var i =createElement('tr', ClassName);
    return i;
}

export let createTd = function (ClassName) {
    var i =createElement('td', ClassName);
    return i;
}

export let createInputRange= function (ClassName, min, max, step, value) {
        var i = createInput(ClassName);
        i.setAttribute("type", "range");
        i.setAttribute("min", min);
        i.setAttribute("max", max);
        i.setAttribute("step", step);
        i.setAttribute("value", value);
        return i;
    };

