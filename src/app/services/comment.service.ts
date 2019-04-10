import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentService {
    public url:string;
    public identity;
    public token;
    

    constructor(
        private _http:HttpClient
    ){
        this.url = GLOBAL.url;
    }

    addComment(token, comment):Observable<any>{
        let params = JSON.stringify(comment);
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.post(this.url + 'comment', params, {headers:headers});
    }

    updateComment(token, commentId):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.put(this.url+'comment/' + commentId, {headers:headers});
    }
   
    removeComment(token, commentId):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.delete(this.url+'comment/' + commentId, {headers:headers});
    }
}