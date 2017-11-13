import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";

@Component({
    templateUrl: './signin-select-chain.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SigninSelectChainComponent implements OnInit {
    userChains: any;

    constructor(private router: Router,
        private route: ActivatedRoute,
        public authService: AuthenticationService, ) {

        this.userChains = this.authService.stepsData.user.chains;
    }

    selectUserChain(chainId: string) {
        this.authService.authenticationSelectChain(chainId);
        this.router.navigate(['../password'], { relativeTo: this.route })
    }


    ngOnInit() {
        let login = $('#m_login');
        (<any>login.find('.m-login--choose-chain')).animateClass('flipInX animated');
    }

}
