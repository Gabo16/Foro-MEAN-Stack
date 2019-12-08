import { Component, OnInit } from '@angular/core';
import { Topic } from '../../models/topic-model';
import { TopicService } from '../../services/topic.service';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../models/user-model';
import { environment } from '../../../environments/environment';
import { Comment } from '../../models/comment-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
	selector: 'app-topic-detail',
	templateUrl: './topic-detail.component.html',
	styleUrls: [ './topic-detail.component.css' ]
})
export class TopicDetailComponent implements OnInit {
	private topic: Topic;
	private user: UserModel;
	private url: string;
	private imgUrl: string;
	private id: string;
	private comment: Comment;
	private identity;
	private token;
	private commentForm: FormGroup;

	constructor(
		private _topicService: TopicService,
		private activatedRoute: ActivatedRoute,
		private _commentService: CommentService
	) {
		this.topic = new Topic();
		this.user = new UserModel();
		this.url = environment.url;
		this.id = this.activatedRoute.snapshot.params['id'];
		this.token = localStorage.getItem('identity');
		this.identity = JSON.parse(localStorage.getItem('user')) || false;
		this.commentForm = new FormGroup({
			comment: new FormControl(null, Validators.required)
		});
	}

	ngOnInit() {
		this.getTopic();
	}

	getTopic() {
		this._topicService.getTopicById(this.id).subscribe(
			(res) => {
				this.topic = res.data.topic;
				this.user = res.data.topic.user;
				this.imgUrl = `${this.url}/users/avatar/${this.user.image}`;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	saveComment() {
		this.comment = new Comment();
		this.comment.content = this.commentForm.value.comment;
		this.comment.user = this.identity;
		this._commentService.saveComment(this.comment, this.topic._id).subscribe(
			(data) => {
				this.getTopic();
			},
			(err) => {
				console.log(err);
			}
		);
		this.commentForm.reset();
	}

	deleteComment(topicId: String, commentId: String) {
		this._commentService.deleteComment(topicId, commentId).subscribe(
			(data) => {
				this.getTopic();
			},
			(err) => {
				console.log(err);
			}
		);
	}
}
