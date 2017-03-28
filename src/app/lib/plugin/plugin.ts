export function PluginConfig(config) {
    return (type) => {
    type._pluginConfig = config;
    };
}

export class PluginPlacement {
    private slot;
    private component;
    private priority;

    constructor(options) {
        this.slot = options.slot;
        this.priority = options.priority;
        this.component = options.component;
    }
}

export class PluginData {
    private placement;
    private plugin;
    constructor(plugin, placement) {
        this.plugin = plugin;
        this.placement = placement;
    }
}