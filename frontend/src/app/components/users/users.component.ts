import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user-model';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  private users: UserModel[];
  private url: String;
  private nextPage: number;
  private prevPage: number;
  private page: number;
  private totalPages: number[] = [];
  private total: number;

  constructor(
    private _userService: UserService
  ) {
    this.url = environment.url;
    this._userService.getUsers().subscribe(
      data => {
        this.users = data.data.users;
        this.nextPage = data.data.nextPage || 0;
        this.prevPage = data.data.prevPage || 0;
        this.page = data.data.page;
        this.total = data.data.total_Pages;
        this.totalPages = [];
        for (let i = 1; i <= data.data.totalPages; i++) {
          this.totalPages.push(i);
        }
      },
      err => {
        console.log(err);

      }
    );
  }

  ngOnInit() {
  }

}
