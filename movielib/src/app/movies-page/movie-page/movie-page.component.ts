import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MovieService } from '../../shared/services/movie/movie.service';
import { IMovie } from '../../shared/interfaces/movies.interfaces';

import { MaterializeService } from '../../shared/services/utils/materialize.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

	movie: IMovie;

  constructor(private router: Router,
				private route: ActivatedRoute,
				private movieService: MovieService) { }

  ngOnInit(): void {
		this.route.params
			.pipe(
				switchMap(
					(params: Params) => {
						if (params['id']) {
							return this.movieService.getById(params['id']);
						}
						return of(null);
					}
				)
			)
			.subscribe(
				(movie: IMovie) => {
					if (movie) {
						this.movie = movie;
					}
				},
				error => MaterializeService.toast(error),
			);
	}

}
