import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../../services/topic.service';
import { Topic } from '../../../models/topic-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  private topics: [Topic];

  constructor(
    private _topicService: TopicService,
    private router: Router
  ) {
    this.getTopics();
  }

  ngOnInit() {
  }

  getTopics() {
    this._topicService.getTopicByUser(JSON.parse(localStorage.getItem('user'))._id).subscribe(
      res => {
        if (res.data.topics != null) this.topics = res.data.topics;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  deleteTopic(id: string) {
    this._topicService.deleteTopic(id).subscribe(
      res => {
        this.getTopics();
      },
      err => {
        console.log(err.error)
      }
    );
  }

}
