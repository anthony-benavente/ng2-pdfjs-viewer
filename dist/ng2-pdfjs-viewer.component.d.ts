import { ElementRef } from '@angular/core';
export declare class PdfJsViewerComponent {
    iframe: ElementRef;
    pdfJsFolder: string;
    externalWindow: boolean;
    showSpinner: boolean;
    downloadFileName: string;
    openFile: boolean;
    download: boolean;
    viewBookmark: boolean;
    defaultZoom: number;
    viewerTab: any;
    private innerSrc;
    readonly PDFViewerApplication: any;
    pdfSrc: string | Blob | Uint8Array;
    ngOnInit(): void;
    refresh(): void;
    refreshForce(): void;
    private loadPdf();
    /**
     * This function gets called when initializing the viewer. This should only be called once, but
     * can be called again if necessary.
     */
    private loadPdfInitial();
}
