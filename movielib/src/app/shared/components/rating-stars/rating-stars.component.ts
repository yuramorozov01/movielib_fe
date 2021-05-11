import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IRatingStar } from '../../interfaces/movies.interfaces';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent implements OnInit {

	@Input() middleStar: number;
	@Input() ratingStars: IRatingStar[];
	@Output() ratingClickEvent = new EventEmitter<number>();

	choosedRating: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(value: number) {
  	this.choosedRating = value;
  	this.ratingClickEvent.emit(value);
  }

}
