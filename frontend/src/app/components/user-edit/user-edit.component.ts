import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user-model';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit {

  private tittle: string;
  private user: UserModel
  private userEditForm: FormGroup;
  private image: string;
  private url: string;
  private token: string;
  private afuConfig: Object;
  private cambio: boolean;

  constructor(
    private router: Router,
    private _userService: UserService
  ) {
    this.tittle = 'Mi Perfil';
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userEditForm = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3)
        ]),
      surname: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3)
        ]),
      email: new FormControl(null,
        [
          Validators.required,
          Validators.email
        ]),
      role: new FormControl(null,
        Validators.required),
      image: new FormControl(null),
    });
    this.userEditForm.setValue(this.user);
    this.url = environment.url;
    this.token = localStorage.getItem('identity');
    this.cambio = false;
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".svg, .png, .jpg, .jpeg, .gif",
      maxSize: "10",
      uploadAPI: {
        url: this.url + "/users/avatar",
        headers: {
          "authorization": this.token
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: true,
      attachPinText: "Sube tu foto",
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Selecciona una imagen',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !'
      }
    };
  }

  ngOnInit() {
  }

  userEdit() {
    this.user = this.userEditForm.value;
    this._userService.updateUser(this.user).subscribe(
      res => {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.router.navigate(['/mi-perfil']);
      },
      err => {
        console.log(err.error);
      }
    );
  }

  avatarUpload(data) {
    let data_obj = JSON.parse(data.response);
    this.user.image = data_obj.data.image;
  }

}
