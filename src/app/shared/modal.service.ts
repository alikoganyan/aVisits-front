import { Injectable } from '@angular/core';
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class ModalService {

    constructor(private ngbModal: NgbModal) {
    }

    open(config: ModalConfig) {
        let modal = this.ngbModal.open(config.content, config.options);
        let instance = (modal as any)._windowCmptRef.instance;
        setImmediate(() => {
            instance.windowClass = 'custom-show'
        });

        let fx = (modal as any)._removeModalElements.bind(modal);
        (modal as any)._removeModalElements = () => {
            instance.windowClass = 'custom-hide';
            setTimeout(fx, 300)
        };

        return modal
    }

}

export class ModalConfig {
    constructor(public content: any,
                public options: any) { }
}