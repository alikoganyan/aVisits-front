import {
    Component, ComponentFactoryResolver, Input, OnInit, ReflectiveInjector, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'app-dynamic-component',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DynamicComponent implements OnInit {
    @ViewChild('componentContainer', {read: ViewContainerRef}) componentContainer: ViewContainerRef;
    currentComponent = null;

    @Input() set dialogData(data: { component: any, inputs: any }) {
        if (!data) return;

        data.inputs = data.inputs || {};

        // Inputs need to be in the following format to be resolved properly
        let inputProviders = Object.keys(data.inputs).map((inputName) => {
            return {provide: inputName, useValue: data.inputs[inputName]};
        });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        // We create an injector out of the data we want to pass down and this components injector
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.componentContainer.parentInjector);

        // We create a factory out of the component we want to create
        let factory = this.resolver.resolveComponentFactory(data.component);

        // We create the component using the factory and the injector
        let component = factory.create(injector);

        // We insert the component into the dom container
        this.componentContainer.insert(component.hostView);

        // We can destroy the old component is we like by calling destroy
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }

        this.currentComponent = component;
    }


    constructor(private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
    }

}
