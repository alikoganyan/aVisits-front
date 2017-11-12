import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninResetPasswordComponent } from './signin-reset-password.component';

describe('SigninResetPasswordComponent', () => {
    let component: SigninResetPasswordComponent;
    let fixture: ComponentFixture<SigninResetPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SigninResetPasswordComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SigninResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
