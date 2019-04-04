import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { PROFILE_MENU, LABEL_PROFILE } from './services/profileData';
import { GLOBAL } from '../services/global';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../models/user.model';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public title:string = 'Perfil';
    public url:string;
    public categories;
    public menuOptions;
    public ownProfile:User = new User();
    public status: string;
    public identity: any;

    constructor(
        private _userService: UserService,
        private _router:Router,
        private _route: ActivatedRoute,
    ){
        this.url = GLOBAL.url;
        this.menuOptions = PROFILE_MENU;
        this.categories = LABEL_PROFILE;        
    }


    ngOnInit(): void {        
        this.loadPage();      
        
    }

    ngDoCheck(): void {
        
    }

    loadPage(){
        this.identity = this._userService.getIdentity();                

        this._route.params.subscribe(params => {
            let id = params['id'];
            
            this.getUser(id);
        })
    }

    getUser(userId){
        this._userService.getUser(userId).subscribe(
            response => {
                if(response.user){
                    this.ownProfile = response.user;
                }else{
                    this.status = 'error';      
                    this.ownProfile = this.identity;              
                    this._router.navigate(['/perfil/'+ this.identity._id]);
                }

            },
            error => {
                console.log(<any>error);  
                this.ownProfile = this.identity;              
                this._router.navigate(['/perfil/'+ this.identity._id]);
            }
        );
    }

}



