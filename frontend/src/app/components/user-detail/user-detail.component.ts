import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user-model';
import { Topic } from '../../models/topic-model';
import { TopicService } from 'src/app/services/topic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {

  private url: string;
  private id: string;
  private user: UserModel;
  private topics: Topic[];
  private img: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _topicService: TopicService

  ) {
    this.user = new UserModel();
    this.topics = [];
    this.img = '';
    this.id = this.activatedRoute.snapshot.params['id'];
    this.url = environment.url;
  }

  ngOnInit() {
    this.getUser(this.id);
    this.getTopicsUser(this.id);
  }

  getUser(id: string) {
    this._userService.getUser(id).subscribe(
      res => {
        this.user = res.data.user;
        this.img = res.data.user.image;
      },
      err => {
        console.log(err)
      }
    );
  }

  getTopicsUser(id: string) {
    this._topicService.getTopicByUser(id).subscribe(
      res => {
        this.topics = res.data.topics;
      },
      err => {
        console.log(err);
      }
    );
  }

}
