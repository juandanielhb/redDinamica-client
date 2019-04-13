import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Publication } from '../models/publication.model';

@Injectable()
export class PublicationService {
    public url:string;
    public identity;


    constructor(
        private _http:HttpClient
    ){
        this.url = GLOBAL.url;
    }

    addPost(token, publication):Observable<any>{
        let params = JSON.stringify(publication);
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.post(this.url+'publication', params, {headers:headers});
    }

    removePost(token, publicationId):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.delete(this.url+'publication/' + publicationId, {headers:headers});
    }

    getPublications(token, page = 1):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.get(this.url+'publications/' + page, {headers:headers});
    }

    getUserPublications(token, userId, page = 1):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.get(this.url+'user-publications/' + userId + '/' + page , {headers:headers});
    }

    updatePublicationComments(token, publicationId, comment):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.put(this.url + 'publication-comment/' + publicationId, comment,{headers:headers});
    }

}