import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { PluginData } from '../../../lib/plugin/plugin';

@Component({
    selector: 'helloworldday',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './helloworldday.html'
})
export class HelloworlddayPluginComponent {
    private date;
    constructor() {
        this.date = new Date();
        console.log('Hello world day loaded');
    }
}
