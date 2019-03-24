import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LessonRoutingModule } from './lesson.routing';
import { LessonComponent } from './lesson.component';


@NgModule({
    declarations: [
        LessonComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LessonRoutingModule
    ],
    exports: [
        LessonComponent
    ],
    providers: [],
})
export class LessonModule { }