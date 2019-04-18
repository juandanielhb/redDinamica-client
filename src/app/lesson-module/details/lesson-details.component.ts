import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'lesson-details',
    templateUrl: './lesson-details.component.html'
    
})
export class LessonDetailsComponent implements OnInit {
    public title: string;
    
    @Input() lesson; 
    
    constructor(private _location:Location) {
        this.title = 'Leccion en';
        
    }

    ngOnInit(): void {
        
    }

    onBackButton(){
        this._location.back();
    }
}
