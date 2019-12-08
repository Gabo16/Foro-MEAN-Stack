import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment-model';

@Injectable({
	providedIn: 'root'
})
export class CommentService {
	private url: string;
	private headers: HttpHeaders;

	constructor(private _http: HttpClient) {
		this.url = `${environment.url}/comments`;
	}

	public saveComment(comment: Comment, topicId: String): Observable<any> {
		this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('authorization', localStorage.getItem('identity'));
		return this._http.post(`${this.url}/topic/${topicId}`, comment, { headers: this.headers });
	}

	public deleteComment(topicId: String, commentId: String): Observable<any> {
		this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('authorization', localStorage.getItem('identity'));
		return this._http.delete(`${this.url}/${topicId}/${commentId}`, { headers: this.headers });
	}
}
