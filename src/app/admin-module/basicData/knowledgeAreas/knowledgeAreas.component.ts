import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BasicDataService } from 'src/app/services/basicData.service';

import { KnowledgeArea } from 'src/app/models/knowledge-area.model';

@Component({
    selector: 'knowledgeAreas',
    templateUrl: './knowledgeAreas.component.html'
})
export class KnowledgeAreasComponent {
    public title: string;
    public fieldsForm = [
        {
            id: "areaName",
            label: "Área de conocimiento",
            attr: "name",
            required: true
        }
    ];

    public submitted = false;
    public status;
    public areaForm;
    public editAreaForm;
    public knowledgeArea = new KnowledgeArea('');
    public areas;

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;

    // Filter
    public filter;
    public allAreas;    

    constructor(
        private _bDService:BasicDataService,
        private _route: ActivatedRoute,
        private _router:Router,
    ) {
        this.title = 'Áreas de conocimiento';
        this.areaForm = new FormGroup({
            areaName: new FormControl('', [Validators.required])
        });

        this.editAreaForm = new FormGroup({
            areaName: new FormControl('', [Validators.required])            
        });

        this.filter =  new FormControl();

    }

    ngOnInit(): void {        
        this.actualPage();
        this.getAllAreas();        
    }

    // Get controls form
    get f() { return this.areaForm.controls; }

    get f2() { return this.editAreaForm.controls; }  

    setAdd(){
        this.status = null;
        this.submitted = false;
    }
    
    onSubmit() {
        this.submitted = true;

        if (this.areaForm.invalid) {
            return;
        }

        this.knowledgeArea.name = this.areaForm.value.areaName;

        this._bDService.addKnowledgeArea(this.knowledgeArea).subscribe(
            response => {
                
                if (response.area && response.area._id) {
                    this.status = 'success';
                    this.areaForm.reset();
                    this.submitted = false;
                    this.getAreas(this.page);
                    this.getAllAreas();
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

    getAllAreas(){  
        this._bDService.getAllKnowledgeAreas().subscribe(
            response=>{       
                if(response.areas){
                    this.allAreas = response.areas;
                    localStorage.setItem('areas', JSON.stringify(this.allAreas));
                }
            },error=>{
                console.log(<any>error);
            });        
    }

    getAreas(page){  
        this._bDService.getKnowledgeAreas(page).subscribe(
            response=>{                  
                if(response.areas){
                    this.areas = response.areas; 
                    this.total = response.total; 
                    this.pages = response.pages;
                    if(page > this.pages){
                        this._router.navigate(['/admin/areas']);
                    }
                }
            },error=>{
                console.log(<any>error);
            });
    }

    public tempArea;
    setEditArea(area){
        this.status = null;
        this.submitted = false;
        this.tempArea = area;
        this.editAreaForm.patchValue({areaName:this.tempArea.name}); 
    }

    onEditSubmit() {
        this.status = null;
        this.submitted = true;
        
        if (this.editAreaForm.invalid) {
            return;
        }
        
        this.knowledgeArea.name = this.editAreaForm.value.areaName;

        this._bDService.editKnowledgeArea(this.tempArea._id, this.knowledgeArea).subscribe(
            response => {

                if (response.area && response.area._id) {
                    this.status = 'success';
                    this.submitted = false;
                    this.getAreas(this.page);
                    this.getAllAreas();
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

    public tempAreaId;
    setDeleteArea(areaId){
        this.tempAreaId = areaId;
    }

    delete(){
        this._bDService.deleteKnowledgeArea(this.tempAreaId).subscribe(
            response => {
                
                this.tempAreaId = null;
                this.getAreas(this.page);
                this.getAllAreas();
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
 
           this.getAreas(this.page);
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
