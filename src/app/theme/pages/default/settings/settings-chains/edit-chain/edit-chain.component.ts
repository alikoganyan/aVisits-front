import {Component, Injector, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ChainService } from "../../../../../../chain/chain.service";
import { Chain } from "../../../../../../chain/chain.model";

@Component({
    templateUrl: './edit-chain.component.html',
    styleUrls: ['./edit-chain.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EditChainComponent implements OnInit {
    id: string;
    /*@Input() */chain: Chain;
    //TODO: show toaster
    saveSuccessful: boolean = false;
    errors: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private chainService: ChainService,
        private injector: Injector) {

        this.chain = this.injector.get('chain');
    }

    ngOnInit() {
    }

    onSaveChain(chain: any): void {
        this.chainService
            .updateChain(chain)
            .subscribe(
            data => {
                this.saveSuccessful = true;
                this.hideDialog();
            },
            error => this.errors = error
            )

    }

    onDeleteChain(chain): void {
        this.chainService
            .deleteChain(chain)
            .subscribe(
                next => this.hideDialog()
            );
    }

    hideDialog() {
        (<any>$("#modalDialog")).modal('hide')
    }

}
