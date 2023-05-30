export var createElement = function (type, className) {
    var _a;
    var element = document.createElement(type);
    if (className) {
        var classList = className.split(" ");
        (_a = element.classList).add.apply(_a, classList);
    }
    return element;
};
export var createDiv = function (ClassName) {
    var div = createElement('div', ClassName);
    return div;
};
export var createSpan = function (ClassName) {
    var span = createElement('span', ClassName);
    return span;
};
export var createA = function (ClassName) {
    var a = createElement('a', ClassName);
    return a;
};
export var createButton = function (ClassName) {
    var a = createElement('button', ClassName);
    return a;
};
export var createI = function (ClassName) {
    var i = createElement('i', ClassName);
    return i;
};
export var createImg = function (ClassName) {
    var img = createElement('img', ClassName);
    return img;
};
export var createInput = function (ClassName) {
    var i = createElement('input', ClassName);
    return i;
};
export var createSelect = function (ClassName) {
    var i = createElement('select', ClassName);
    return i;
};
export var createOption = function (ClassName) {
    var i = createElement('option', ClassName);
    return i;
};
export var createH = function (HeadingNumber, ClassName) {
    var i = createElement('h' + HeadingNumber.toString(), ClassName);
    return i;
};
export var createLabel = function (ClassName) {
    var i = createElement('label', ClassName);
    return i;
};
export var createB = function (ClassName) {
    var i = createElement('b', ClassName);
    return i;
};
export var createBr = function (ClassName) {
    var i = createElement('br', ClassName);
    return i;
};
export var createTable = function (ClassName) {
    var i = createElement('table', ClassName);
    return i;
};
export var createTbody = function (ClassName) {
    var i = createElement('tbody', ClassName);
    return i;
};
export var createTr = function (ClassName) {
    var i = createElement('tr', ClassName);
    return i;
};
export var createTd = function (ClassName) {
    var i = createElement('td', ClassName);
    return i;
};
export var createInputRange = function (ClassName, min, max, step, value) {
    var i = createInput(ClassName);
    i.setAttribute("type", "range");
    i.setAttribute("min", min);
    i.setAttribute("max", max);
    i.setAttribute("step", step);
    i.setAttribute("value", value);
    return i;
};
//# sourceMappingURL=UI.js.map