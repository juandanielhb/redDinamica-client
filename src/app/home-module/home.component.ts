import { Component, OnInit } from '@angular/core';
import { HOME_MENU } from './services/homeMenu';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public title: string;    
    public menuOptions = HOME_MENU;    
    public identity;
    public url;

    constructor(
        private _userService:UserService
    ) {
        this.title = 'Home';
        this.identity = this._userService.getIdentity();
        this.url = GLOBAL.url;
    }

    ngOnInit(): void {
        
    }

    ngDoCheck(): void {
        this.identity = this._userService.getIdentity();
    }
}
