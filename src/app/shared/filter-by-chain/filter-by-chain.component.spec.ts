import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByChainComponent } from './filter-by-chain.component';

describe('FilterByChainComponent', () => {
  let component: FilterByChainComponent;
  let fixture: ComponentFixture<FilterByChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterByChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
