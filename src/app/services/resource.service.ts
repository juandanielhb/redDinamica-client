import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Resource } from '../models/resource.model';
import { tokenKey } from '@angular/core/src/view';

@Injectable()
export class ResourceService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }


    addResource(token, resource: Resource): Observable<any> {
        let params = JSON.stringify(resource);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'resource', params, { headers: headers });
    }

    getResources(token, page = 1, visibleOnes = false): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(`${this.url}resources/${visibleOnes}/${page}`, { headers: headers });

    }

    getAllResources(token, orderBy = '', visibleOnes = false): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });        

        return this._http.get(`${this.url}all-resources/${visibleOnes}/${orderBy}`, { headers: headers });
    }

    editResource(token, resource:Resource):Observable<any>{        
        let params = JSON.stringify(resource);        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.put(this.url+'resource/' + resource._id, params, {headers:headers});
    } 

    deleteResource(token, resourceId):Observable<any>{        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.delete(this.url + 'resource/' + resourceId, {headers:headers});
    }
}