import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chain } from "../../../../../chain/chain.model";
import { ChainService } from "../../../../../chain/chain.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-settings-chains',
    templateUrl: './settings-chains.component.html',
    styleUrls: ['./settings-chains.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsChainsComponent implements OnInit {
    chains: Chain[];

    constructor(
        private chainService: ChainService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.chainService
            .getChains()
            .subscribe(
            (res: any) => this.renderChains(res)
            );
    }

    renderChains(chains: any): void {
        this.chains = chains;
    }

    redirectToCreateChain(): void {
        this.router.navigate(['./create'], { relativeTo: this.route })
    }

}
