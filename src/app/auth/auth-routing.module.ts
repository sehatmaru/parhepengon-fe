import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './shared/service/auth-guard.service';
import { RegisterComponent } from './pages/register/register.component';
import { OtpValidationComponent } from './pages/otp-validation/otp-validation.component';
import { OtpGuardService } from './shared/service/otp-guard.service';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { PasswordForgotComponent } from './pages/password-forgot/password-forgot.component';
import { ForgotGuardService } from './shared/service/forgot-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'otp-validation',
    component: OtpValidationComponent,
    canActivate: [OtpGuardService]
  },
  {
    path: 'forgot-password',
    component: PasswordForgotComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'reset-password',
    component: PasswordResetComponent,
    canActivate: [AuthGuardService, ForgotGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
