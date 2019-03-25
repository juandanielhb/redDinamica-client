import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public title = 'RedDinámica';
    public identity;    
    public token;    

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
    }

    logout(){
        localStorage.clear();
        this._router.navigate(['']);
    }
}
