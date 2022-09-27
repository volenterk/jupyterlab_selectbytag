"use strict";
(self["webpackChunkjupyterlab_selectbytag"] = self["webpackChunkjupyterlab_selectbytag"] || []).push([["lib_index_js"],{

/***/ "./lib/collectTags.js":
/*!****************************!*\
  !*** ./lib/collectTags.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collectTags": () => (/* binding */ collectTags)
/* harmony export */ });
function collectTags(sender) {
    const cells = sender.cells;
    const set = new Set();
    for (let i = 0; cells && i <= cells.length; i++) {
        const cell = cells.get(i);
        if (cell) {
            const currentTags = cell.metadata.get('tags');
            if (currentTags) {
                currentTags.toString().split(',').forEach((e) => {
                    set.add(e);
                });
            }
        }
    }
    return Array.from(set);
}


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectByTagExtension": () => (/* binding */ SelectByTagExtension),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "selectIcon": () => (/* binding */ selectIcon)
/* harmony export */ });
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _selectByTagDropdownWidget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./selectByTagDropdownWidget */ "./lib/selectByTagDropdownWidget.js");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_icons_selectbytag_icon_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/icons/selectbytag_icon.svg */ "./style/icons/selectbytag_icon.svg");






const selectIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.LabIcon({
    name: 'selectIcon',
    svgstr: _style_icons_selectbytag_icon_svg__WEBPACK_IMPORTED_MODULE_4__["default"]
});
const plugin = {
    activate,
    id: 'jupyterlab_selectbytag',
    autoStart: true,
};
class SelectByTagExtension {
    createNew(panel, context) {
        const selectbytag = () => {
            _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__.NotebookActions.deselectAll(panel.content);
            const topOption = dropdown.node.getElementsByTagName('select')[0];
            const currentTag = topOption.options[topOption.selectedIndex].value;
            panel.content.widgets.forEach((child, index) => {
                let cellTags = child.model.metadata.get('tags') || [];
                cellTags = cellTags.toString().split(',');
                if (cellTags.indexOf(currentTag) !== -1) {
                    panel.content.select(child);
                }
            });
        };
        const button = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton({
            className: 'lm-Widget p-Widget jp-CommandToolbarButton nbdime-toolbarButton jp-Toolbar-item bp3-button bp3-minimal jp-ToolbarButtonComponent minimal jp-Button',
            icon: selectIcon,
            onClick: selectbytag,
            tooltip: 'Select by tag',
        });
        panel.toolbar.insertAfter('cellType', 'selectbytag', button);
        const dropdown = new _selectByTagDropdownWidget__WEBPACK_IMPORTED_MODULE_5__.SelectByTagDropdownWidget(context.model);
        panel.toolbar.insertAfter('selectbytag', 'dropdown', dropdown);
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_0__.DisposableDelegate(() => {
            button.dispose();
            dropdown.dispose();
        });
    }
}
function activate(app, tracker, model) {
    app.docRegistry.addWidgetExtension('Notebook', new SelectByTagExtension());
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ }),

/***/ "./lib/selectByTagComponent.js":
/*!*************************************!*\
  !*** ./lib/selectByTagComponent.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectByTagComponent": () => (/* binding */ SelectByTagComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _collectTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collectTags */ "./lib/collectTags.js");


class SelectByTagComponent extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
    constructor(props) {
        super(props);
        this.state = { tags: ['-'] };
    }
    render() {
        const dropdownList = [];
        for (let i = 0; i < this.state.tags.length; i++) {
            dropdownList.push(react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { key: i, value: this.state.tags[i] }, this.state.tags[i]));
        }
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "jp-HTMLSelect jp-DefaultStyle jp-Notebook-toolbarCellTypeDropdown" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", null, dropdownList));
    }
    ;
    componentDidMount() {
        const { model } = this.props;
        model.contentChanged.connect((sender, args) => {
            let notebookTags = (0,_collectTags__WEBPACK_IMPORTED_MODULE_1__.collectTags)(sender);
            if (notebookTags.length === 0)
                notebookTags = ['-'];
            this.setState({ tags: notebookTags });
        });
    }
}


/***/ }),

/***/ "./lib/selectByTagDropdownWidget.js":
/*!******************************************!*\
  !*** ./lib/selectByTagDropdownWidget.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectByTagDropdownWidget": () => (/* binding */ SelectByTagDropdownWidget)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _selectByTagComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectByTagComponent */ "./lib/selectByTagComponent.js");



class SelectByTagDropdownWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
    constructor(model) {
        super();
        this._model = model;
        this.addClass('lm-Widget');
        this.addClass('p-Widget');
        this.addClass('jp-Notebook-toolbarCellType');
        this.addClass('jp-Toolbar-item');
    }
    render() {
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_selectByTagComponent__WEBPACK_IMPORTED_MODULE_2__.SelectByTagComponent, { model: this._model });
    }
}


/***/ }),

/***/ "./style/icons/selectbytag_icon.svg":
/*!******************************************!*\
  !*** ./style/icons/selectbytag_icon.svg ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\r\n<path style=\"fill:#3CB54A;\" d=\"M385.007,151.2L262.527,44c-6.024-5.256-15.016-5.256-21.04,0l-122.56,107.2\r\n\tc-6.936,6.048-10.928,14.8-10.96,24V496c0,8.84,7.16,16,16,16h256c8.84,0,16-7.16,16-16V175.28\r\n\tC395.959,166.048,391.967,157.272,385.007,151.2z M251.967,184c-17.672,0-32-14.328-32-32s14.328-32,32-32s32,14.328,32,32\r\n\tS269.639,184,251.967,184z\"/>\r\n<g>\r\n\t<path style=\"fill:#0E9347;\" d=\"M251.967,104c-26.512,0-48,21.488-48,48s21.488,48,48,48s48-21.488,48-48S278.479,104,251.967,104z\r\n\t\t M251.967,184c-17.672,0-32-14.328-32-32s14.328-32,32-32s32,14.328,32,32S269.639,184,251.967,184z\"/>\r\n\t<path style=\"fill:#0E9347;\" d=\"M369.887,137.92c-1.36,1.44-2.8,2.96-4.24,4.24c-22.512,20.728-56.168,23.648-81.92,7.12\r\n\t\tc0,0.88,0,1.76,0,2.72c-0.04,4.864-1.192,9.648-3.36,14l2.4,1.36c31.552,15.712,69.568,9.88,94.96-14.56\r\n\t\tc1.44-1.36,2.8-2.88,4.16-4.4L369.887,137.92z\"/>\r\n\t<path style=\"fill:#0E9347;\" d=\"M379.967,192v304h-240c-8.84,0-16,7.16-16,16h256c8.84,0,16-7.16,16-16l0,0V176l0,0\r\n\t\tC387.127,176,379.967,183.16,379.967,192z\"/>\r\n</g>\r\n<path style=\"fill:#B2C4D0;\" d=\"M319.967,0c-29.44-0.072-56.76,15.288-72,40.48c5.024-1.224,10.328,0.064,14.24,3.44l1.76,1.44\r\n\tc21.248-30.912,63.536-38.736,94.448-17.488s38.736,63.536,17.488,94.448s-63.536,38.736-94.448,17.488\r\n\tc-6.848-4.712-12.776-10.64-17.488-17.488c-6.08-2.528-12.808-3.032-19.2-1.44c8.224,16.68,21.72,30.176,38.4,38.4\r\n\tc41.624,20.392,91.888,3.184,112.288-38.432c20.392-41.624,3.184-91.896-38.44-112.288C345.487,2.912,332.807-0.016,319.967,0z\"/>\r\n<path style=\"fill:#8FAEBF;\" d=\"M278.847,138L278.847,138c-5.84-4.488-10.92-9.896-15.04-16c-6.08-2.528-12.808-3.032-19.2-1.44\r\n\tc3.032,6.376,6.848,12.336,11.36,17.76l0,0C263.271,135.288,271.463,135.176,278.847,138z\"/>\r\n<g>\r\n\t<path style=\"fill:#ECF0F9;\" d=\"M179.967,416h144c4.416,0,8,3.584,8,8l0,0c0,4.416-3.584,8-8,8h-144c-4.416,0-8-3.584-8-8l0,0\r\n\t\tC171.967,419.584,175.551,416,179.967,416z\"/>\r\n\t<path style=\"fill:#ECF0F9;\" d=\"M179.967,376h144c4.416,0,8,3.584,8,8l0,0c0,4.416-3.584,8-8,8h-144c-4.416,0-8-3.584-8-8l0,0\r\n\t\tC171.967,379.584,175.551,376,179.967,376z\"/>\r\n\t<path style=\"fill:#ECF0F9;\" d=\"M179.967,336h144c4.416,0,8,3.584,8,8l0,0c0,4.416-3.584,8-8,8h-144c-4.416,0-8-3.584-8-8l0,0\r\n\t\tC171.967,339.584,175.551,336,179.967,336z\"/>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n<g>\r\n</g>\r\n</svg>\r\n");

/***/ })

}]);
//# sourceMappingURL=lib_index_js.7c415b445ccb17657241.js.map