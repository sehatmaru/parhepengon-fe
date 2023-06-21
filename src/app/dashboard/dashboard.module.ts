import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { CreateEditGroupComponent } from './pages/group/create-edit-group/create-edit-group.component';
import { DetailGroupComponent } from './pages/group/detail-group/detail-group.component';


@NgModule({
  declarations: [
    HomeComponent,
    CreateEditGroupComponent,
    DetailGroupComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
  ]
})
export class DashboardModule { }
