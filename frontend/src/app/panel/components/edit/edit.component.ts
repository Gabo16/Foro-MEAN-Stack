import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Topic } from '../../../models/topic-model';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styles: []
})
export class EditComponent implements OnInit {

  private topicForm: FormGroup;
  private topic: Topic;
  private tittle: string;
  private err: boolean;
  private token: string;
  public id: string;
  private sent: boolean;

  constructor(
    private router: Router,
    private _topicService: TopicService,
    private activateRoute: ActivatedRoute
  ) {
    this.tittle = 'Editar Tema';
    this.topic = new Topic();
    this.token = localStorage.getItem('identity');
    this.sent = false;
    this.id = activateRoute.snapshot.params['id'];
    this.topicForm = new FormGroup({
      'tittle': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
      'code': new FormControl(null, Validators.required),
      'lang': new FormControl(null, Validators.required)
    });
    this._topicService.getTopicById(this.id).subscribe(
      res => {
        this.topic.tittle = res.data.topic.tittle
        this.topic.content = res.data.topic.content
        this.topic.lang = res.data.topic.lang
        this.topic.code = res.data.topic.code
        this.topicForm.setValue(this.topic);
      },
      err => {
        console.log(err.error);
      }
    );
  }

  ngOnInit() {
  }

  saveTopic() {
    this.sent = true;
    this.topic = this.topicForm.value;
    this._topicService.updateTopic(this.id, this.topic).subscribe(
      res => {
        this.router.navigate(['/panel/listado']);
      },
      err => {
        console.log(err.error);
      }
    )
  }

}
