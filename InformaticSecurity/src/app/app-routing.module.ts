import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './Componentes/home/home.component';
import { LoginComponent } from './Componentes/login/login.component';

import { RegisterComponent } from './Componentes/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { tokenAuthGuard } from './guards/tokenAuth.guard';

const routes: Routes = [
  {
    path:'login', component: LoginComponent, pathMatch: 'full'
  },
  {
    path: 'register', component: RegisterComponent, pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard],
  },
  {
    path: '**', redirectTo: '/login', pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
