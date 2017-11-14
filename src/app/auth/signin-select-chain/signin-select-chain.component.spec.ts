import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninSelectChainComponent } from './signin-select-chain.component';

xdescribe('SigninSelectChainComponent', () => {
    let component: SigninSelectChainComponent;
    let fixture: ComponentFixture<SigninSelectChainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SigninSelectChainComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SigninSelectChainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
