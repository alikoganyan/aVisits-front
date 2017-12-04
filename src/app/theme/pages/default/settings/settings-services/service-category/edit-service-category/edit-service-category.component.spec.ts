import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceCategoryComponent } from './edit-service-category.component';

describe('EditServiceCategoryComponent', () => {
  let component: EditServiceCategoryComponent;
  let fixture: ComponentFixture<EditServiceCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditServiceCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
