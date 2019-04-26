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
    public stats;

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

    registerByAdmin(user:User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.post(this.url+'registerbyAdmin', params, {headers:headers});
    }    

    signup(user:User, getToken = null):Observable<any>{
        if(getToken != null){
            user.getToken = true;
        }
        
        let params = JSON.stringify(user);
        let headers = new HttpHeaders({'Content-Type':'application/json'});

        return this._http.post(this.url+'login', params, {headers:headers});
    }

    updateUser(user:User):Observable<any>{

        let params = JSON.stringify(user);
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.put(this.url+'user-update/'+ user._id, params, {headers:headers});
    }

    validatePass(user):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.post(this.url + 'validate-password', params, {headers:headers});
    }

    changePass(user):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.post(this.url + 'change-password', params, {headers:headers});
    }

    recoverPass(user):Observable<any>{
        let params = JSON.stringify(user);

        let headers = new HttpHeaders({
            'Content-Type':'application/json'
        });

        return this._http.post(this.url + 'recover-password', params, {headers:headers});
    }

    getUsers(page = null):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.get(this.url + 'users/'+ page, {headers:headers});
    }

    
    getAllUsers():Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.get(this.url + 'all-users/', {headers:headers});
    }

    getNewUsers(page = null):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.get(this.url + 'new-users/'+ page, {headers:headers});
    }    

    deleteUser(userId = null):Observable<any>{        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        if(!userId){
            return this._http.delete(this.url + 'user', {headers:headers});

        }else{
            return this._http.delete(this.url + 'user/' + userId, {headers:headers});

        }
    }

    getUser(userId):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.get(this.url + 'user/' + userId, {headers:headers});
    }

    getStats(){
        let stats = JSON.parse(localStorage.getItem('stats'));

        if(stats != 'undefined'){
            this.stats = stats;            
        }else{
            this.stats = null;
        }

    }

    getCounters(userId = null):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        if(userId){
            return this._http.get(this.url + 'counters/' + userId, {headers:headers});
        }else{
            return this._http.get(this.url + 'counters', {headers:headers});
        }
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