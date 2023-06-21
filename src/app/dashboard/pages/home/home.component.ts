import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/shared/enum/status-code.enum';
import { AuthService } from 'src/app/auth/shared/service/auth.service';
import { StorageService } from 'src/app/auth/shared/service/storage.service';
import { Utils } from 'src/app/shared/utils/utils';
import { ClipboardService } from 'ngx-clipboard';
import { BillService } from '../../shared/service/bill.service';
import { GroupService } from '../../shared/service/group.service';
import { GroupResponseModel } from '../../shared/models/group-model';
import { BillResponseModel } from '../../shared/models/bill-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public billList: BillResponseModel[] = []
  public groupList: GroupResponseModel[] = []
  public categoryList: any[] = []

  public searchValue = ''
  public categoryValue = 'ALL'

  public generatedPassword = ''

  constructor(
    private authService: AuthService,
    private billService: BillService,
    private groupService: GroupService,
    private storageService: StorageService,
    private utils: Utils,
    private router: Router,
    private snackbar: MatSnackBar,
    private clipboardService: ClipboardService
  ) { }
  
  ngOnInit(): void {
    this.getBillList()
    this.getGroupList()
  }

  getBillList() {
    this.utils.openLoadingDialog()

    this.billService.getList().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.billList = resp.result
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

  getGroupList() {
    this.utils.openLoadingDialog()

    this.groupService.getList().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.groupList = resp.result
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

  toCreateForm() {
    this.router.navigateByUrl('form')
  }

  toEditForm(secureId: string) {
    this.router.navigateByUrl('form?secureId=' + secureId)
  }

  toRevealBill(secureId: string) {
    this.router.navigateByUrl('reveal?secureId=' + secureId)
  }

  toHistory() {
    this.router.navigateByUrl('history')
  }

  doLogout() {
    this.utils.openLoadingDialog()

    this.authService.logout().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.storageService.removeLogged()
          this.router.navigateByUrl('login');
          
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

  clearSearch() {
    this.searchValue = ''
    this.categoryValue = 'ALL'

    this.getBillList()
  }

  doCopy(value: string) {
    this.clipboardService.copyFromContent(value)

    this.snackbar.open('Copied', 'OK', { duration: 5000 })
  }
}
