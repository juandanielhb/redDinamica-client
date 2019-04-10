import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { GLOBAL } from './services/global';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public title = 'RedDinámica';
    public url = GLOBAL.url;
    public identity;    
    public token;    

    public unviewMessages;

    constructor(
        private _userService: UserService,        
        private _router: Router
    ){}

    ngOnInit(): void {
        this.token = this._userService.getToken();
                      
    }
    
    ngDoCheck(): void {        
        // this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.unviewMessages = localStorage.getItem('unviewedMessages');
    }



    logout(){
        localStorage.clear();
        this._router.navigate(['']);
    }
}
