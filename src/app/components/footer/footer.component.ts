import { Component, OnInit } from '@angular/core';



@Component({
    selector: 'footer_rd',
    templateUrl: './footer.component.html'    
})
export class FooterComponent implements OnInit {
    public title:string;
    

    constructor() { 
        this.title = 'Footer Component';
        
    }

    ngOnInit(){
        console.log("Inicializado " + this.title);
    }
}
