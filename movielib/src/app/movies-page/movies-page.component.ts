import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieService } from '../shared/services/movie/movie.service';
import { IMovieList, IMovieListMovie, ILinks } from '../shared/interfaces/movies.interfaces';

import { MaterializeService } from '../shared/services/utils/materialize.service';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {

  @ViewChild('parallax') parallaxRef: ElementRef;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    MaterializeService.initializeParallax(this.parallaxRef);
  }

}
