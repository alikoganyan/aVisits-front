import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDialogBaseComponent } from './position-dialog-base.component';

describe('PositionDialogBaseComponent', () => {
  let component: PositionDialogBaseComponent;
  let fixture: ComponentFixture<PositionDialogBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionDialogBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDialogBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
