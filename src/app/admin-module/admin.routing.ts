import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { LessonsComponent } from './lessons/news.component';
import { NewsComponent } from './news/news.component';

import { CitiesComponent } from './basicData/cities/cities.component';
import { BasicDataComponent } from './basicData/basicData.component';
import { InstitutionsComponent } from './basicData/institutions/institutions.component';
import { KnowledgeAreasComponent } from './basicData/knowledgeAreas/knowledgeAreas.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', component: UsersComponent},
            { path: 'usuarios', component: UsersComponent},
            { path: 'lecciones', component: LessonsComponent},
            { path: 'noticias', component: NewsComponent},
            { path: 'ciudades', component: CitiesComponent},
            { path: 'instituciones', component: InstitutionsComponent},
            { path: 'areas', component: KnowledgeAreasComponent},

            { path: '**', component: UsersComponent},
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
