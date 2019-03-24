import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';



@NgModule({
    declarations: [
        HomeComponent,
        MainComponent        
    ],
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule
    ],
    exports: [
        HomeComponent
    ],
    providers: [],
})
export class HomeModule { }