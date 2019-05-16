import { Component, OnInit } from '@angular/core';
import { HOME_MENU } from './services/homeMenu';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Options } from 'selenium-webdriver/opera';

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
        private _userService: UserService
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

    getMenuOptions() {
        if (this.identity.actived) {
            return this.menuOptions;
        } else {
            let menu = this.menuOptions.filter(option => {
                return option.id == 'start' || option.id == 'user';
            })

            return menu;
        }


    }

    getSubOptions(option) {
        let subOptions = option.subOptions;

        if (option.id == 'lesson') {
            if (['expert', 'admin', 'delegated_admin'].includes(this.identity.role) || this.identity.canAdvise) {
                return subOptions;
            } else {

                if (this.identity.role == 'guest') {
                    subOptions = option.subOptions.filter(option => {
                        return option.text == 'Todas las lecciones';
                    });
                    return subOptions;
                } else {
                    subOptions = option.subOptions.filter(option => {
                        return option.text != 'Asesorar lecciones';
                    });
                    return subOptions;
                }

            }
        }

    }
}



