import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup-complete',
    templateUrl: './signup-complete.component.html',
    styleUrls: ['./signup-complete.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SignupCompleteComponent implements OnInit {
    loading: boolean = false;

    constructor(private router: Router) {
    }

    ngOnInit() {
        $('.m-login__signup-complete').animateClass('flipInX animated');
    }

    completeSignup(): void {
        this.router.navigate(['/index']);
    }
}
