import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
    transform(items: any, term: any): any {
        
        if(term === undefined || !term){
            return items;
        }

        return items.filter((item) => {            
            if(item.name != undefined){
                return item.name.toLowerCase().includes(term.toLowerCase());
            }else{
                return item.title.toLowerCase().includes(term.toLowerCase());                
            }
        })
        
    }
}