import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { PROFILE_MENU, LABEL_PROFILE } from './services/profileData';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public title:string = 'Perfil';
    public url:string;
    public menuOptions;
    public ownProfile;

    constructor(
        private _userService: UserService
    ){
        this.url = GLOBAL.url;
        this.menuOptions = PROFILE_MENU;
    }

    ngOnInit(): void {
        this.ownProfile = this._userService.getIdentity();        
        this.ownProfile.role = LABEL_PROFILE[this.ownProfile.role];
    }

    ngDoCheck(): void {
        this.ownProfile = this._userService.getIdentity();
        this.ownProfile.role = LABEL_PROFILE[this.ownProfile.role];
    }

}



