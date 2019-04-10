import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { MESSAGE_MENU } from './services/messageData';
import { GLOBAL } from '../services/global';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../models/user.model';
import { FollowService } from '../services/follow.service';
import { Follow } from '../models/follow.model';

@Component({
    selector: 'message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
    public title: string = 'Mensajes';
    public url: string;
    public token;
    
    public categories;
    public menuOptions;   

    public identity: any;

    



    constructor(
        private _userService: UserService,        
        private _router: Router,
        private _route: ActivatedRoute,
          
    ) {
        this.url = GLOBAL.url;
        this.token = _userService.getToken();
        this.identity = _userService.getIdentity();

        this.menuOptions = MESSAGE_MENU;

        
    }


    ngOnInit(): void {
        

    }

    
}



