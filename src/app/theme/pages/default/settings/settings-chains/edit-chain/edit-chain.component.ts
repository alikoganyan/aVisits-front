import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    chain: Chain = new Chain();
    //TODO: show toaster
    saveSuccessful: boolean = false;
    errors: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private chainService: ChainService) {
        route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {
        this.chainService
            .getChainById(this.id)
            .subscribe(chain => this.chain = chain);
    }

    onSaveChain(chain: any): void {
        this.chainService
            .updateChain(chain)
            .subscribe(
            data => this.saveSuccessful = true,
            error => this.errors = error
            )

    }

    onDeleteChain(chain): void {
        this.chainService
            .deleteChain(chain)
            .subscribe(
            data => this.router.navigate(['/settings/chains'])
            );
    }

}
