import { Component  } from '@angular/core';



@Component({
    selector: 'footer_rd',
    templateUrl: './footer.component.html'    
})
export class FooterComponent {
    public title:string;
    

    constructor() { 
        this.title = 'Footer Component';
        
    }
}
