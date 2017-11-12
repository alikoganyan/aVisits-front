import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonRowComponent } from './salon-row.component';

describe('SalonRowComponent', () => {
  let component: SalonRowComponent;
  let fixture: ComponentFixture<SalonRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
