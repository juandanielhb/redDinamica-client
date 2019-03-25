import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    public url:string;
    public identity;
    public token;


    constructor(
        private _http:HttpClient
    ){
        this.url = GLOBAL.url;
    }

    register(user:User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders({'Content-Type':'application/json'});

        return this._http.post(this.url+'register', params, {headers:headers});
    }

    signup(user:User, getToken = null):Observable<any>{
        if(getToken != null){
            user.getToken = true;
        }
        
        let params = JSON.stringify(user);
        let headers = new HttpHeaders({'Content-Type':'application/json'});

        return this._http.post(this.url+'login', params, {headers:headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token){
            this.token = token;
        }else{
            this.token = null;            
        }

        return this.token;

    }



}