import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user-model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment-model';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private url: string;
	private headers: HttpHeaders;

	constructor(private _http: HttpClient) {
		this.url = `${environment.url}/users`;
	}

	public prueba(): string {
		return `User Service: ${this.url}`;
	}

	public register(user: UserModel): Observable<any> {
		const body = user;
		this.headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url, body, { headers: this.headers });
	}

	public login(credentials): Observable<any> {
		const body = credentials;
		this.headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(`${this.url}/token`, body, { headers: this.headers });
	}

	public userIsLogged(): Boolean {
		return localStorage.getItem('identity') != null && localStorage.getItem('user') != null ? true : false;
	}

	public updateUser(user: UserModel): Observable<any> {
		const body = user;
		this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('authorization', localStorage.getItem('identity'));
		return this._http.put(`${this.url}`, body, { headers: this.headers });
	}

	public saveComment(comment: Comment, topicId: String): Observable<any> {
		this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('authorization', localStorage.getItem('identity'));
		return this._http.put(`${environment.url}/comments/topic/${topicId}`, comment.content, { headers: this.headers });
	}

	public getUsers(): Observable<any> {
		return this._http.get(`${this.url}`);
	}

	public getUser(id: string): Observable<any> {
		return this._http.get(`${this.url}/${id}`);
	}
}
