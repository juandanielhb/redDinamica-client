import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home.routing';

import { AddComponent } from './components/add/add.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
    declarations: [
        MainComponent,
        AddComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule
    ],
    exports: [
        MainComponent,
        AddComponent
    ],
    providers: [],
})
export class HomeModule { }