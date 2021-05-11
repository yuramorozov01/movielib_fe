import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReview, IReviewCreate } from '../../../shared/interfaces/movies.interfaces';
import { IUserMe } from '../../../shared/interfaces/auth.interfaces';

import { MovieService } from '../../../shared/services/movie/movie.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { MaterializeService } from '../../../shared/services/utils/materialize.service';


@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

	@Input() movie: number;
	@Input() parentReview: number = null;

	@Output() replyCompleteEvent = new EventEmitter<boolean>();

	form: FormGroup;

  constructor(private authService: AuthService,
  		private movieService: MovieService) { }

  ngOnInit(): void {
  	this.form = new FormGroup({
			text: new FormControl(null, Validators.required),
		});
  }

  onSubmit() {
		let obs$;
		this.form.disable();
		let obsUserInfo$ = this.authService.me();

		obsUserInfo$.subscribe(
			(user: IUserMe) => {
				obs$ = this.movieService.sendReview(user.email, user.username, this.form.value.text, this.parentReview, this.movie);
				this.replyComplete();
				obs$.subscribe(
					(review: IReviewCreate) => {
						this.form.reset();
						MaterializeService.toast("Review has been published successfully");
						this.form.enable();
					},
					(error) => {
						MaterializeService.toast(error.error.detail);
						this.form.enable();
					}
				);

			}
		);
	}

	replyComplete() {
		this.parentReview = null;
		this.replyCompleteEvent.emit(true);
	}
}
