import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'rating',
    templateUrl: './rating.component.html'
    
})
export class RatingComponent implements OnInit {
    public title: string;
    
    @Input() lesson;
    
    constructor(private _location:Location) {
        this.title = 'Calificar';
        
    }

    ngOnInit(): void {
        
    }

    onBackButton(){
        this._location.back();
    }
}
