import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalonServiceComponent } from './create-salon-service.component';

describe('CreateSalonServiceComponent', () => {
  let component: CreateSalonServiceComponent;
  let fixture: ComponentFixture<CreateSalonServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSalonServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSalonServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
