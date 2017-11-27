import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Credentials} from "../../_models/user";

@Component({
    selector: 'app-signin-form',
    templateUrl: './signin-form.component.html',
    styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {
    @Input() errorMessage: string | null;

    @Output() submitted = new EventEmitter<Credentials>();

    form: FormGroup = new FormGroup({
        login: new FormControl(''),
        remember: new FormControl('')
    });

    constructor() {
    }

    ngOnInit() {
    }

    onFormSubmit() {
        if (this.form.valid) {
            this.submitted.emit(this.form.value);
        }
    }

}
