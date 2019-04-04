import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';


// Modules
import { HomeModule } from './home-module/home.module';
import { AdminModule } from './admin-module/admin.module';
import { LessonModule } from './lesson-module/lesson.module';
import { ProfileModule } from './profile-module/profile.module';

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
import { Location } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';


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
    LessonModule,    
    ProfileModule,
    NgSelectModule
  ],
  providers: [
    appRoutingProviders,    
    UserService,
    UploadService,
    BasicDataService,
    Location
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
