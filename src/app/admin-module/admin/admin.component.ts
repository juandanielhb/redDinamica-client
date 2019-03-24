import { Component, OnInit } from '@angular/core';
import { OPTIONS_ADMIN_MENU } from '../services/optionsAdminMenu';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    public title: String = 'Administración';
    public menuOptions;

    constructor() {
        this.menuOptions = OPTIONS_ADMIN_MENU;
    }


}



