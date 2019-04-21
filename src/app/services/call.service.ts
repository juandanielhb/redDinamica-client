import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Call } from '../models/call.model';



@Injectable()
export class CallService {
    public url:string;
    public identity;
    public token;

    constructor(
        private _http:HttpClient
    ){
        this.url = GLOBAL.url;
    }

    // *************** call methods *********************************
    addCall(token, call:Call):Observable<any>{
        let params = JSON.stringify(call);
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': token           
        });   
        
        return this._http.post(this.url + 'call', params, {headers:headers});
    }
    
    getCalls(token, page = 1, visibleOnes = false):Observable<any>{        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });        

        return this._http.get(`${this.url}calls/${visibleOnes}/${page}`, {headers:headers});
    }   

    
    getAllCalls(token, visibleOnes = false):Observable<any>{     
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });        

        return this._http.get(`${this.url}all-calls/${visibleOnes}`, {headers:headers});
    }   

    editCall(token, callId, call:Call):Observable<any>{        
        let params = JSON.stringify(call);        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.put(this.url+'call/' + callId, params, {headers:headers});
    } 

    deleteCall(token, callId):Observable<any>{        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.delete(this.url + 'call/' + callId, {headers:headers});
    }
}