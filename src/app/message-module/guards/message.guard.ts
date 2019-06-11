import { Injectable } from '@angular/core';
import { Router, CanActivate, Route} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class MessageGuard implements CanActivate{
    
    constructor(
           private _router: Router,
           private _userService: UserService

    ){}


    canActivate(){        
        let identity = this._userService.getIdentity();
        let token = this._userService.getToken();

        if(identity && token){
            return true;
        }else{
            this._router.navigate(['/']);
            return false;
        }
    }
}