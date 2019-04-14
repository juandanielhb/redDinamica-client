import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Lesson } from '../models/lesson.model';

@Injectable()
export class LessonService {
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = GLOBAL.url;
    }

    
    addLesson(token, lesson:Lesson):Observable<any>{
        let params = JSON.stringify(lesson);
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': token        
        });   
        
        return this._http.post(this.url + 'lesson', params, {headers:headers});
    }
    
    // getlessons(page = null):Observable<any>{        
    //     let headers = new HttpHeaders({
    //         'Content-Type':'application/json', 
    //         'Authorization': this.getToken()
    //     });        

    //     return this._http.get(this.url + 'lessons/' + page, {headers:headers});
    // }   
    
    // getAlllessons():Observable<any>{     
    //     return this._http.get(this.url + 'all-lessons');
    // }   

    // editlesson(lessonId, lesson:lesson):Observable<any>{        
    //     let params = JSON.stringify(lesson);        
    //     let headers = new HttpHeaders({
    //         'Content-Type':'application/json', 
    //         'Authorization': this.getToken()
    //     });

    //     return this._http.put(this.url+'lesson/' + lessonId, params, {headers:headers});
    // } 

    // deletelesson(lessonId):Observable<any>{        
    //     let headers = new HttpHeaders({
    //         'Content-Type':'application/json', 
    //         'Authorization': this.getToken()
    //     });

    //     return this._http.delete(this.url + 'lesson/' + lessonId, {headers:headers});
    // }
}