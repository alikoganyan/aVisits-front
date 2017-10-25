import {Component, OnInit} from '@angular/core';
import {ChainService} from "../../../../_services/chain-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-chains',
    templateUrl: './chains.component.html',
    styleUrls: ['./chains.component.css']
})
export class ChainsComponent implements OnInit {

    chains: any;

    constructor(private chainService: ChainService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    redirectToCreateChain() {

        this.router.navigate(['/components/chains/create-chain'], {relativeTo: this.route})
    }

    getSelectedChain(chain) {
        this.router.navigate(['/components/chains/edit-chain/' + chain.id], {relativeTo: this.route});
        console.log(chain);
    }

    ngOnInit() {
        this.getChains();
    }

    getChains() {
        this.chainService.getChains()
            .subscribe(
                (response) => {
                    console.log(response.data);
                    this.chains = response.data;
                }
            )
    }

}
