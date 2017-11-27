import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
    @Input() error: string | null;

    @Output() submitted = new EventEmitter();

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            password: ['', Validators.required],
            password_confirmation: ['', Validators.required],
        }, { validator: this.checkPasswordsMatch('password', 'password_confirmation')})
    }

    ngOnInit() {
    }

    onFormSubmit() {
        if (this.form.valid) {
            this.submitted.emit(this.form.value);
        }
        else {
            console.log(this.form.errors)
        }
    }

    checkPasswordsMatch(passKey: string, confirmKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passKey],
                passwordConfirmationInput = group.controls[confirmKey];

            console.log(passwordInput.value, passwordConfirmationInput.value)

            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        }
    }

}
