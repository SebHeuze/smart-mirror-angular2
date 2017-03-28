import { HelloworlddayPluginComponent } from '/helloworldday/HelloworlddayPluginComponent';
import { PluginConfig, PluginPlacement } from '../../lib/plugin/plugin';

@PluginConfig({
    name: 'helloworld',
    description: 'Hello World plugin',
    placements: [
        new PluginPlacement({slot: 'helloworldday', priority: 1,
        component: HelloworlddayPluginComponent})
    ]
})
export default class HelloWorldPlugin {
    private name;
    constructor() {
        this.name = 'Test Name';
    }
}
