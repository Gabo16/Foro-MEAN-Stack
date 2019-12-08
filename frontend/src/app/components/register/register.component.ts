import { Component } from '@angular/core';
import { UserModel } from '../../models/user-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: []
})
export class RegisterComponent {
	private page_tittle: string;
	private user: UserModel;

	private userForm: FormGroup;
	private err = false;

	constructor(private _userService: UserService, private router: Router) {
		this.page_tittle = 'Crea una Cuenta';
		this.user = new UserModel();
		this.userForm = new FormGroup({
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚÑñ ]*')
			]),
			surname: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚÑñ ]*')
			]),
			email: new FormControl('', [ Validators.required, Validators.email ]),
			password: new FormControl('', [ Validators.required, Validators.minLength(8) ])
		});
	}

	userRegister() {
		this.user.name = this.userForm.value.name;
		this.user.surname = this.userForm.value.surname;
		this.user.email = this.userForm.value.email;
		this.user.password = this.userForm.value.password;

		this._userService.register(this.user).subscribe(
			(res) => {
				// Swal.fire({
				//     title: 'Usuario Creado',
				//     type: 'success',
				//     showConfirmButton: false,
				//     timer: 1500
				// })
				this.userForm.reset();
				this.router.navigate([ '/ingresar' ]);
			},
			(e) => {
				const errors = e.error.error.error.errors;
				this.err = true;
			}
		);
	}
}
