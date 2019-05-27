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
        let token = this._userService.getToken();

        if(identity && (identity.role == 'admin' || identity.role == 'delegated_admin')){
            return true;
        }else{
            if(token){
                this._router.navigate(['/inicio']);
                return false;
            }else{                
                this._router.navigate(['/landing']);
                return false;
            }
            
        }

    }
}