export interface ILinks {
	next: string;
	previous: string;
}

export interface IPageView<T> {
	links: ILinks;
	count: number;
	results: T[];
}

export interface IMovieListMovie {
	id: number;
	title: string;
	tagline: string;
	category?: number;
	rating_user: boolean;
	middle_star: number;
	poster: string;
}

export interface IMovieList {
	links: ILinks;
	count: number;
	results: IMovieListMovie[];
}

export interface IDirectorActor {
	id: number;
	name: string;
	image: string;
}

export interface IReview {
	id: number;
	name: string;
	text: string;
	children: IReview[];
}

export interface IReviewCreate {
	id: number;
	email: string;
	name: string;
	text: string;
	parent: number;
	movie: number;
}

export interface IMovie {
	id: number;
	category: string;
	directors: IDirectorActor[];
	actors: IDirectorActor[];
	genres: string[];
	reviews: IReview[];
	rating_user: boolean;
	middle_star: number;
	title: string;
	tagline: string;
	description: string;
	poster: string;
	year: number;
	country: string;
	world_premiere: string;
	budget: number;
	fees_in_usa: number;
  fees_in_world: number;
  url: string;
}

export interface IRatingStar {
	value: number;
}

export interface IStarMovie {
	star: number;
	movie: number;
}