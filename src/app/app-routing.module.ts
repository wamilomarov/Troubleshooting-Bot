import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateFormComponent} from './components/create-form/create-form.component';
import {CsrViewComponent} from './components/csr-view/csr-view.component';
import {ProfileComponent} from './components/profile/profile.component';
import {CsrListComponent} from './components/csr-list/csr-list.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ChatComponent} from './components/chat/chat.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {RegisterComponent} from './components/register/register.component';


const routes: Routes = [
  { path: '',
    redirectTo: 'search',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { path: 'search',
    component: CsrListComponent,
    data: {
      title: 'Search'
    },
    canActivate: [AuthGuard]
  },
  { path: 'csr/create',
    component: CreateFormComponent,
    data: {
      title: 'New CSR'
    },
    canActivate: [AuthGuard]
  },
  { path: 'csr/:id',
    component: CsrViewComponent,
    data: {
      title: 'View CSR'
    },
    canActivate: [AuthGuard]
  },
  { path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'My Profile'
    },
    canActivate: [AuthGuard]
  },
  { path: 'chat',
    component: ChatComponent,
    data: {
      title: 'Chatbot'
    },
    canActivate: [AuthGuard]
  },
  { path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  { path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register'
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
