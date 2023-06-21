import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/shared/enum/status-code.enum';
import { Utils } from 'src/app/shared/utils/utils';
import { ForgotPasswordRequestModel } from '../../shared/models/auth-model';
import { AuthService } from '../../shared/service/auth.service';
import { StorageService } from '../../shared/service/storage.service';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {

  public email = ''

  public isEmailValid = true
  public isForgotSuccess = false

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackbar: MatSnackBar,
    private utils: Utils
  ) { }

  ngOnInit(): void {
  }

  doForgotPassword() {
    this.utils.openLoadingDialog()

    const bodyRequest = new ForgotPasswordRequestModel()
    bodyRequest.email = this.email

    this.authService.forgotPassword(bodyRequest).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.storageService.setForgot()
          this.isForgotSuccess = true
          
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

  submit() {
    this.isEmailValid = true

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)) this.isEmailValid = false
    
    if (this.isEmailValid) this.doForgotPassword()
  }

  isValid(): boolean {
    return this.email != ''
  }

  toLogin() {
    this.router.navigateByUrl('login')
  }

}
