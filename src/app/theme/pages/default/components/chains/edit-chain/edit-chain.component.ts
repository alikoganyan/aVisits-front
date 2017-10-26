import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {ChainService} from "../../../../../_services/chain-service";
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";

@Component({
    selector: 'app-edit-chain',
    templateUrl: './edit-chain.component.html',
    styleUrls: ['./edit-chain.component.css']
})
export class EditChainComponent implements OnInit, AfterViewInit {
    @ViewChild('phone_number') private phone_number: ElementRef;
    @ViewChild('f') signupForm: NgForm;
    paramsSubscription: Subscription;
    chainId: number;
    ph: any;
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    deleteButtonShow = true;
    // chain: any;
    chain: any = {
        title: '',
        price: {level: ''},
        description: '',
        phone_number: '',
        levels: []
    };

    constructor(private chainService: ChainService,
                private route: ActivatedRoute,
                private router: Router,
                private _script: ScriptLoaderService) {
    }


    addPriceLevel() {
        this.chain.levels.push({
            level: ''
        });
        console.log(this.chain.levels)
    }

    removePriceLevel(index: number) {
        this.chain.levels.splice(index, 1)
    }

    getChain() {
        this.chainService.getChain(this.chainId)
            .subscribe(
                (response) => {
                    console.log(response.data.chain);
                    this.chain = response.data.chain;
                    this.chain.price = response.data.chain.levels[response.data.chain.levels.length - 1];
                    this.chain.levels.splice(-1, 1);
                    this.ph = response.data.chain.phone_number;
                    parseInt(this.ph.slice(1, 2) + this.ph.slice(4, 7) + this.ph.slice(9, 12) + this.ph.slice(13, 15) + this.ph.slice(16, 17));
                    this.phone_number.nativeElement.value = this.ph
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
        console.log(this.currentUser.chain.id);
        if(this.currentUser.chain.id == this.chainId) {
            this.deleteButtonShow = false;
        }
    }

    goToAllChains() {
        this.router.navigate(['/components/chains'], {relativeTo: this.route})
    }


    onSubmit() {
        let n = -1;
        // console.log(this.signupForm.value.price);
        this.chain.price.level = this.signupForm.value.price;
        this.chain.title = this.signupForm.value.title;
        this.chain.description = this.signupForm.value.description;
        this.chain.phone_number = this.phone_number.nativeElement.value;
        for (let i in this.signupForm.value.levels) {
            n++;
            this.chain.levels[n].level = this.signupForm.value.levels['price' + n];
            // console.log(this.signupForm.value.levels['price' + n]);
            // console.log(this.chain.levels[n].level);
        }
        this.chain.levels.push(this.chain.price);
        this.chainService.editChain(this.chain)
            .subscribe(
                (response) => {
                    console.log(response);
                    if (response.data.status == "OK") {
                        this.router.navigate(['/components/chains'], {relativeTo: this.route});
                    }
                }
            );
    }

    deleteChain() {
        this.chainService.deleteChain(this.chain.id)
            .subscribe(
                (response) => {
                    console.log(response);
                    if (response.success == 1) {
                        this.router.navigate(['/components/chains'], {relativeTo: this.route});
                    }
                }
            );
    }

    ngAfterViewInit() {
        this._script.load(
            'app-edit-chain',
            'assets/demo/default/custom/components/forms/widgets/input-mask-create-chain.js');
    }

}
