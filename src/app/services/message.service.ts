import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { UserService } from './user.service';

@Injectable()
export class MessageService {
    public url:string;
    public identity;
    public token;

    constructor(
        private _http: HttpClient,
        private _userService: UserService
    ){
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
    }

    addMessage(token, message):Observable<any>{
        let params = JSON.stringify(message);
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.post(this.url + 'message', params, {headers:headers});
    }

    getReceivedMessages(token, page = 1):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.get(this.url + 'my-messages/' + page, {headers:headers});
    }

    getEmittedMessages(token, page = 1):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.get(this.url + 'messages/' + page, {headers:headers});
    }

    removeMessage(token, messageId):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.delete(this.url + 'message/' + messageId, {headers:headers});
    }

    getUnviewMessages(token):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.get(this.url + 'unviewed-messages', {headers:headers});
    }

    setViewedMessage(token):Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        })};

        return this._http.put(this.url + 'setviewed_messages', null, httpOptions );
    }

}