import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';




const homeRoutes: Routes = [
    { 
        path: 'inicio', 
        component: HomeComponent,
        children: [
            //{ path: '', redirectTo: 'add', pathMatch: 'full'},
            { path: '', component: MainComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
