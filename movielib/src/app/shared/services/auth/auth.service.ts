import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IUser, IJWT, IAccess, IRefresh } from '../../interfaces/auth.interfaces';


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private access: string = null;
	private refresh: string = null;
	private refreshTokenTimeout;

	constructor(private http: HttpClient) {

	}

	register(user: IUser) : Observable<IUser>{
		return this.http.post<IUser>('/auth/users/', user);
	}

	login(user: IUser): Observable<IJWT> {
		return this.http.post<IJWT>('/auth/jwt/create/', user)
			.pipe(
				tap(
					({access, refresh}) => {
						localStorage.setItem('auth-token', access);
						this.setAccessToken(access);
						localStorage.setItem('auth-refresh', refresh);
						this.setRefreshToken(refresh);
						this.startRefreshTokenTimer();
					}
				)
			);
	}

	setAccessToken(access: string) {
		this.access = access;
	} 

	setRefreshToken(refresh: string) {
		this.refresh = refresh;
	} 

	getToken(): string {
		return this.access;
	}

	isAuthenticated(): boolean {
		return !!this.access;
	}

	refreshAccessToken(): Observable<IAccess> {
		return this.http.post<IAccess>('/auth/jwt/refresh/', { refresh: this.refresh })
			.pipe(
				tap(
					({access}) => {
						localStorage.setItem('auth-token', access);
						this.setAccessToken(access);
						this.startRefreshTokenTimer();
					}
				)
			);
	}

	logout() {
		this.stopRefreshTokenTimer();
		this.setAccessToken(null);
		this.setRefreshToken(null);
		localStorage.clear();
	}

	startRefreshTokenTimer() {
		const access = JSON.parse(atob(this.access.split('.')[1]));

		const expiresIn = new Date(access.exp * 1000);
		const timeout = expiresIn.getTime() - Date.now() - (60 * 1000);
		this.refreshTokenTimeout = setTimeout(() => this.refreshAccessToken().subscribe(), timeout);
	}

	stopRefreshTokenTimer() {
		clearTimeout(this.refreshTokenTimeout);
	}
}