import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent {
	private page_tittle: string;
	private loginForm: FormGroup;

	constructor(private _userService: UserService, private router: Router) {
		this.page_tittle = 'Inicia sesión';
		this.loginForm = new FormGroup({
			email: new FormControl('', [ Validators.required, Validators.email ]),
			password: new FormControl('', [ Validators.required ])
		});
	}

	public login() {
		this._userService.login(this.loginForm.value).subscribe(
			(res) => {
				localStorage.setItem('identity', res.data.token);
				localStorage.setItem('user', JSON.stringify(res.data.user));
				this.loginForm.reset();
				this.router.navigate([ '/' ]);
			},
			(err) => {
				this.loginForm.reset();
				console.log(err.error);
			}
		);
	}
}
