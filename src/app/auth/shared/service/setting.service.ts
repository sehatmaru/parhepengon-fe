import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponsei } from 'src/app/shared/interface/common.interface';
import { CommonService } from 'src/app/shared/service/common.service';
import { SettingChangeRequestModel, SettingsResponseModel } from '../models/setting-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private root = 'setting';
  constructor(private commonApi: CommonService) { }

  change(bodyRequest: SettingChangeRequestModel): Observable<CommonResponsei<boolean>> {
    return this.commonApi.post(`${this.root}/change`, bodyRequest) as Observable<any>;
  }

  get(): Observable<CommonResponsei<SettingsResponseModel>> {
    return this.commonApi.get(`${this.root}/get`) as Observable<any>;
  }
}
