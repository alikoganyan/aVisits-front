import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChainComponent } from './create-chain.component';

describe('CreateChainComponent', () => {
    let component: CreateChainComponent;
    let fixture: ComponentFixture<CreateChainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateChainComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateChainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
