import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonScheduleDayComponent } from './salon-schedule-day.component';

describe('SalonScheduleDayComponent', () => {
  let component: SalonScheduleDayComponent;
  let fixture: ComponentFixture<SalonScheduleDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonScheduleDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonScheduleDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
