import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
import {UserService} from "../_services/user.service";

@Component({
    templateUrl: './signin-select-chain.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SigninSelectChainComponent implements OnInit {
    userChains: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthenticationService,
        private userService: UserService
            ) {

        this.userChains = this.userService.currentUser.getValue().chains;
    }

    selectUserChain(chainId: string) {
        this.authService.authenticationSelectChain(chainId);
        this.router.navigate(['../password'], { relativeTo: this.route })
    }


    ngOnInit() {
        $('.m-login--choose-chain').animateClass('flipInX animated');
    }

}
