import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs/Rx";

@Injectable()
export class PluginService {
    constructor() {
        this.plugins = [];

        // Tracking change of plugin list
        this.change = new ReplaySubject(1);
        this.loadPlugins();
    }

    loadPlugins() {
        System.import('/plugins.js').then((pluginsModule) => {
            pluginsModule.default.forEach( (pluginUrl) =>
                this.loadPlugin(pluginUrl)
            );
        });
    }

    loadPlugin(url) {
        return System.import(url).then((pluginModule) => {
            const Plugin = pluginModule.default;
            const pluginData = {
                url,
                type: Plugin,
                // Reading the meta data previously stored by the @Plugin
                // decorator
                config: Plugin._pluginConfig,
                // Creates the plugin instance
                instance: new Plugin()
            };
            this.plugins = this.plugins.concat([pluginData]);
            this.change.next(this.plugins);
        });
    }


}