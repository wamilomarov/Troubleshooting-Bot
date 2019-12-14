import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { GitSearchService} from './services/git-search/git-search.service';
import { GitSearchComponent } from './components/git-search/git-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { CsrViewComponent } from './components/csr-view/csr-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CsrListComponent } from './components/csr-list/csr-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {HttpErrorInterceptorProvider} from './services/http-error-interceptor/http-error-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    SidebarComponent,
    CreateFormComponent,
    CsrViewComponent,
    ProfileComponent,
    CsrListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [GitSearchService, HttpErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
