import { TestBed, async, inject } from '@angular/core/testing';

import { SigninSelectChainGuard } from './signin-select-chain.guard';

describe('SigninSelectChainGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SigninSelectChainGuard]
    });
  });

  it('should ...', inject([SigninSelectChainGuard], (guard: SigninSelectChainGuard) => {
    expect(guard).toBeTruthy();
  }));
});
