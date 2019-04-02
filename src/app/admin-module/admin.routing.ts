import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { LessonsComponent } from './lessons/news.component';
import { NewsComponent } from './news/news.component';

import { CitiesComponent } from './basicData/cities/cities.component';
import { InstitutionsComponent } from './basicData/institutions/institutions.component';
import { ProfessionsComponent } from './basicData/professions/professions.component';
import { KnowledgeAreasComponent } from './basicData/knowledgeAreas/knowledgeAreas.component';
import { NewUsersComponent } from './users/newUsers/newUsers.component';
import { UsersComponent } from './users/users/users.component';
import { AdminGuard } from '../guards/admin.guard';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', component: NewUsersComponent},
            { path: 'usuarios-nuevos', component: NewUsersComponent},
            { path: 'usuarios-nuevos/:page', component: NewUsersComponent},
            { path: 'usuarios', component: UsersComponent},
            { path: 'usuarios/:page', component: UsersComponent},
            { path: 'lecciones', component: LessonsComponent},
            { path: 'noticias', component: NewsComponent},
            { path: 'ciudades', component: CitiesComponent},
            { path: 'ciudades/:page', component: CitiesComponent},
            { path: 'instituciones', component: InstitutionsComponent},
            { path: 'instituciones/:page', component: InstitutionsComponent},
            { path: 'areas', component: KnowledgeAreasComponent},
            { path: 'areas/:page', component: KnowledgeAreasComponent},            
            { path: 'profesiones/:page', component: ProfessionsComponent},
            { path: 'profesiones', component: ProfessionsComponent},
            

            { path: '**', component: NewUsersComponent},
        ]
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}
