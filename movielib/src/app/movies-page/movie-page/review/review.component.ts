import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IReview } from '../../../shared/interfaces/movies.interfaces';

import { MovieService } from '../../../shared/services/movie/movie.service';
import { MaterializeService } from '../../../shared/services/utils/materialize.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

	@Input() reviews: IReview;
	@Output() replyEvent = new EventEmitter<number>();

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  reply(value: number) {
    this.replyEvent.emit(value);
  }

}
