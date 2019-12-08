import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic-model';

@Injectable({
	providedIn: 'root'
})
export class TopicService {
	private url: string;
	private headers: HttpHeaders;

	constructor(private _http: HttpClient) {
		this.url = `${environment.url}/topics`;
	}

	prueba(): string {
		return `Topic Services: ${this.url}`;
	}

	public saveTopic(topic: Topic): Observable<any> {
		const body = topic;
		this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('authorization', localStorage.getItem('identity'));
		return this._http.post(this.url, body, { headers: this.headers });
	}

	public getTopics(page = 1): Observable<any> {
		this.headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(`${this.url}/${page}`, { headers: this.headers });
	}

	public getTopicById(id: string): Observable<any> {
		this.headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(`${this.url}/topic/${id}`, { headers: this.headers });
	}

	public getTopicByUser(id: string): Observable<any> {
		this.headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(`${this.url}/user-topics/${id}`, { headers: this.headers });
	}

	public updateTopic(id: string, topic: Topic): Observable<any> {
		const body = topic;
		this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('authorization', localStorage.getItem('identity'));
		return this._http.put(`${this.url}/${id}`, body, { headers: this.headers });
	}

	public deleteTopic(id: string): Observable<any> {
		this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('authorization', localStorage.getItem('identity'));
		return this._http.delete(`${this.url}/${id}`, { headers: this.headers });
	}

	public search(termino: String): Observable<any> {
		const body = { termino };
		this.headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(`${this.url}/search`, body, { headers: this.headers });
	}
}
