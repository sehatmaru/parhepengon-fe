import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { StorageService } from '../../shared/service/storage.service';
import { RegisterRequestModel } from '../../shared/models/auth-model';
import { StatusCode } from 'src/app/shared/enum/status-code.enum';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public username = ''
  public password = ''
  public rePassword = ''
  public name = ''
  public email = ''
  public phone = ''

  public isPasswordMissmatch = false
  public isEmailValid = true
  public isPhoneValid = true

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackbar: MatSnackBar,
    private utils: Utils
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.isPasswordMissmatch = false
    this.isEmailValid = true
    this.isPhoneValid = true

    if (this.password != this.rePassword) this.isPasswordMissmatch = true
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)) this.isEmailValid = false
    if (!/^(\+\d{1,3}\s?)?(\(\d{1,4}\)|\d{1,4})[-\s]?\d{1,14}$/.test(this.phone)) this.isPhoneValid = false;

    
    if (!this.isPasswordMissmatch && this.isEmailValid && this.isPhoneValid) this.doRegister()
  }

  doRegister() {
    this.utils.openLoadingDialog()

    const bodyRequest = new RegisterRequestModel()
    bodyRequest.password = this.password
    bodyRequest.username = this.username
    bodyRequest.email = this.email
    bodyRequest.fullName = this.name
    bodyRequest.phone = this.phone

    this.authService.doRegister(bodyRequest).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.storageService.setTemporaryToken(
            resp.result.temporaryToken
          )

          this.router.navigateByUrl('otp-validation');
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

  toLogin() {
    this.router.navigateByUrl('login')
  }

  isValid(): boolean {
    return this.username != '' && this.password != ''
      && this.name != '' && this.email != ''
      && this.rePassword != ''
  }
}
