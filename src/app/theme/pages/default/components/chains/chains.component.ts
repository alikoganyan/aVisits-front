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
        this.router.navigate(['/components/create-chain'], {relativeTo: this.route});
    }

    getSelectedChain(chain) {
        this.router.navigate(['/components/edit-chain/' + chain.id], {relativeTo: this.route});
    }

    ngOnInit() {
        this.getChains();
    }

    getChains() {
        this.chainService.getChains()
            .subscribe(
                (response) => {
                    this.chains = response.data;
                    console.log(response.data);
                }
            )
    }

}
