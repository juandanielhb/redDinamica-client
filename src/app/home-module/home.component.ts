import { Component, OnInit } from '@angular/core';
import { OPTIONS_HOME_MENU } from './services/optionsHomeMenu';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public title: string;
    public menuOptions = OPTIONS_HOME_MENU;    

    constructor() {
        this.title = 'Home';
    }

    ngOnInit(): void {
        
    }
}
