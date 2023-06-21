import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { StorageService } from '../../shared/service/storage.service';
import { LoginRequestModel } from '../../shared/models/auth-model';
import { StatusCode } from 'src/app/shared/enum/status-code.enum';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username = ''
  public password = ''

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackbar: MatSnackBar,
    private utils: Utils
  ) { }

  ngOnInit(): void {
  }

  doLogin() {
    this.utils.openLoadingDialog()

    const bodyRequest = new LoginRequestModel()
    bodyRequest.password = this.password
    bodyRequest.username = this.username

    this.authService.doLogin(bodyRequest).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.NOT_FOUND) {
          this.snackbar.open(resp.message, 'OK', { duration: 5000 })
        } else if (resp.statusCode == StatusCode.SUCCESS) {
          this.storageService.setLogin(
            resp.result.secureId,
            resp.result.username,
            resp.result.fullname,
            resp.result.accessToken
          )

          this.router.navigateByUrl('');
        }

        this.utils.closeLoadingDialog()
      },
      error: (error) => {
        this.snackbar.open(error.message, 'OK', { duration: 5000 })
        this.utils.closeLoadingDialog()
      }
   });
  }

  toRegister() {
    this.router.navigateByUrl('register')
  }

  toForgotPassword() {
    this.router.navigateByUrl('forgot-password')
  }

  isValid(): boolean {
    return this.username != '' && this.password != ''
  }
}
