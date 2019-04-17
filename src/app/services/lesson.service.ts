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

    getLesson(token, page = 1, visibleOnes = false): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(`${this.url}lessons/${visibleOnes}/${page}`, { headers: headers });

    }

    getAllLesson(token, orderBy = '', visibleOnes = false): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });        
        
        return this._http.get(`${this.url}all-lessons/${visibleOnes}/${orderBy}`, { headers: headers });
    }

    getSuggestedLesson(token, page = 1): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(`${this.url}suggest-lessons/${page}`, { headers: headers });

    }

    getExperiences(token, page = 1): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(`${this.url}experiences/${page}`, { headers: headers });

    }

    editLesson(token, lesson:Lesson):Observable<any>{        
        let params = JSON.stringify(lesson);        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.put(this.url+'lesson/' + lesson._id, params, {headers:headers});
    } 

    deleteLesson(token, lessonId):Observable<any>{        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': token
        });

        return this._http.delete(this.url + 'lesson/' + lessonId, {headers:headers});
    }
}