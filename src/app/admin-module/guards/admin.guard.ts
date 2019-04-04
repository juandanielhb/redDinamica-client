import { Injectable } from '@angular/core';
import { Router, CanActivate, Route} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AdminGuard implements CanActivate{
    
    constructor(
           private _router: Router,
           private _userService: UserService

    ){}

    canActivate(){        
        let identity = this._userService.getIdentity();

        if(identity && (identity.role == 'admin' || identity.role == 'delegated_admin')){
            return true;
        }else{
            this._router.navigate(['/inicio']);
            return false;
        }

    }
}