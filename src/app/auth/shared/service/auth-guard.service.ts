import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardService {

  constructor(private router: Router) {}

	canActivate(): boolean {
		if (localStorage.getItem('account.username')) {
			this.router.navigate(['']);
			
      		return false;
		}

		return true;
	}

}
