import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IMessage } from '../../interfaces/utils.interfaces';
import { IMovieList, IMovie } from '../../interfaces/movies.interfaces';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	constructor(private http: HttpClient) { }

	fetch(params: any = {}): Observable<IMovieList> {
		return this.http.get<IMovieList>('/api/v1/movie', {
			params: new HttpParams({
				fromObject: params,
			}),
		});
	}

	getById(id: string): Observable<IMovie> {
		return this.http.get<IMovie>(`/api/v1/movie/${id}`);
	}

}