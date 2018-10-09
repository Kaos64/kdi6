import { Component, OnInit, Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';


@Component({
    selector: 'selector-name',
    template: `<mat-progress-spinner mode="indeterminate"></mat-progress-spinner>`
})

export class KdiLoadingOverlayComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}


@Injectable({
    providedIn: 'root'
  })
export class KdiLoadingOverlayService {

    constructor(private overlay: Overlay) { }

    open(): KdiOverlayRemote {
        const overlayRef = this.overlay.create(this.getOverlayConfig());

        const kdiLoadingOverlay = new ComponentPortal(KdiLoadingOverlayComponent);
        overlayRef.attach(kdiLoadingOverlay);
        return new KdiOverlayRemote(overlayRef);
    }


    private getOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }
}

export class KdiOverlayRemote {
    constructor(private overlayRef:OverlayRef){}
    close():void{
        this.overlayRef.dispose();
    }
}