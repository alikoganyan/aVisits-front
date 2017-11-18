import { TestBed, async, inject } from '@angular/core/testing';

import { SigninForgotPasswordGuard } from './signin-forgot-password.guard';

describe('SigninForgotPasswordGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SigninForgotPasswordGuard]
    });
  });

  it('should ...', inject([SigninForgotPasswordGuard], (guard: SigninForgotPasswordGuard) => {
    expect(guard).toBeTruthy();
  }));
});
