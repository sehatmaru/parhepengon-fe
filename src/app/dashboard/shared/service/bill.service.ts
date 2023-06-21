import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponsei } from 'src/app/shared/interface/common.interface';
import { CommonService } from 'src/app/shared/service/common.service';
import { AddCommentRequest, BillDetailResponseModel, BillResponseModel, CreateBillRequestModel } from '../models/bill-model';
import { BaseRequestModel, BaseResponseModel } from '../models/common-model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private root = 'bill';
  constructor(private commonApi: CommonService) { }

  getList(): Observable<CommonResponsei<BillResponseModel[]>> {
    return this.commonApi.get(`${this.root}/list`) as Observable<any>;
  }

  create(bodyRequest: CreateBillRequestModel): Observable<CommonResponsei<BaseResponseModel>> {
    return this.commonApi.post(`${this.root}/create`, bodyRequest) as Observable<any>;
  }

  edit(bodyRequest: CreateBillRequestModel): Observable<CommonResponsei<boolean>> {
    return this.commonApi.post(`${this.root}/update`, bodyRequest) as Observable<any>;
  }

  delete(bodyRequest: BaseRequestModel): Observable<CommonResponsei<boolean>> {
    return this.commonApi.post(`${this.root}/delete`, bodyRequest) as Observable<any>;
  }

  submitComment(bodyRequest: AddCommentRequest): Observable<CommonResponsei<BaseResponseModel>> {
    return this.commonApi.post(`${this.root}/comment/add`, bodyRequest) as Observable<any>;
  }

  detail(bodyRequest: BaseRequestModel): Observable<CommonResponsei<BillDetailResponseModel>> {
    return this.commonApi.post(`${this.root}/detail`, bodyRequest) as Observable<any>;
  }

}
