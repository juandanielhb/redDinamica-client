import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class ProfileGuard implements CanActivate{
    
    public id;

    constructor(
           private _router: Router,
           private _route: ActivatedRoute,
           private _userService: UserService

    ){}

    canActivate(){    
        
        let identity = this._userService.getIdentity();
        this.id = this._router.url.replace('/perfil/','');

        if(identity && this.id && (identity._id == this.id)){
            return true;
        }else{
            this._router.navigate(['/perfil', identity._id]);
            return false;
        }

    }
}