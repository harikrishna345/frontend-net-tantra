import { OrderListComponent } from './order-list/order-list.component';
import { ServiceComponent } from './service/service.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { RoleGuardService as RoleGuard } from './role-guard.service';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'book-service',
    component: ServiceComponent,
  },
  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: WelcomeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '2',
    },
  },
  {
    path: 'serviceman',
    component: WelcomeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '1',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RoleGuard],
})
export class AppRoutingModule {}
