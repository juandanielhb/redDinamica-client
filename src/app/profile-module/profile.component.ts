import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { PROFILE_MENU, LABEL_PROFILE } from './services/profileData';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public title: String = 'Perfil';
    public menuOptions;
    public ownProfile;

    constructor(
        private _userService: UserService
    ){
        this.menuOptions = PROFILE_MENU;
    }

    ngOnInit(): void {
        this.ownProfile = this._userService.getIdentity();
        this.ownProfile.role = LABEL_PROFILE[this.ownProfile.role];
    }

}



