import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SalonEditFormComponent } from './salon-edit-form.component';

describe('SalonEditFormComponent', () => {
  let component: SalonEditFormComponent;
  let fixture: ComponentFixture<SalonEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
