import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { PROFILE_MENU, LABEL_PROFILE } from './services/profileData';
import { GLOBAL } from '../services/global';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../models/user.model';
import { FollowService } from '../services/follow.service';
import { Follow } from '../models/follow.model';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public title: string = 'Perfil';
    public url: string;
    public token;
    
    public categories;
    public menuOptions;
    public ownProfile: User = new User();
    public status: string;
    public identity: any;

    public following;
    public follower;
    public counters;

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _followService: FollowService,   
    ) {
        this.url = GLOBAL.url;
        this.token = _userService.getToken();
        this.menuOptions = PROFILE_MENU;
        this.categories = LABEL_PROFILE;
        this.counters = { 
            following: 0, 
            followed: 0
        }
        this.loadPage();
    }


    ngOnInit(): void {
        this.loadPage();

    }

    ngDoCheck(): void {

        this._route.params.subscribe(params => {
            let id = params['id'];

            if (this.identity._id == id) {
                this.ownProfile = this._userService.getIdentity();
            }
        })
    }


    loadPage() {

        this.identity = this._userService.getIdentity();

        this._route.params.subscribe(params => {
            let id = params['id'];

            this.getUser(id);
        })
    }

    getUser(userId) {
        this._userService.getUser(userId).subscribe(
            response => {
                if (response.user) {
                    this.following = response.following;
                    this.follower = response.follower;
                    this.ownProfile = response.user;
                    this.getCounters(userId);

                } else {
                    this.status = 'error';
                    this.ownProfile = this.identity;
                    this._router.navigate(['/perfil/' + this.identity._id]);
                }

            },
            error => {
                console.log(<any>error);
                this.ownProfile = this.identity;
                this._router.navigate(['/perfil/' + this.identity._id]);
            }
        );
    }

    getCounters(userId){
        this._userService.getCounters(userId).subscribe(
            response => {
                if (response) {
                    this.counters = response;
                                       
                } else {
                    this.status = 'error';
                    this.ownProfile = this.identity;
                }

            },
            error => {
                console.log(<any>error);
                this.ownProfile = this.identity;
                this._router.navigate(['/perfil/' + this.identity._id]);
            }
        );
    }

    // Follower systems buttons
    public followUserOver;
    mouseEnter(userId) {
        this.followUserOver = userId;
    }


    mouseLeave() {
        this.followUserOver = 0;
    }

    followUser(userId) {
        let follow = new Follow();
        follow.user = this.identity._id;
        follow.followed = userId;

        this._followService.addFollow(this.token, follow).subscribe(
            response => {
                if(response){
                    this.following = response;

                    this.getCounters(userId);
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    unfollowUser(userId) {
        let index;

        this._followService.removeFollow(this.token, userId).subscribe(
            response => {
                
                if(response){
                    this.following = null;

                    this.getCounters(userId);
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }
}



