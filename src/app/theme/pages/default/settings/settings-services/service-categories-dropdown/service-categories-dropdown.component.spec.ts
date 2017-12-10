import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCategoriesDropdownComponent } from './service-categories-dropdown.component';

describe('ServiceCategoriesDropdownComponent', () => {
  let component: ServiceCategoriesDropdownComponent;
  let fixture: ComponentFixture<ServiceCategoriesDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCategoriesDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCategoriesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
