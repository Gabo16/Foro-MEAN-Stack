import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Topic } from '../../../models/topic-model';
import { TopicService } from '../../../services/topic.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styles: []
})
export class AddComponent implements OnInit {
	private topicForm: FormGroup;
	private topic: Topic;
	private tittle: string;
	private err: boolean;
	private token: string;
	private sent: boolean;

	constructor(private router: Router, private _topicService: TopicService) {
		this.tittle = 'Crear Tema';
		this.topic = new Topic();
		this.token = localStorage.getItem('identity');
		this.sent = false;
		this.topicForm = new FormGroup({
			tittle: new FormControl(null, Validators.required),
			content: new FormControl(null, Validators.required),
			code: new FormControl(null, Validators.required),
			lang: new FormControl(null, Validators.required)
		});
	}

	ngOnInit() {}

	saveTopic() {
		this.sent = true;
		this.topic = this.topicForm.value;
		this.topic.user = JSON.parse(localStorage.getItem('user'))._id;
		this._topicService.saveTopic(this.topic).subscribe(
			(data) => {
				console.log(data);
				this.router.navigate([ '/panel/listado' ]);
			},
			(err) => {
				console.log(err.error);
			}
		);
	}
}
