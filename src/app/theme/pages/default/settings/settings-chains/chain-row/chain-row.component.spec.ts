import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainRowComponent } from './chain-row.component';

describe('ChainRowComponent', () => {
  let component: ChainRowComponent;
  let fixture: ComponentFixture<ChainRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
