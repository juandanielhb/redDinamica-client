import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';

// Modules
import { HomeModule } from './home-module/home.module';
import { AdminModule } from './admin-module/admin.module';
import { ProfileModule } from './profile-module/profile.module';
import { MessageModule } from './message-module/message.module';

// Components
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecoverPasswordComponent } from './components/recoverPassword/recoverPassword.component';
import { SearchComponent } from './components/search/search.component';
import { UserService } from './services/user.service';
import { ResourcesComponent } from './components/resources/resources.component';
import { UploadService } from './services/upload.service';

// Guards

import { BasicDataService } from './services/basicData.service';
import { SecurityOptionsComponent } from './components/securityOptions/securityOptions.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FollowService } from './services/follow.service';
import { PublicationService } from './services/publication.service';
import { MessageService } from './services/message.service';
import { CommentService } from './services/comment.service';
import { ResourceService } from './services/resource.service';
import { LessonService } from './services/lesson.service';
import { LandingGuard } from './guards/landing.guard';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    RecoverPasswordComponent,
    FooterComponent,
    ProfileComponent,
    ResourcesComponent,
    SearchComponent,    
    SecurityOptionsComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    Routing,
    ReactiveFormsModule,
    HomeModule,
    AdminModule,    
    ProfileModule,
    MessageModule,
    MomentModule,
    NgSelectModule
  ],
  providers: [
    appRoutingProviders,    
    UserService,
    FollowService,
    UploadService,
    PublicationService,
    BasicDataService,
    MessageService,
    CommentService,
    ResourceService,
    LessonService,
    LandingGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
