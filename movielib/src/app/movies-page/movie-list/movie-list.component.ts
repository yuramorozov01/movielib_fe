import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieService } from '../../shared/services/movie/movie.service';
import { IMovieList, IMovieListMovie, ILinks, IRatingStar } from '../../shared/interfaces/movies.interfaces';

import { MaterializeService } from '../../shared/services/utils/materialize.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

	movieList$: Observable<IMovieList>;
	links: ILinks;
	count: number;
	movies: IMovieListMovie[];
  ratingStars: IRatingStar[];
  currentPage: number = 1;
  pageSize: number = 8;
  pageCount: number = 1;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
   this.fetch();
  }

  private fetch() {
    const params = {
      page: this.currentPage,
    };
    this.movieList$ = this.movieService.fetch(params);
    this.movieList$.subscribe((movieList) => {
      this.links = movieList['links'];
      this.count = movieList['count'];
      this.movies = movieList['results'];
      this.pageCount = Math.ceil(this.count / this.pageSize);
      let obsRatingStars$ = this.movieService.getRatingStars();
        obsRatingStars$.subscribe(
          (ratingStars: IRatingStar[]) => {
            this.ratingStars = ratingStars;
          },
          (error) => {
            MaterializeService.toast(error.error.detail);
          }
        );
    });
  }

  changePage(value: number) {
    this.currentPage = value;
    this.fetch();
  }

}
