import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusCode } from 'src/app/shared/enum/status-code.enum';
import { Utils } from 'src/app/shared/utils/utils';
import { ResetPasswordRequestModel } from '../../shared/models/auth-model';
import { AuthService } from '../../shared/service/auth.service';
import { StorageService } from '../../shared/service/storage.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  private code = ''
  
  public password = ''
  public rePassword = ''

  public isPasswordMissmatch = false

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackbar: MatSnackBar,
    private utils: Utils,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
    });
  }

  doResetPassword() {
    this.utils.openLoadingDialog()

    const bodyRequest = new ResetPasswordRequestModel()
    bodyRequest.newPassword = this.password
    bodyRequest.code = this.code

    this.authService.resetPassword(bodyRequest).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.storageService.removeForgot()
          this.toLogin()
        }

        this.snackbar.open(resp.message, 'OK', { duration: 5000 })

        this.utils.closeLoadingDialog()
      },
      error: (error) => {
        this.snackbar.open(error.message, 'OK', { duration: 5000 })
        this.utils.closeLoadingDialog()
      }
   });
  }

  submit() {
    this.isPasswordMissmatch = false
    
    if (this.password != this.rePassword) this.isPasswordMissmatch = true
    
    if (!this.isPasswordMissmatch) this.doResetPassword()
  }

  isValid(): boolean {
    return this.password != '' && this.rePassword != ''
  }

  toLogin() {
    this.router.navigateByUrl('login')
  }

}
