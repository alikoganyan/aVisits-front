import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSalonsComponent } from './settings-salons.component';

describe('SettingsSalonsComponent', () => {
  let component: SettingsSalonsComponent;
  let fixture: ComponentFixture<SettingsSalonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsSalonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSalonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
