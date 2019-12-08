import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserGuard implements CanActivate {
	constructor(private router: Router) { }
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		let identity = JSON.parse(localStorage.getItem('user'));
		if (identity && identity.name) {
			return true;
		} else {
			this.router.navigate(['/']);
			return false;
		}
	}
}
