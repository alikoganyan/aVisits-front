import { TestBed, inject } from '@angular/core/testing';

import { ServiceCategoryService } from './service-category.service';

describe('ServiceCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceCategoryService]
    });
  });

  it('should be created', inject([ServiceCategoryService], (service: ServiceCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
