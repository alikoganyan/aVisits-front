import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserChain} from "../../_models/user";

@Component({
    selector: 'app-signin-password-form',
    templateUrl: './signin-password-form.component.html',
    styleUrls: ['./signin-password-form.component.scss']
})
export class SigninPasswordFormComponent implements OnInit {
    @Input() selectedChain: UserChain;
    @Input() errorMessage: string | null;

    @Output() submitted = new EventEmitter<string>();

    form: FormGroup = new FormGroup({
        password: new FormControl('')
    });

    constructor() {
    }

    ngOnInit() {
    }

    onFormSubmit() {
        if(this.form.valid) {
            this.submitted.emit(this.form.value.password);
        }
    }
}
