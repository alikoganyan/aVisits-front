import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonServiceEditFormComponent } from './salon-service-edit-form.component';

describe('SalonServiceEditFormComponent', () => {
  let component: SalonServiceEditFormComponent;
  let fixture: ComponentFixture<SalonServiceEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonServiceEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonServiceEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
