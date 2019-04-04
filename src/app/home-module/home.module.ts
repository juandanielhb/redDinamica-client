import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
    declarations: [
        HomeComponent,
        MainComponent,
        UsersComponent,
        FilterPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HomeRoutingModule
    ],
    exports: [
        HomeComponent
    ],
    providers: [],
})
export class HomeModule { }