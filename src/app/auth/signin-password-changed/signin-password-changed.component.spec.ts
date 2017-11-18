import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninPasswordChangedComponent } from './signin-password-changed.component';

describe('SigninPasswordChangedComponent', () => {
  let component: SigninPasswordChangedComponent;
  let fixture: ComponentFixture<SigninPasswordChangedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninPasswordChangedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninPasswordChangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
