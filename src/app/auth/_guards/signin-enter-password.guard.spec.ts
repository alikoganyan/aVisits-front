import { TestBed, async, inject } from '@angular/core/testing';

import { SigninEnterPasswordGuard } from './signin-enter-password.guard';

describe('SigninEnterPasswordGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SigninEnterPasswordGuard]
    });
  });

  it('should ...', inject([SigninEnterPasswordGuard], (guard: SigninEnterPasswordGuard) => {
    expect(guard).toBeTruthy();
  }));
});
