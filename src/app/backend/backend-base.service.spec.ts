import { TestBed, inject } from '@angular/core/testing';

import { BackendBaseService } from './backend-base.service';

describe('BackendBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendBaseService]
    });
  });

  it('should be created', inject([BackendBaseService], (service: BackendBaseService) => {
    expect(service).toBeTruthy();
  }));
});
