import { TestBed, inject } from '@angular/core/testing';

import { EmployeePositionService } from './position.service';

describe('EmployeePositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeePositionService]
    });
  });

  it('should be created', inject([EmployeePositionService], (service: EmployeePositionService) => {
    expect(service).toBeTruthy();
  }));
});
