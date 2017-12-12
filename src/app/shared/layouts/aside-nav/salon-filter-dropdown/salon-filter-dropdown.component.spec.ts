import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonFilterDropdownComponent } from './salon-filter-dropdown.component';

describe('SalonFilterDropdownComponent', () => {
  let component: SalonFilterDropdownComponent;
  let fixture: ComponentFixture<SalonFilterDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonFilterDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonFilterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
