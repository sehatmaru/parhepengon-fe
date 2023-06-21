import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateGroupRequestModel } from 'src/app/dashboard/shared/models/group-model';
import { GroupService } from 'src/app/dashboard/shared/service/group.service';
import { StatusCode } from 'src/app/shared/enum/status-code.enum';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-create-edit-group',
  templateUrl: './create-edit-group.component.html',
  styleUrls: ['./create-edit-group.component.scss']
})
export class CreateEditGroupComponent {

  public categoryList: any[] = []

  public nameValue = ''
  public categoryValue = ''

  constructor(
    private groupService: GroupService,
    private utils: Utils,
    private router: Router,
    private location: Location,
    private snackbar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.getCategory()
  }

  submit() {
    this.utils.openLoadingDialog()

    const bodyRequest = new CreateGroupRequestModel()
    bodyRequest.groupName = this.nameValue
    bodyRequest.category = this.categoryValue

    this.groupService.create(bodyRequest).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.location.back();
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

  getCategory() {
    this.groupService.getCategory().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.categoryList = resp.result
          this.categoryValue = this.categoryList[0]
        } else {
          this.snackbar.open(resp.message, 'OK', { duration: 5000 })
        }
      },
      error: (error) => {
        this.snackbar.open(error.message, 'OK', { duration: 5000 })
      }
    });
  }

  isValid(): boolean {
    return this.nameValue != '' && this.categoryValue != ''
  }
}
