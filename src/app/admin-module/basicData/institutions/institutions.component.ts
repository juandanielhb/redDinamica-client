import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';

import { BasicDataService } from 'src/app/services/basicData.service';

import { FIELDS_FORM } from './services/institutionsData';
import { Institution } from 'src/app/models/institution.model';

@Component({
    selector: 'institutions',
    templateUrl: './institutions.component.html'
})
export class InstitutionsComponent {
    public title: string;
    public fieldsForm = FIELDS_FORM;
    
    public submitted = false;
    public status;
    public institutionForm;
    public editInstitutionForm;
    public institution = new Institution();
    public institutions = [];

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;

    // Filter
    public filter;
    public allInstitutions;

    // Select data
    public items;
    public allCities = [];

    constructor(
        private _bDService: BasicDataService,
        private config: NgSelectConfig,
        private _route: ActivatedRoute,
        private _router:Router,        
    ) {
        this.title = 'Instituciones';

        this.institutionForm = new FormGroup({
            institutionName: new FormControl('', [Validators.required]),
            institutionWebsite: new FormControl(),
            institutionEmail: new FormControl(),
            institutionCity: new FormControl(),
            institutionTelephone: new FormControl()
        });

        this.editInstitutionForm = new FormGroup({
            institutionName: new FormControl('', [Validators.required]),
            institutionWebsite: new FormControl(),
            institutionEmail: new FormControl(),
            institutionCity: new FormControl(),
            institutionTelephone: new FormControl()
        });

        this.filter =  new FormControl();

        // Set up of select
        this.config.addTagText = 'Agregar';
        this.config.notFoundText = 'No se encontro'; 
        
        this.items = { institutionCity: ''};
        
    }

    ngOnInit(): void {      
        this.allCities = JSON.parse(localStorage.getItem('cities'));
        if(!this.allCities){
            this.getAllCities();
            
        }

        this.actualPage();
        this.getAllInstitutions();

    }

    // Get controls form
    get f() { return this.institutionForm.controls; }

    get f2() { return this.editInstitutionForm.controls; } 

    setAdd(){
        this.status = null;
        this.submitted = false;
        this.items = { institutionCity: this.allCities};
    }

    onSubmit() {        
        this.submitted = true;

        if (this.institutionForm.invalid) {
            return;
        }

        this.institution.name = this.institutionForm.value.institutionName;
        this.institution.email = this.institutionForm.value.institutionEmail;

        if (this.institutionForm.value.institutionCity) {
            this.institution.city = this.institutionForm.value.institutionCity._id;
        }

        this.institution.website = this.institutionForm.value.institutionWebsite;
        this.institution.telephone = this.institutionForm.value.institutionTelephone;


        this._bDService.addInstitution(this.institution).subscribe(
            response => {

                if (response.institution && response.institution._id) {
                    this.status = 'success';
                    this.institutionForm.reset();
                    this.submitted = false;
                    this.getInstitutions(this.page);
                    this.getAllInstitutions();

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

    getAllInstitutions(){  
        this._bDService.getAllInstitutions().subscribe(
            response=>{       
                if(response.institutions){
                    this.allInstitutions = response.institutions;
                    localStorage.setItem('institutions', JSON.stringify(this.allInstitutions));
                }
            },error=>{
                console.log(<any>error);
            });        
    }

    getInstitutions(page){  
        this._bDService.getInstitutions(page).subscribe(
            response=>{                  
                if(response.institutions){
                    this.institutions = response.institutions; 
                    this.total = response.total; 
                    this.pages = response.pages;
                    if(page > this.pages){
                        this._router.navigate(['/admin/instituciones']);
                    }
                }
            },error=>{
                console.log(<any>error);
            }
        );
    }

    public tempInstitution;
    setEditInstitution(institution){
        this.status = null;
        this.items = { institutionCity: this.allCities};
        this.tempInstitution = institution;
        this.editInstitutionForm.patchValue({
            institutionName: this.tempInstitution.name,
            institutionWebsite: this.tempInstitution.website,
            institutionEmail: this.tempInstitution.email,
            institutionCity: this.tempInstitution.city,
            institutionTelephone: this.tempInstitution.telephone
        });         
    }

    onEditSubmit() {
        this.status = null;
        this.submitted = true;
        
        if (this.editInstitutionForm.invalid) {
            return;
        }
        
        this.institution.name = this.editInstitutionForm.value.institutionName;
        this.institution.email = this.editInstitutionForm.value.institutionEmail;
        this.institution.city = this.editInstitutionForm.value.institutionCity;
        this.institution.website = this.editInstitutionForm.value.institutionWebsite;
        this.institution.telephone = this.editInstitutionForm.value.institutionTelephone;

        this._bDService.editInstitution(this.tempInstitution._id, this.institution).subscribe(
            response => {

                if (response.institution && response.institution._id) {
                    this.status = 'success';
                    this.submitted = false;
                    this.getInstitutions(this.page);
                    this.getAllInstitutions();
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

    public tempInstitutionId;
    setDeleteInstitution(institutionId){
        this.tempInstitutionId = institutionId;
    }    

    delete(){
        this._bDService.deleteInstitution(this.tempInstitutionId).subscribe(
            response => {
                
                this.tempInstitutionId = null;
                this.getInstitutions(this.page);
                this.getAllInstitutions();
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
 
           this.getInstitutions(this.page);
        });
    }

    getAllCities(){  
        this._bDService.getAllCities().subscribe(
            response=>{       
                if(response.cities){
                    this.allCities = response.cities;
                    localStorage.setItem('cities', JSON.stringify(this.allCities));
                    this.items.institutionCity = this.allCities;
                }
            },error=>{
                console.log(<any>error);
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
}
