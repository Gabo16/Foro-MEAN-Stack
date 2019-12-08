import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { environment } from '../environments/environment';
import { UserModel } from './models/user-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
	private userLoged: Boolean = false;
	private url: string;
	private user: UserModel;
	private searchForm: FormGroup;

	constructor(private router: Router, private _userService: UserService) {
		this.searchForm = new FormGroup({
			termino: new FormControl('', [Validators.required])
		});
		this.url = environment.url;
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	ngDoCheck() {
		this.userLoged = this._userService.userIsLogged();
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	signOff() {
		localStorage.removeItem('identity');
		localStorage.removeItem('user');
		this.router.navigate(['/']);
	}

	search() {
		this.router.navigate([`/buscar/${this.searchForm.value.termino}`]);
	}
}
