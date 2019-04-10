import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { ReceivedComponent } from './received/received.component';
import { SendedComponent } from './sended/sended.component';
import { InfoComponent } from './info/info.component';

const messageRoutes: Routes = [
    {
        path: 'mensajes',
        component: MessageComponent,
        children: [
            { path: '', redirectTo: 'recibidos', pathMatch: 'full'},            
            { path: 'nuevo', component: NewMessageComponent},            
            { path: 'recibidos', component: ReceivedComponent},            
            { path: 'recibidos/:page', component: ReceivedComponent},            
            { path: 'enviados', component: SendedComponent},
            { path: 'enviados/:page', component: SendedComponent},
            { path: 'informacion', component: InfoComponent},            
            { path: '**', component: NewMessageComponent},
        ]
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(messageRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MessageRoutingModule {}
