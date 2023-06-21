import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/component/shared.module';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './auth/shared/service/auth-guard.service';
import { ForgotGuardService } from './auth/shared/service/forgot-guard.service';
import { OtpGuardService } from './auth/shared/service/otp-guard.service';
import { ProfileGuardService } from './auth/shared/service/profile-guard.service';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { CommonInterceptor } from './shared/interceptor/common.interceptor';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    DashboardModule,
    SharedModule,
    ClipboardModule,
    RouterModule.forRoot([]),
    NgbModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
  ],
  providers: [
    AuthGuardService, 
    ProfileGuardService,
    OtpGuardService,
    ForgotGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoaderComponent
  ]
})
export class AppModule { }
