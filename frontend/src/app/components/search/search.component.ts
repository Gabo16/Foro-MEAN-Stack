import { Component, OnInit } from '@angular/core';
import { Topic } from '../../models/topic-model';
import { TopicService } from '../../services/topic.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  private termino: string;
  private url: string;
  private topics: Topic[];

  constructor(
    private _topicService: TopicService,
    private activatedRoute: ActivatedRoute
  ) {
    this.url = environment.url;
    this.termino = this.activatedRoute.snapshot.params['termino'];
    this.serch(this.termino);
  }

  ngOnInit() {
  }

  serch(termino: string) {
    this._topicService.search(termino).subscribe(
      res => {
        this.topics = res.data.topics;
      },
      err => {
        console.log(err);
      }
    );
  }

}
