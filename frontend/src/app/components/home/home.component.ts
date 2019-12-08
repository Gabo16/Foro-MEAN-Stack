import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../models/topic-model';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: []
})
export class HomeComponent implements OnInit {
	private topics: [Topic];
	private url: string;

	constructor(private _topicService: TopicService) {
		this.url = environment.url;
		this._topicService.getTopics().subscribe(
			(res) => {
				this.topics = res.data.topics;
			},
			(err) => {
				console.log(err.error);
			}
		);
	}

	ngOnInit() {}
}
