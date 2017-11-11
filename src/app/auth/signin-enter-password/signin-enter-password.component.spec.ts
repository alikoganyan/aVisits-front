import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninEnterPasswordComponent } from './signin-enter-password.component';

describe('SigninEnterPasswordComponent', () => {
    let component: SigninEnterPasswordComponent;
    let fixture: ComponentFixture<SigninEnterPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SigninEnterPasswordComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SigninEnterPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
