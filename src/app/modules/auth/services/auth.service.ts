import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const AUTH_API = 'http://localhost:3002/api/modules/auth/';

// const httpOptions = {
// 	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	//recién agregado
	private AUTH_API = 'http://localhost:3002/api/modules/auth/';

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	isLogged: boolean;

	constructor(private http: HttpClient) {}

	public isAutenticado():boolean{
		return localStorage.getItem('isLogged') === 'true' ? true : false;
	}

	// public isAutenticado(){
	// 	let autenticacion = localStorage.getItem('Loggued');
	// 	if(autenticacion === 'true'){
	// 	  return true
	// 	} else {
	// 	  return true;
	// 	}
	//   }

	// login(credentials): Observable<any> {
	// 	return this.http.post(
	// 		AUTH_API + 'login',
	// 		{
	// 			username: credentials.username,
	// 			password: credentials.password
	// 		},
	// 		httpOptions
	// 	).pipe(map(x => {
	// 		debugger;
	// 		this.isLogged = true;
	// 		localStorage.setItem('isLogged', this.isLogged.toString());
	// 		return x;
	// 	}));
	// }

	login(credenciales): Observable<any>  {
		return this.http.post(
		  this.AUTH_API	 + 'login',
		  { username: credenciales.username, password: credenciales.password },
		  this.httpOptions).pipe(map(aux => {
			this.isLogged = true; 
			localStorage.setItem('logueado', this.isLogged.toString());
			return aux;
		  }));
	  }

	// register(user): Observable<any> {
	// 	return this.http.post(
	// 		AUTH_API + 'registro',
	// 		{
	// 			username: user.username,
	// 			email: user.email,
	// 			password: user.password
	// 		},
	// 		httpOptions
	// 	);
	// }
}