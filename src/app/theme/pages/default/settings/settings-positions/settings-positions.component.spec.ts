import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPositionsComponent } from './settings-positions.component';

describe('SettingsPositionsComponent', () => {
  let component: SettingsPositionsComponent;
  let fixture: ComponentFixture<SettingsPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
