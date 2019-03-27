import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
    transform(items: any, term: any): any {
        if(term === undefined){
            return items;
        }

        return items.filter((item) => {
            return item.name.toLowerCase().includes(term.toLowerCase());
        })
        
    }
}