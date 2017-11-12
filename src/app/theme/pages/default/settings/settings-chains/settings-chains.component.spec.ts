import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsChainsComponent } from './settings-chains.component';

describe('SettingsChainsComponent', () => {
  let component: SettingsChainsComponent;
  let fixture: ComponentFixture<SettingsChainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsChainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsChainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
