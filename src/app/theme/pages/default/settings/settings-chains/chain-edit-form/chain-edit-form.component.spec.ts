import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainEditFormComponent } from './chain-edit-form.component';

describe('ChainEditFormComponent', () => {
    let component: ChainEditFormComponent;
    let fixture: ComponentFixture<ChainEditFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChainEditFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChainEditFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
