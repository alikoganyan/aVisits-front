import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {ChainService} from "../../../../../_services/chain-service";

@Component({
    selector: 'app-edit-chain',
    templateUrl: './edit-chain.component.html',
    styleUrls: ['./edit-chain.component.css']
})
export class EditChainComponent implements OnInit {
    @ViewChild('phone_number') private phone_number: ElementRef;
    @ViewChild('f') signupForm: NgForm;
    paramsSubscription: Subscription;
    chainId: number;
    chain: any;

    constructor(private chainService: ChainService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    getChain() {
        this.chainService.getChain(this.chainId)
            .subscribe(
                (response) => {
                    console.log(response.data.chain);
                    this.chain = response.data.chain;
                }
            )
    }

    ngOnInit() {
        this.paramsSubscription = this.route.params
            .subscribe(
                (params: Params) => {
                    this.chainId = +params['id']
                }
            );
        this.getChain();
    }

    goToAllChains() {
        this.router.navigate(['/components/chains'], {relativeTo: this.route})
    }


    onSubmit() {
        console.log(this.signupForm.value)
    }

}
