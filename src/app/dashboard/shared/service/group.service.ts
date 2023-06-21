import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponsei } from 'src/app/shared/interface/common.interface';
import { CommonService } from 'src/app/shared/service/common.service';
import { AddKickMemberRequestModel, CreateGroupRequestModel, GroupDetailResponseModel, GroupResponseModel, MemberResponseModel } from '../models/group-model';
import { BaseRequestModel, BaseResponseModel } from '../models/common-model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private root = 'group';
  constructor(private commonApi: CommonService) { }

  getList(): Observable<CommonResponsei<GroupResponseModel[]>> {
    return this.commonApi.get(`${this.root}/list`) as Observable<any>;
  }

  create(bodyRequest: CreateGroupRequestModel): Observable<CommonResponsei<BaseResponseModel>> {
    return this.commonApi.post(`${this.root}/create`, bodyRequest) as Observable<any>;
  }

  update(bodyRequest: CreateGroupRequestModel): Observable<CommonResponsei<boolean>> {
    return this.commonApi.post(`${this.root}/update`, bodyRequest) as Observable<any>;
  }

  delete(bodyRequest: BaseRequestModel): Observable<CommonResponsei<boolean>> {
    return this.commonApi.post(`${this.root}/delete`, bodyRequest) as Observable<any>;
  }

  addMember(bodyRequest: AddKickMemberRequestModel): Observable<CommonResponsei<boolean>> {
    return this.commonApi.post(`${this.root}/member/add`, bodyRequest) as Observable<any>;
  }

  kickMember(bodyRequest: AddKickMemberRequestModel): Observable<CommonResponsei<boolean>> {
    return this.commonApi.post(`${this.root}/member/kick`, bodyRequest) as Observable<any>;
  }

  getMemberList(bodyRequest: BaseRequestModel): Observable<CommonResponsei<MemberResponseModel[]>> {
    return this.commonApi.post(`${this.root}/member/list`, bodyRequest) as Observable<any>;
  }

  leaveGroup(bodyRequest: BaseRequestModel): Observable<CommonResponsei<boolean>> {
    return this.commonApi.post(`${this.root}/member/leave`, bodyRequest) as Observable<any>;
  }

  detail(bodyRequest: BaseRequestModel): Observable<CommonResponsei<GroupDetailResponseModel>> {
    return this.commonApi.post(`${this.root}/detail`, bodyRequest) as Observable<any>;
  }

  getCategory(): Observable<CommonResponsei<any[]>> {
    return this.commonApi.get(`${this.root}/category/list`) as Observable<any>;
  }

}
