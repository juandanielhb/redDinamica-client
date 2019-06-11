import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';
import { LessonsComponent } from './lessons/lessons/lessons.component';
import { ResourcesComponent } from './resources/resources.component';
import { MyLessonsComponent } from './lessons/my-lessons/my-lessons.component';
import { CallsComponent } from './lessons/calls/calls.component';
import { LessonComponent } from '../lesson-module/lesson.component';
import { AdviseLessonComponent } from './lessons/advise-lesson/advise-lesson.component';
import { HomeGuard } from './guards/home.guard';


const homeRoutes: Routes = [
    {
        path: 'inicio',
        component: HomeComponent,
        canActivate: [HomeGuard],
        children: [
            //{ path: '', redirectTo: 'add', pathMatch: 'full'},
            { path: '', component: MainComponent },
            { path: 'post', component: MainComponent },
            { path: 'post/:page', component: MainComponent },
            { path: 'usuarios', component: UsersComponent },
            { path: 'usuarios/:page', component: UsersComponent },
            { path: 'lecciones', component: LessonsComponent },
            { path: 'lecciones/:page', component: LessonsComponent },
            { path: 'leccion/:id', component: LessonComponent },
            { path: 'mis-lecciones', component: MyLessonsComponent },
            { path: 'mis-lecciones/:page', component: MyLessonsComponent },
            { path: 'asesorar-lecciones', component: AdviseLessonComponent },
            { path: 'asesorar-lecciones/:page', component: AdviseLessonComponent },
            { path: 'convocatorias', component: CallsComponent },
            { path: 'convocatorias/:page', component: CallsComponent },
            { path: 'recursos', component: ResourcesComponent },
            { path: 'recursos/:page', component: ResourcesComponent },
            { path: '**', component: MainComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
