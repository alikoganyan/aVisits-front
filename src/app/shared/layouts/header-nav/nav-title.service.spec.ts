import { TestBed, inject } from '@angular/core/testing';

import { NavTitleService } from './nav-title.service';

describe('NavTitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavTitleService]
    });
  });

  it('should be created', inject([NavTitleService], (service: NavTitleService) => {
    expect(service).toBeTruthy();
  }));
});
