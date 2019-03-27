import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FIELDS_FORM } from './services/institutionsData';
import { Institution } from 'src/app/models/institution.model';
import { BasicDataService } from 'src/app/services/basicData.service';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
    selector: 'institutions',
    templateUrl: './institutions.component.html'
})
export class InstitutionsComponent {
    public title: string;
    public fieldsForm = FIELDS_FORM;
    public submitted = false;
    public institutionForm;
    public institution;
    public status;
    public states;

    items = [true, 'Two', 3];
    selectedSimpleItem;
    selectedCarId = 3;
    cities = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab', disabled: true },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ]

    constructor(
        private _bDService: BasicDataService,
        private config: NgSelectConfig
    ) {
        this.institutionForm = new FormGroup({
            institutionName: new FormControl('', [Validators.required]),
            institutionWebsite: new FormControl(),
            institutionEmail: new FormControl(),
            institutionCity: new FormControl(),
            institutionTelephone: new FormControl()
        })
        this.institution = new Institution();
        this.title = 'Instituciones';
        this.config.addTagText = 'Agregar';
        this.config.notFoundText = 'No se encontro';
    }
    
    // Get controls form
    get f() { return this.institutionForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.institutionForm.invalid) {
            return;
        }

        this.institution.name = this.institutionForm.value.institutionName;
        this.institution.email = this.institutionForm.value.institutionEmail;
        this.institution.city = this.institutionForm.value.institutionCity;
        this.institution.website = this.institutionForm.value.institutionWebsite;
        this.institution.telephone = this.institutionForm.value.institutionTelephone;

        if (this.institution.city == '') {
            delete this.institution.city;
        }

        this._bDService.addInstitution(this.institution).subscribe(
            response => {
                console.table(response.institution);
                if (response.institution && response.institution._id) {
                    this.status = 'success';
                    this.institutionForm.reset();
                    this.submitted = false;

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

    onKeydown(e){
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click
            document.getElementById("save").click();
          }
    }
}
