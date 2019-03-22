import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { LessonsComponent } from './lessons/news.component';
import { NewsComponent } from './news/news.component';

import { CitiesComponent } from './basicData/cities/cities.component';
import { BasicDataComponent } from './basicData/basicData.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', component: UsersComponent},
            { path: 'usuarios', component: UsersComponent},
            { path: 'lecciones', component: LessonsComponent},
            { path: 'noticias', component: NewsComponent},
            { path: 'db/ciudades', component: CitiesComponent},
            { path: 'db/instituciones', component: BasicDataComponent},
            { path: 'db/areas', component: BasicDataComponent},

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
