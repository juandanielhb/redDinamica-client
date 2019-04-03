import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Institution } from '../models/institution.model';
import { City } from '../models/city.model';
import { Profession } from '../models/profession.model';
import { KnowledgeArea } from '../models/knowledge-area.model';

@Injectable()
export class BasicDataService {
    public url:string;
    public identity;
    public token;

    constructor(
        private _http:HttpClient
    ){
        this.url = GLOBAL.url;
    }

    // *************** Institution methods *********************************
    addInstitution(institution:Institution):Observable<any>{
        let params = JSON.stringify(institution);
        let headers = new HttpHeaders({
            'Content-Type':'application/json'            
        });   
        
        return this._http.post(this.url + 'institution', params, {headers:headers});
    }
    
    getInstitutions(page = null):Observable<any>{        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });        

        return this._http.get(this.url + 'institutions/' + page, {headers:headers});
    }   
    
    getAllInstitutions():Observable<any>{     
        return this._http.get(this.url + 'all-institutions');
    }   

    editInstitution(institutionId, institution:Institution):Observable<any>{        
        let params = JSON.stringify(institution);        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.put(this.url+'institution/' + institutionId, params, {headers:headers});
    } 

    deleteInstitution(institutionId):Observable<any>{        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.delete(this.url + 'institution/' + institutionId, {headers:headers});
    }

    // *************** Cities methods *********************************
    addCity(city:City):Observable<any>{
        let params = JSON.stringify(city);
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.post(this.url + 'city', params, {headers:headers});
    } 
    
    getCities(page = null):Observable<any>{        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });        

        return this._http.get(this.url + 'cities/' + page, {headers:headers});
    }   
    
    getAllCities():Observable<any>{     
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.get(this.url + 'all-cities', {headers:headers});
    }   

    editCity(cityId, city:City):Observable<any>{        
        let params = JSON.stringify(city);        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.put(this.url+'city/' + cityId, params, {headers:headers});
    } 

    deleteCity(cityId):Observable<any>{        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.delete(this.url + 'city/' + cityId, {headers:headers});
    }      

    // *************** Knowledge Area methods *********************************
    addKnowledgeArea(knowledgeArea:KnowledgeArea):Observable<any>{
        let params = JSON.stringify(knowledgeArea);
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.post(this.url + 'area', params, {headers:headers});
    } 

    getKnowledgeAreas(page = null):Observable<any>{ 
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.get(this.url+'areas/'+ page, {headers:headers});
    }   
    
    getAllKnowledgeAreas( ):Observable<any>{     
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.get(this.url + 'all-areas', {headers:headers});
    }   

    editKnowledgeArea(areaId, area:KnowledgeArea):Observable<any>{        
        let params = JSON.stringify(area);        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.put(this.url + 'area/' + areaId, params, {headers:headers});
    } 

    deleteKnowledgeArea(areaId):Observable<any>{        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.delete(this.url + 'area/' + areaId, {headers:headers});
    } 

    // *************** Professions methods *********************************
    addProfession(profession:Profession):Observable<any>{
        let params = JSON.stringify(profession); 
        let headers = new HttpHeaders({'Content-Type':'application/json'});      

        return this._http.post(this.url+'profession', params, {headers:headers});
    }  
    
    getProfessions(page = null):Observable<any>{        
        return this._http.get(this.url+'professions/'+ page);
    }   
    
    getAllProfessions( ):Observable<any>{        
        return this._http.get(this.url + 'all-professions');
    }   

    editProfession(professionId, profession:Profession):Observable<any>{        
        let params = JSON.stringify(profession);        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.put(this.url + 'profession/' + professionId, params, {headers:headers});
    } 

    deleteProfession(professionId):Observable<any>{        
        let headers = new HttpHeaders({
            'Content-Type':'application/json', 
            'Authorization': this.getToken()
        });

        return this._http.delete(this.url + 'profession/' + professionId, {headers:headers});
    }  
    // *************** /Professions methods *********************************


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