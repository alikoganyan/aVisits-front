import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCategoryEditFormComponent } from './service-category-edit-form.component';

describe('ServiceCategoryEditFormComponent', () => {
  let component: ServiceCategoryEditFormComponent;
  let fixture: ComponentFixture<ServiceCategoryEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCategoryEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCategoryEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
