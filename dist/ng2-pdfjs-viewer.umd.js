(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['ng2-pdfjs-viewer'] = {}),global.core,global.common));
}(this, (function (exports,core,common) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PdfJsViewerComponent = /** @class */ (function () {
    function PdfJsViewerComponent() {
        this.externalWindow = false;
        this.showSpinner = true;
        this.openFile = true;
        this.download = true;
        this.viewBookmark = true;
        this.defaultZoom = -1;
        this.initialLoad = false;
    }
    Object.defineProperty(PdfJsViewerComponent.prototype, "PDFViewerApplication", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ pdfViewer = null;
            if (this.externalWindow) {
                if (this.viewerTab) {
                    pdfViewer = this.viewerTab.PDFViewerApplication;
                }
            }
            else {
                if (this.iframe.nativeElement.contentWindow) {
                    pdfViewer = this.iframe.nativeElement.contentWindow.PDFViewerApplication;
                }
            }
            return pdfViewer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfJsViewerComponent.prototype, "pdfSrc", {
        get: /**
         * @return {?}
         */
        function () {
            return this.innerSrc;
        },
        set: /**
         * @param {?} innerSrc
         * @return {?}
         */
        function (innerSrc) {
            this.innerSrc = innerSrc;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PdfJsViewerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.externalWindow) { // Load pdf for embedded views
            // Load pdf for embedded views
            this.loadPdf();
        }
    };
    /**
     * @return {?}
     */
    PdfJsViewerComponent.prototype.refresh = /**
     * @return {?}
     */
    function () {
        // Needs to be invoked for external window or when needs to reload pdf
        this.loadPdf();
    };
    /**
     * @return {?}
     */
    PdfJsViewerComponent.prototype.refreshForce = /**
     * @return {?}
     */
    function () {
        this.loadPdfInitial();
    };
    /**
     * @return {?}
     */
    PdfJsViewerComponent.prototype.loadPdf = /**
     * @return {?}
     */
    function () {
        if (!this.innerSrc) {
            return;
        }
        if (this.initialLoad) {
            this.initialLoad = true;
            this.loadPdfInitial();
        }
        else {
            // Don't reload the page, just inject the new PDF src
            this.PDFViewerApplication.open(this.innerSrc);
        }
    };
    /**
     * This function gets called when initializing the viewer. This should only be called once, but
     * can be called again if necessary.
     * @return {?}
     */
    PdfJsViewerComponent.prototype.loadPdfInitial = /**
     * This function gets called when initializing the viewer. This should only be called once, but
     * can be called again if necessary.
     * @return {?}
     */
    function () {
        // console.log(`Tab is - ${this.viewerTab}`);
        // if (this.viewerTab) {
        //   console.log(`Status of window - ${this.viewerTab.closed}`);
        // }
        if (this.externalWindow && (typeof this.viewerTab === 'undefined' || this.viewerTab.closed)) {
            this.viewerTab = window.open('', '_blank');
            if (this.viewerTab == null) {
                console.log("ng2-pdfjs-viewer: For 'externalWindow = true'. i.e opening in new tab, to work, pop-ups should be enabled.");
                return;
            }
            if (this.showSpinner) {
                this.viewerTab.document.write("\n          <style>\n          .loader {\n            position: fixed;\n            left: 40%;\n            top: 40%;\n            border: 16px solid #f3f3f3;\n            border-radius: 50%;\n            border-top: 16px solid #3498db;\n            width: 120px;\n            height: 120px;\n            animation: spin 2s linear infinite;\n          }\n          @keyframes spin {\n            0% {\n              transform: rotate(0deg);\n            }\n            100% {\n              transform: rotate(360deg);\n            }\n          }\n          </style>\n          <div class=\"loader\"></div>\n        ");
            }
        }
        var /** @type {?} */ fileUrl;
        //if (typeof this.src === "string") {
        //  fileUrl = this.src;
        //}
        if (this.innerSrc instanceof Blob) {
            fileUrl = encodeURIComponent(URL.createObjectURL(this.innerSrc));
        }
        else if (this.innerSrc instanceof Uint8Array) {
            var /** @type {?} */ blob = new Blob([this.innerSrc], { type: "application/pdf" });
            fileUrl = encodeURIComponent(URL.createObjectURL(blob));
        }
        else {
            fileUrl = this.innerSrc;
        }
        var /** @type {?} */ viewerUrl;
        if (this.pdfJsFolder) {
            viewerUrl = this.pdfJsFolder + "/web/viewer.html";
        }
        else {
            viewerUrl = "assets/pdfjs/web/viewer.html";
        }
        //console.log("__dirname" + __dirname);
        //console.log("__dirname" + path.join(__dirname, 'my/public'));
        //var viewerUrl = __dirname + "/pdfjs/web/viewer.html";
        viewerUrl += "?file=" + fileUrl;
        if (this.downloadFileName) {
            viewerUrl += "&fileName=" + this.downloadFileName + ".pdf";
        }
        if (typeof this.openFile !== 'undefined') {
            viewerUrl += "&openFile=" + this.openFile;
        }
        if (typeof this.download !== 'undefined') {
            viewerUrl += "&download=" + this.download;
        }
        if (typeof this.viewBookmark !== 'undefined') {
            viewerUrl += "&viewBookmark=" + this.viewBookmark;
        }
        // Only append the hashtag option if the defaultZoom was set > 0
        if (this.defaultZoom > 0) {
            viewerUrl += "#zoom=" + this.defaultZoom;
        }
        if (this.externalWindow) {
            this.viewerTab.location.href = viewerUrl;
        }
        else {
            // this.iframe.nativeElement.src = viewerUrl;
            console.log(this.iframe.nativeElement.contentWindow.PDF);
        }
    };
    PdfJsViewerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ng2-pdfjs-viewer',
                    template: "<iframe [hidden]=\"externalWindow || (!externalWindow && !pdfSrc)\" #iframe width=\"100%\" height=\"100%\"></iframe>"
                },] },
    ];
    /** @nocollapse */
    PdfJsViewerComponent.propDecorators = {
        "iframe": [{ type: core.ViewChild, args: ['iframe',] },],
        "pdfJsFolder": [{ type: core.Input },],
        "externalWindow": [{ type: core.Input },],
        "showSpinner": [{ type: core.Input },],
        "downloadFileName": [{ type: core.Input },],
        "openFile": [{ type: core.Input },],
        "download": [{ type: core.Input },],
        "viewBookmark": [{ type: core.Input },],
        "defaultZoom": [{ type: core.Input },],
        "pdfSrc": [{ type: core.Input },],
    };
    return PdfJsViewerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PdfJsViewerModule = /** @class */ (function () {
    function PdfJsViewerModule() {
    }
    /**
     * @return {?}
     */
    PdfJsViewerModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: PdfJsViewerModule
        };
    };
    PdfJsViewerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    declarations: [
                        PdfJsViewerComponent
                    ],
                    exports: [
                        PdfJsViewerComponent
                    ]
                },] },
    ];
    return PdfJsViewerModule;
}());

exports.PdfJsViewerModule = PdfJsViewerModule;
exports.PdfJsViewerComponent = PdfJsViewerComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
