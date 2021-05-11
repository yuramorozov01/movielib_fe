import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IMessage } from '../../interfaces/utils.interfaces';
import { IMovieList, IMovie, IReviewCreate, IRatingStar, IStarMovie } from '../../interfaces/movies.interfaces';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	constructor(private http: HttpClient) { }

	fetch(params: any = {}): Observable<IMovieList> {
		return this.http.get<IMovieList>('/api/v1/movie/', {
			params: new HttpParams({
				fromObject: params,
			}),
		});
	}

	getById(id: number): Observable<IMovie> {
		return this.http.get<IMovie>(`/api/v1/movie/${id}/`);
	}

	sendReview(email: string, name: string, text: string, parent: number, movie: number): Observable<IReviewCreate> {
		let data = {
			email: email,
			name: name,
			text: text,
			parent: parent, 
			movie: movie,
		};
		return this.http.post<IReviewCreate>('/api/v1/review/', data);
	}

	getRatingStars(): Observable<IRatingStar[]> {
		return this.http.get<IRatingStar[]>('/api/v1/rating/stars');
	}

	setRating(star: number, movie: number): Observable<IStarMovie> {
		let data = {
			star: star,
			movie: movie,
		};
		return this.http.post<IStarMovie>('/api/v1/rating/', data);
	}
}