import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { StorageService } from '../../shared/service/storage.service';
import { StatusCode } from 'src/app/shared/enum/status-code.enum';
import { Utils } from 'src/app/shared/utils/utils';
import { VerifyOtpRequestModel } from '../../shared/models/auth-model';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.scss']
})
export class OtpValidationComponent implements OnInit {

  public firstOtp = ''
  public secondOtp = ''
  public thirdOtp = ''
  public fourthOtp = ''
  public fifthOtp = ''

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackbar: MatSnackBar,
    private utils: Utils
  ) { }
  
  ngOnInit(): void {
  }

  doVerify() {
    this.utils.openLoadingDialog()

    const bodyRequest = new VerifyOtpRequestModel()
    bodyRequest.otp = this.firstOtp + this.secondOtp + this.thirdOtp + this.fourthOtp + this.fifthOtp

    this.authService.verifyOtp(bodyRequest).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.snackbar.open('Sign up success. Please sign in', 'OK', { duration: 5000 })
          this.storageService.removeTemporaryToken()

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

  resendOTP() {
    this.utils.openLoadingDialog()

    this.authService.resendOtp().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.snackbar.open('Success, check your email', 'OK', { duration: 5000 })
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

  isValid(): boolean {
    return this.firstOtp != '' && this.secondOtp != ''
      && this.thirdOtp != '' && this.fourthOtp != ''
      && this.fifthOtp != ''
  }

  nextFocus(event: any, currentFocus: number) {
    let nextOtp: HTMLInputElement

    if (event.data != null) {
      if (currentFocus == 1) nextOtp = document.getElementById('secondOtp') as HTMLInputElement;
      else if (currentFocus == 2) nextOtp = document.getElementById('thirdOtp') as HTMLInputElement;
      else if (currentFocus == 3) nextOtp = document.getElementById('fourthOtp') as HTMLInputElement;
      else if (currentFocus == 4) nextOtp = document.getElementById('fifthOtp') as HTMLInputElement;
      else return
    } else {
      if (currentFocus == 2) nextOtp = document.getElementById('firstOtp') as HTMLInputElement;
      else if (currentFocus == 3) nextOtp = document.getElementById('secondOtp') as HTMLInputElement;
      else if (currentFocus == 4) nextOtp = document.getElementById('thirdOtp') as HTMLInputElement;
      else if (currentFocus == 5) nextOtp = document.getElementById('fourthOtp') as HTMLInputElement;
      else return
    }

    nextOtp.focus()
  }
}
