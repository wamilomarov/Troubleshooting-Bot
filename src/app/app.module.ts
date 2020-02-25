import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { CsrViewComponent } from './components/csr-view/csr-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CsrListComponent } from './components/csr-list/csr-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {HttpErrorInterceptorProvider} from './services/http-error-interceptor/http-error-interceptor.service';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import {CookieService} from 'ngx-cookie-service';
import {ProfileService} from './services/profile/profile.service';
import { RegisterComponent } from './components/register/register.component';
import {LoadingInterceptor} from './services/loading/loading-interceptor';
import { ScrollableDirective } from './directives/scrollable/scrollable.directive';
import { OffsetTopDirective } from './directives/offsetTop/offset-top.directive';
import {AuthTokenInterceptorProvider} from './auth-token-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CreateFormComponent,
    CsrViewComponent,
    ProfileComponent,
    CsrListComponent,
    NotFoundComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    ScrollableDirective,
    OffsetTopDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule],
  providers: [
    CookieService,
    ProfileService,
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    HttpErrorInterceptorProvider, AuthTokenInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
