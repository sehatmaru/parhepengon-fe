import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileGuardService } from '../auth/shared/service/profile-guard.service';
import { CreateEditGroupComponent } from './pages/group/create-edit-group/create-edit-group.component';
import { DetailGroupComponent } from './pages/group/detail-group/detail-group.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ProfileGuardService]
  },
  {
    path: 'group/create',
    component: CreateEditGroupComponent,
    canActivate: [ProfileGuardService]
  },
  {
    path: 'group/detail',
    component: DetailGroupComponent,
    canActivate: [ProfileGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
