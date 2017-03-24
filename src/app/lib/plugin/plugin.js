export function PluginConfig(config) {
    return (type) => {
    type._pluginConfig = config;
    };
}

export class PluginPlacement {
    constructor(options) {
        this.slot = options.slot;
        this.priority = options.priority;
        this.component = options.component;
    }
}

export class PluginData {
    constructor(plugin, placement) {
        this.plugin = plugin;
        this.placement = placement;
    }
}