import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateFormComponent} from './components/create-form/create-form.component';
import {CsrViewComponent} from './components/csr-view/csr-view.component';
import {ProfileComponent} from './components/profile/profile.component';
import {CsrListComponent} from './components/csr-list/csr-list.component';
import {NotFoundComponent} from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  { path: 'search',
    component: CsrListComponent,
    data: {
      title: 'Search'
    }
  },
  { path: 'csr/create',
    component: CreateFormComponent,
    data: {
      title: 'New CSR'
    }
  },
  { path: 'csr/:id',
    component: CsrViewComponent,
    data: {
      title: 'View CSR'
    }
  },
  { path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'My Profile'
    }
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: "Not found"
    }
  },
  { path: '**', redirectTo: "not-found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
