import { TestBed, inject } from '@angular/core/testing';

import { SalonServiceService } from './salon-service.service';

describe('SalonServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalonServiceService]
    });
  });

  it('should be created', inject([SalonServiceService], (service: SalonServiceService) => {
    expect(service).toBeTruthy();
  }));
});
