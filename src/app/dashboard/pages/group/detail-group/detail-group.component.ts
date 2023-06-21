import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseRequestModel } from 'src/app/dashboard/shared/models/common-model';
import { GroupDetailResponseModel } from 'src/app/dashboard/shared/models/group-model';
import { GroupService } from 'src/app/dashboard/shared/service/group.service';
import { StatusCode } from 'src/app/shared/enum/status-code.enum';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.scss']
})
export class DetailGroupComponent {
  public groupDetail: GroupDetailResponseModel = new GroupDetailResponseModel;

  public secureId = ''

  constructor(
    private groupService: GroupService,
    private utils: Utils,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['secureId']) {
        this.secureId = params['secureId'];
      }
    });

    this.getGroupDetail()
  }

  getGroupDetail() {
    this.utils.openLoadingDialog()

    const requestBody = new BaseRequestModel()
    requestBody.secureId = this.secureId

    this.groupService.detail(requestBody).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.groupDetail = resp.result
        } else {
          this.snackbar.open(resp.message, 'OK', { duration: 5000 })
        }

        this.utils.closeLoadingDialog()
      },
      error: (error) => {
        this.snackbar.open(error.message, 'OK', { duration: 5000 })
        this.utils.closeLoadingDialog()
      }
    });
  }
}
