import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MovieService } from '../../shared/services/movie/movie.service';
import { IMovie, IRatingStar, IStarMovie } from '../../shared/interfaces/movies.interfaces';

import { MaterializeService } from '../../shared/services/utils/materialize.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit, AfterViewInit {
	@ViewChild('description') descriptionRef: ElementRef;

	movie: IMovie;
	parentReview: number = null;
	middleStar: number = null;
	ratingStars: IRatingStar[] = [];

  constructor(private router: Router,
				private route: ActivatedRoute,
				private movieService: MovieService) { }

  ngOnInit(): void {
	}

	ngAfterViewInit() {
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
						this.middleStar = this.movie.middle_star;
						this.fetchRatingStars();
						this.loadDescription();
					}
				},
				error => MaterializeService.toast(error.error.detail),
		);
	}

	loadDescription() {
		this.descriptionRef.nativeElement.innerHTML = this.movie.description;
	}

	updateMovie() {
		let obsMovie$ = this.movieService.getById(this.movie.id);
		obsMovie$.subscribe(
			(movie: IMovie) => {
				this.movie = movie;
				this.middleStar = this.movie.middle_star;
				this.fetchRatingStars();
				this.loadDescription();
			},
			(error) => {
				MaterializeService.toast(error.error.detail);
			}
		);
	}

	fetchRatingStars() {
		let obsRatingStars$ = this.movieService.getRatingStars();
			obsRatingStars$.subscribe(
				(ratingStars: IRatingStar[]) => {
					this.ratingStars = ratingStars;
				},
				(error) => {
					MaterializeService.toast(error.error.detail);
				}
		);
	}

	reply(value: number) {
		this.parentReview = value;
	}

	replyComplete(value: boolean) {
		this.parentReview = null;
		this.updateMovie();
	}

	ratingClick(value: number) {
		let obsSetRating$ = this.movieService.setRating(value, this.movie.id);
		obsSetRating$.subscribe(
			(starMovie: IStarMovie) => {
				this.updateMovie();
				MaterializeService.toast(`You have rated as ${value}`);
			},
			(error) => {
				MaterializeService.toast(error.error.detail);
			}
		);

	}

}
