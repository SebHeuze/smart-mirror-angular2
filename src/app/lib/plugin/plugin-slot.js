import {
    Directive,
    Input,
    Inject,
    provide,
    ViewContainerRef,
    ComponentResolver,
    ReflectiveInjector
} from '@angular/core';
import { PluginData } from './plugin';
import { PluginService } from './plugin-service';

@Directive({
    selector: 'ngc-plugin-slot'
})
export class PluginSlot {
    @Input() name;

    constructor(@Inject(ViewContainerRef) viewContainerRef,
        @Inject(ComponentResolver) componentResolver,
        @Inject(PluginService) pluginService) {
        this.viewContainerRef = viewContainerRef;
        this.componentResolver = componentResolver;
        this.pluginService = pluginService;
        this.componentRefs = [];
        // Subscribing to changes on the plugin service and re-
        // initialize slot if needed
        this.pluginChangeSubscription =
            this.pluginService
            .change.subscribe(() => this.initialize());
    }
}