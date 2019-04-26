import { Injectable } from '@angular/core';
import { Router, CanActivate, Route} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class LandingGuard implements CanActivate{
    
    constructor(
           private _router: Router,
           private _userService: UserService

    ){}

    canActivate(){        
        let identity = this._userService.getIdentity();
        let token = this._userService.getToken();

        if(identity && token){
            this._router.navigate(['/inicio']);
            return false;
        }else{
            return true;
        }

    }
}