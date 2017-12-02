import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionRowComponent } from './position-row.component';

describe('PositionRowComponent', () => {
  let component: PositionRowComponent;
  let fixture: ComponentFixture<PositionRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
