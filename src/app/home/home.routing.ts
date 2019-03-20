import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';



const homeRoutes: Routes = [
    { 
        path: 'inicio', 
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'add', pathMatch: 'full'},
            { path: 'add', component: AddComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
