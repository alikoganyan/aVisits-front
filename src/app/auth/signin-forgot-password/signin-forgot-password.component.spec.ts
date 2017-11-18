import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninForgotPasswordComponent } from './signin-forgot-password.component';

describe('SigninForgotPasswordComponent', () => {
  let component: SigninForgotPasswordComponent;
  let fixture: ComponentFixture<SigninForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
