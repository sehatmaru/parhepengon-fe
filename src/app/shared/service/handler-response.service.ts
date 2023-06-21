import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { StatusCode } from '../enum/status-code.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseCode } from '../enum/response-code.enum';
import { StorageService } from 'src/app/auth/shared/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HandlerResponseService {

  constructor(
    private storageService: StorageService, 
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  failedResponse(error: { statusCode: number, message: string, result: any }): any {

    switch (error.statusCode) {

      case StatusCode.UNAUTHORIZED:
        if (error.message === ResponseCode.AUTH_ERROR_MESSAGE || error.message === ResponseCode.INVALID_TOKEN) {
          this.storageService.removeLogged();
          this.router.navigateByUrl('/login');
        }

        this.snackbar.open(error.message, 'OK', { duration: 5000 })
        
        break;

    }

    return of(error);
  }

}
