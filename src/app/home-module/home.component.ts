import { Component, OnInit } from '@angular/core';
import { HOME_MENU } from './services/homeMenu';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public title: string;
    public menuOptions = HOME_MENU;    

    constructor() {
        this.title = 'Home';
    }

    ngOnInit(): void {
        
    }
}
