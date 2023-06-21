import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ForgotGuardService {

  constructor(private router: Router) {}

	canActivate(): boolean {
		if (localStorage.getItem('account.forgot') != 'yes') {
			this.router.navigate(['login']);
			
      		return false;
		}

		return true;
	}

}
