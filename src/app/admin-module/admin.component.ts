import { Component, OnInit } from '@angular/core';
import { ADMIN_MENU } from './services/adminMenu';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    public title: String = 'Administración';
    public menuOptions;

    constructor() {
        this.menuOptions = ADMIN_MENU;
    }


}



