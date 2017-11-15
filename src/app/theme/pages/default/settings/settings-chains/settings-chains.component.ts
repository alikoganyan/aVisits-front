import {
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { Chain } from "../../../../../chain/chain.model";
import { ChainService } from "../../../../../chain/chain.service";
import { ActivatedRoute, Router } from "@angular/router";
import {CreateChainComponent} from "./create-chain/create-chain.component";
import {EditChainComponent} from "./edit-chain/edit-chain.component";

@Component({
    selector: 'app-settings-chains',
    templateUrl: './settings-chains.component.html',
    styleUrls: ['./settings-chains.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsChainsComponent implements OnInit {
    chains: Chain[];
    editFormData: any;

    //TODO: research directive, component & service for modal dialog

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

    openModalForm(form: any, inputs?: any): void {
        this.editFormData = {
            component: form,
            inputs: inputs || {}
        };
    }

    redirectToCreateChain(): void {
        this.openModalForm(CreateChainComponent);
    }

    openEditForm(chain: Chain): void {
        this.openModalForm(EditChainComponent, {
            chain: chain
        });
    }

}
