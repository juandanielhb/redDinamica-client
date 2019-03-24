import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LessonComponent } from './lesson.component';


const lessonRoutes: Routes = [
    { 
        path: 'lecciones', 
        component: LessonComponent,
        children: [
            //{ path: '', redirectTo: 'add', pathMatch: 'full'},
            { path: '', component: LessonComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(lessonRoutes)],
    exports: [RouterModule]
})
export class LessonRoutingModule {}
