import { Component, OnInit } from '@angular/core';
import { Topic } from '../../models/topic-model';
import { TopicService } from '../../services/topic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-topics',
	templateUrl: './topics.component.html',
	styles: []
})
export class TopicsComponent implements OnInit {
	private topics: [Topic];
	private url: string;
	private totalPages: number[] = [];
	private page: number;
	private nextPage: number;
	private prevPage: number;
	private total: number;

	constructor(private _topicService: TopicService, private router: Router, private activedRoute: ActivatedRoute) {
		this.page = Number(this.activedRoute.snapshot.params['page']) || 1;
		this.url = environment.url;
	}

	ngOnInit() {
		this.activedRoute.params.subscribe((params) => {
			this.getTopics(params.page);
		});
	}

	getTopics(page) {
		this._topicService.getTopics(page).subscribe(
			(res) => {
				this.nextPage = res.data.nextPage || 0;
				this.prevPage = res.data.prevPage || 0;
				this.page = res.data.page;
				this.topics = res.data.topics;
				this.total = res.data.totalPages;
				this.totalPages = [];
				for (let i = 1; i <= res.data.totalPages; i++) {
					this.totalPages.push(i);
				}
			},
			(err) => {
				console.log(err.error);
			}
		);
	}
}
