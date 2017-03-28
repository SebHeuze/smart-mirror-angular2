import {
    Directive,
    Input,
    Inject,
    ViewContainerRef,
    ComponentFactoryResolver,
    ReflectiveInjector
} from '@angular/core';
import { PluginData } from './plugin';
import { PluginService } from './plugin.service';

@Directive({
    selector: 'ngc-plugin-slot'
})
export class PluginSlotDirective {
    @Input() private name;
    private pluginService;
    private viewContainerRef;
    private componentRefs;
    private pluginChangeSubscription;
    private componentFactoryResolver;

    constructor(@Inject(ViewContainerRef) viewContainerRef,
                @Inject(ComponentFactoryResolver) componentFactoryResolver,
                @Inject(PluginService) pluginService) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.pluginService = pluginService;
        this.componentRefs = [];
        // Subscribing to changes on the plugin service and re-
        // initialize slot if needed
        this.pluginChangeSubscription =
            this.pluginService
            .change.subscribe(() => this.initialize());
    }

    private initialize() {
        if (this.componentRefs.length > 0) {
            this.componentRefs.forEach(
                (componentRef) => componentRef.destroy()
            );
            this.componentRefs = [];
        }
        const pluginData = this.pluginService.getPluginData(this.name);
        pluginData.sort(
        (a, b) => a.placement.priority < b.placement.priority ?
            1 : a.placement.priority > b.placement.priority ? -1 : 0);
        return Promise.all(
            pluginData.map((subPluginData) =>
            this.instantiatePluginComponent(subPluginData))
        );
    }

    private instantiatePluginComponent(pluginData) {
        return this.componentFactoryResolver
            .resolveComponent(pluginData.placement.component)
            .then((componentFactory) => {
                // Get the injector of the plugin slot parent component
                const contextInjector = this.viewContainerRef.parentInjector;
                // Preparing additional PluginData provider for the created
                // plugin component
                const providers = [
                    { provide: PluginData, useValue: pluginData}
                ];
                // We're creating a new child injector and provide the
                // PluginData provider
                const childInjector = ReflectiveInjector
                .resolveAndCreate(providers, contextInjector);
                // Now we can create a new component using the plugin slot view
                // container and the resolved component factory
                const componentRef = this.viewContainerRef
                    .createComponent(componentFactory, this.viewContainerRef.length, childInjector);
                this.componentRefs.push(componentRef);
            });
    }
}
