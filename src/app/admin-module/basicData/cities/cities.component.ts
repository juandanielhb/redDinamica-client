import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BasicDataService } from 'src/app/services/basicData.service';

import { FIELDS_FORM } from './services/citiesData';
import { City } from 'src/app/models/city.model';

@Component({
    selector: 'cities',
    templateUrl: './cities.component.html'
})
export class CitiesComponent {
    public title: string;
    public fieldsForm = FIELDS_FORM;

    public submitted = false;
    public status;
    public cityForm;
    public editCityForm;
    public city = new City();
    public cities = [];

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;
        
    // Filter
    public filter;
    public allCities = [];

    public loading = true;

    constructor(
        private _bDService: BasicDataService,
        private _route: ActivatedRoute,
        private _router:Router,  
    ) {
        this.title = 'Ciudades';

        this.cityForm = new FormGroup({
            cityName: new FormControl('', [Validators.required]),
            cityState: new FormControl('', [Validators.required]),
            cityCountry: new FormControl('', [Validators.required])
        });

        this.editCityForm = new FormGroup({
            cityName: new FormControl('', [Validators.required]),
            cityState: new FormControl('', [Validators.required]),
            cityCountry: new FormControl('', [Validators.required])
        });

        this.filter =  new FormControl();        
    }

    ngOnInit(): void {        
        this.actualPage();
        this.getAllCities();        
    }

    // Get controls form
    get f() { return this.cityForm.controls; }

    get f2() { return this.editCityForm.controls; } 

    setAdd(){
        this.status = null;
        this.submitted = false;
    }
    
    onSubmit() {
        this.status = null;
        this.submitted = true;

        if (this.cityForm.invalid) {
            return;
        }

        this.city.name = this.cityForm.value.cityName;
        this.city.state = this.cityForm.value.cityState;
        this.city.country = this.cityForm.value.cityCountry;

        this._bDService.addCity(this.city).subscribe(
            response => {
                if (response.city && response.city._id) {
                    this.cityForm.reset();                    
                    this.status = 'success';
                    this.submitted = false;                    
                    this.getCities(this.page);
                    this.getAllCities();                

                } else {
                    this.status = 'error';

                }
            },
            error => {
                if (error != null) {
                    this.status = 'error';
                    console.log(<any>error);
                }
            }
        );
    }

    getAllCities(){  
        this._bDService.getAllCities().subscribe(
            response=>{       
                if(response.cities){
                    this.allCities = response.cities;
                    localStorage.setItem('cities', JSON.stringify(this.allCities));
                }
            },error=>{
                console.log(<any>error);
            });        
    }  
    
    getCities(page){  
        this._bDService.getCities(page).subscribe(
            response=>{                  
                if(response.cities){
                    this.cities = response.cities; 
                    this.total = response.total; 
                    this.pages = response.pages;
                    if(page > this.pages){
                        this._router.navigate(['/admin/ciudades']);
                    }
                    
                    this.loading = false;
                }
            },error=>{
                console.log(<any>error);
            }
        );
    }

    public tempCity;
    setEditCity(city){
        this.status = null;
        this.tempCity = city;
        
        this.editCityForm.patchValue({
            cityName: this.tempCity.name,
            cityState: this.tempCity.state,
            cityCountry: this.tempCity.country
        });         
    }

    onEditSubmit() {
        this.status = null;
        this.submitted = true;
        
        if (this.editCityForm.invalid) {
            return;
        }
        
        this.city.name = this.editCityForm.value.cityName;
        this.city.state = this.editCityForm.value.cityState;
        this.city.country = this.editCityForm.value.cityCountry;

        this._bDService.editCity(this.tempCity._id, this.city).subscribe(
            response => {
                if (response.city && response.city._id) {
                    this.status = 'success';
                    this.submitted = false;
                    this.getCities(this.page);
                    this.getAllCities();
                } else {
                    this.status = 'error';
                }
            },
            error => {
                if (error != null) {
                    this.status = 'error';
                    console.log(<any>error);
                }
            }
        );
    }  

    public tempCityId;
    setDeleteCity(cityId){
        this.tempCityId = cityId;
    }    

    delete(){
        this._bDService.deleteCity(this.tempCityId).subscribe(
            response => {
                
                this.tempCityId = null;
                this.getCities(this.page);
                this.getAllCities();
            },
            error => {
                console.log(<any>error);
            }
        )
    }    

    actualPage(){
        this._route.params.subscribe(params => {
           let page = +params['page'];

           this.page = page;

           if(!page){
               this.page = 1;
               this.nextPage = this.page + 1;
           }else{
               this.nextPage = page + 1;
               this.prevPage = page - 1;

               if(this.prevPage <= 0){
                   this.prevPage = 1;
               }
           }
 
           this.getCities(this.page);
        });
    }


    onKeydown(e) {
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click
            document.getElementById("save").click();
        }
    }

    onChanges(): void {

        this.cityForm.valueChanges.subscribe(val => {
            if (val) {
                this.status = null;
                this.submitted = false;
            }
        });

        this.editCityForm.valueChanges.subscribe(val => {
            if (val) {
                this.status = null;
                this.submitted = false;
            }
        });
    }
}
