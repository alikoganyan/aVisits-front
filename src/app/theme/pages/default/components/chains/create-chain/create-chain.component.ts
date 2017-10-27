import {Component, AfterViewInit, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";
import {NgForm} from "@angular/forms";
import {ChainService} from "../../../../../_services/chain-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-create-chain',
    templateUrl: './create-chain.component.html',
    styleUrls: ['./create-chain.component.css']
})
export class CreateChainComponent implements OnInit, AfterViewInit {
    @ViewChild('phone_number') private phone_number: ElementRef;
    @ViewChild('f') signupForm: NgForm;
    chain: any = {
        title: '',
        description: '',
        phone_number: '',
        levels: []
    };


    constructor(private _script: ScriptLoaderService,
                private chainService: ChainService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    addPriceLevel() {
        this.chain.levels.push({
            level: ''
        })
    }

    removePriceLevel(index: number) {
        this.chain.levels.splice(index, 1)
    }

    onSubmit() {
        this.chain.title = this.signupForm.value.title;
        this.chain.description = this.signupForm.value.description;
        this.chain.phone_number = this.phone_number.nativeElement.value;
        for (let i in this.chain.levels) {
            this.chain.levels[i].level = this.signupForm.value.levels['price' + i];
        }
        /*this.chain.levels.push({
            level: this.signupForm.value.price
        });*/
        // console.log(this.signupForm.value);
        // console.log(this.phone_number.nativeElement.value);
        console.log(this.chain);
        this.chainService.createChain(this.chain)
            .subscribe(
                (response) => {
                    console.log(response);
                    if (response.data.status == "OK") {
                        this.signupForm.reset();
                        this.router.navigate(['/components/chains'], {relativeTo: this.route})
                    }
                }
            )
    }

    goToAllChains() {
        this.router.navigate(['/components/chains'], {relativeTo: this.route})
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._script.load(
            'app-create-chain',
            'assets/demo/default/custom/components/forms/widgets/input-mask-create-chain.js');
    }

}
