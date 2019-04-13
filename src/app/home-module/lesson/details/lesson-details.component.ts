import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'lesson-details',
    templateUrl: './lesson-details.component.html'
    
})
export class LessonDetailsComponent implements OnInit {
    public title: string;
    public menuOptions;    
    
    constructor(private _location:Location) {
        this.title = 'Leccion en';
        
    }

    ngOnInit(): void {
        
    }

    onBackButton(){
        this._location.back();
    }
}
