import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonServiceComponent } from './edit-salon-service.component';

describe('EditSalonServiceComponent', () => {
  let component: EditSalonServiceComponent;
  let fixture: ComponentFixture<EditSalonServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalonServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalonServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
