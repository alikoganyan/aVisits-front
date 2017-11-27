import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninPasswordFormComponent } from './signin-password-form.component';

describe('SigninPasswordFormComponent', () => {
  let component: SigninPasswordFormComponent;
  let fixture: ComponentFixture<SigninPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninPasswordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
