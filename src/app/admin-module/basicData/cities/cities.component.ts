import { Component } from '@angular/core';
import { FIELDS_FORM } from './services/citiesData';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BasicDataService } from 'src/app/services/basicData.service';
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
    public city = new City();

    constructor(
        private _bDService: BasicDataService,
    ) {
        this.title = 'Ciudades';

        this.cityForm = new FormGroup({
            cityName: new FormControl('', [Validators.required]),
            cityState: new FormControl('', [Validators.required]),
            cityCountry: new FormControl('', [Validators.required])
        })
    }

    // Get controls form
    get f() { return this.cityForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.cityForm.invalid) {
            return;
        }

        this.city.name = this.cityForm.value.cityName;
        this.city.state = this.cityForm.value.cityState;
        this.city.country = this.cityForm.value.cityCountry;

        console.log(this.city);
        this._bDService.addCity(this.city).subscribe(
            response => {
                console.table(response.city);
                if (response.city && response.city._id) {
                    this.status = 'success';
                    this.cityForm.reset();
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

    onKeydown(e) {
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click
            document.getElementById("save").click();
        }
    }
}
